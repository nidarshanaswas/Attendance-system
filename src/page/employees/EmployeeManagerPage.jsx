import { React } from "react";
import EmployeeModel from "./EmployeeModel"
import "../../styles/employees.css"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, deleteEmployee, createEmployee, updateEmployee, }
    from "../../features/employees/employeesActions";
import { selectEmployees, selectTotalPages, selectCurrentPage } from "../../features/employees/employeesSelectors";
import { useEffect, useState } from "react";

function EmployeeManager() {
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const employees = useSelector(selectEmployees);
    const totalPages = useSelector(selectTotalPages);
    const currentPage = useSelector(selectCurrentPage);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(
            getEmployees({
                page,
                size: 5,
                name: search,
            })
        );
    }, [dispatch, page, search]);

    const handleSaveEmployee = async (formData) => {
        console.log("Before API");

        try {
            if (selectedEmployee) {
                await dispatch(
                    updateEmployee({
                        id: selectedEmployee.id,
                        payload: formData,
                    })
                ).unwrap();
                toast.success("Employee updated successfully");

            } else {
                await dispatch(
                    createEmployee(formData)
                ).unwrap();
                toast.success("Employee created successfully");

            }
            console.log("Before closing modal");

            setShowModal(false);
            setSelectedEmployee(null);
            console.log("Modal closed");

            dispatch(
                getEmployees({
                    page,
                    size: 5,
                    name: search,
                })
            );
            // setShowModal(false);
            // setSelectedEmployee(null);
        } catch (error) {
            console.log("backend error", error);

            if (Array.isArray(error?.errors)) {
                error.errors.forEach((msg) => toast.error(msg));
            } else if (error?.errors) {
                Object.values(error.errors).forEach((msg) =>
                    toast.error(msg)
                );
            } else if (Array.isArray(error?.message)) {
                error.message.forEach((msg) =>
                    toast.error(msg)
                );
            } else {
                toast.error(error?.message || "Something went wrong");
            }
        }

    };
    return (
        <div className="employee-page">
            <div className=" employee-header">
                <input
                    type="text"
                    placeholder="Search Employees"
                    className="employee-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="add-btn"
                    onClick={() => {
                        setSelectedEmployee(null);
                        setShowModal(true);
                    }}>
                    + Add Employee
                </button>
            </div>
            <div className="employee-table-container">
                <h3>Employees</h3>
                <div className="table-wrapper-popup">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.role}</td>
                                    <td>{emp.department}</td>
                                    <td>
                                        <span className={emp.status == "ACTIVE"
                                            ? "status-active" : "status-inactive"}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="edit-btn" onClick={() => {
                                            setSelectedEmployee(emp);
                                            setShowModal(true);
                                        }}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={async () => {
                                                await dispatch(deleteEmployee(emp.id));

                                                dispatch(
                                                    getEmployees({
                                                        page,
                                                        size: 5,
                                                        name: search,
                                                    })
                                                );
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pages">
                <p>Page {currentPage} of {totalPages}</p>

                <div className="pages-buttons">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={ page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
            </div>
            
            {showModal && (
                <EmployeeModel
                    employee={selectedEmployee}
                    onClose={() => { setShowModal(false); setError(""); }}
                    onSave={handleSaveEmployee}
                    error={error}
                />
            )}
        </div>
    );
}
export default EmployeeManager;