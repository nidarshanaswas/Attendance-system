import React, { useState, useEffect } from "react";
import {
    FaUser, FaEnvelope, FaLock, FaBuilding, FaUserShield,
    FaEye, FaEyeSlash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createEmployee, updateEmployee, getEmployees, }
    from "../../features/employees/employeesActions";

function EmployeeModel({ employee, onClose, onSave, }) {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        passwordHash: "",
        role: "",
        department: "",
    });
    console.log("update", formData);

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                email: employee.email,
                passwordHash: "",
                role: employee.role,
                department: employee.department,
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Button clicked");
        console.log("Submitting :", formData);
        await onSave(formData);
    };
    const handleSave = async () => {
        console.log("Received Data :", formData);

        if (employee) {
            const payload = {
                name: formData.name,
                email: formData.email,
                department: formData.department,
                role: formData.role,

            };

            await dispatch(
                updateEmployee({
                    id: employee.id,
                    payload,
                })
            );
        } else {
            const payload = {
                name: formData.name,
                email: formData.email,
                passwordHash:
                    formData.passwordHash,
                role: formData.role,
                department: formData.department,
            };

            await dispatch(
                createEmployee(payload)
            );
        }

        dispatch(
            getEmployees({
                page: 1,
                size: 5,
                name: "",
            })
        );

        onClose();
    };
    // return (
    //     <div className="emp-modal-overlay-popup">
    //         <div className="emp-modal-popup">

    //             <h2 className="modal-title-popup">
    //                 {employee ? "Edit Employee" : "Add Employee"}
    //             </h2>

    //             <div className="form-group-popup">
    //                 <div className="icon-box-popup">
    //                     <FaUser />
    //                 </div>

    //                 <div className="field-box-popup">
    //                     <label>Name</label>
    //                     <input
    //                         name="name"
    //                         placeholder="Enter name"
    //                         value={formData.name}
    //                         onChange={handleChange}
    //                     />
    //                 </div>
    //             </div>

    //             <div className="form-group-popup">
    //                 <div className="icon-box-popup">
    //                     <FaEnvelope />
    //                 </div>

    //                 <div className="field-box-popup">
    //                     <label>Email</label>
    //                     <input
    //                         name="email"
    //                         placeholder="Enter email"
    //                         value={formData.email}
    //                         onChange={handleChange}
    //                     />
    //                 </div>
    //             </div>

    //             {!employee && (
    //                 <div className="form-group-popup">
    //                     <div className="icon-box-popup">
    //                         <FaLock />
    //                     </div>

    //                     <div className="field-box-popup password-wrapper-popup ">
    //                         <label>Password</label>

    //                         <input
    //                             name="passwordHash"
    //                             type={showPassword ? "text" : "password"}
    //                             placeholder="Enter password"
    //                             value={formData.passwordHash}
    //                             onChange={handleChange}
    //                         />

    //                         <span
    //                             className="eye-icon-popup"
    //                             onClick={() => setShowPassword(!showPassword)}
    //                         >
    //                             {showPassword ? <FaEyeSlash /> : <FaEye />}
    //                         </span>
    //                     </div>
    //                 </div>
    //             )}

    //             <div className="form-group-popup">
    //                 <div className="icon-box-popup">
    //                     <FaUserShield />
    //                 </div>

    //                 <div className="field-box-popup">
    //                     <label>Role</label>

    //                     <select
    //                         name="role"
    //                         value={formData.role}
    //                         onChange={handleChange}
    //                     >
    //                         <option value="">Select Role</option>
    //                         <option value="Admin">Admin</option>
    //                         <option value="Manager">Manager</option>
    //                         <option value="Employee">Employee</option>
    //                     </select>
    //                 </div>
    //             </div>

    //             <div className="form-group-popup">
    //                 <div className="icon-box-popup">
    //                     <FaBuilding />
    //                 </div>

    //                 <div className="field-box-popup">
    //                     <label>Department</label>

    //                     <input
    //                         name="department"
    //                         placeholder="Enter department"
    //                         value={formData.department}
    //                         onChange={handleChange}
    //                     />
    //                 </div>
    //             </div>

    //             <div className="emp-modal-footer-popup">
    //                 <button className="save-btn-popup" onClick={handleSubmit}>
    //                     {employee ? "Update" : "Save"}
    //                 </button>

    //                 <button
    //                     className="cancel-btn-popup"
    //                     onClick={onClose}
    //                 >
    //                     Cancel
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
    <div className="emp-modal-overlay-popup">
        <div className="emp-modal-popup">
            <h2 className="modal-title-popup">
                {employee ? "Edit Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit} className="emp-modal-form-grid">
                {/* Name - Full Width */}
                <div className="form-group-popup full-width">
                    <label className="field-label-popup">Name</label>
                    <div className="field-box-popup">
                        <input
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Email - Full Width */}
                <div className="form-group-popup full-width">
                    <label className="field-label-popup">Email</label>
                    <div className="field-box-popup">
                        <input
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Password - Full Width (Conditional) */}
                {!employee && (
                    <div className="form-group-popup full-width">
                        <label className="field-label-popup">Password</label>
                        <div className="field-box-popup password-wrapper-popup">
                            <input
                                name="passwordHash"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={formData.passwordHash}
                                onChange={handleChange}
                            />
                            <span
                                className="eye-icon-popup"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                )}

                {/* Role - Half Width */}
                <div className="form-group-popup half-width">
                    <label className="field-label-popup">Role</label>
                    <div className="field-box-popup select-wrapper-popup">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>
                </div>

                {/* Department - Half Width */}
                <div className="form-group-popup half-width">
                    <label className="field-label-popup">Department</label>
                    <div className="field-box-popup">
                        <input
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Form Footer Action Buttons */}
                <div className="emp-modal-footer-popup">
                    <button
                        type="button"
                        className="cancel-btn-popup"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="save-btn-popup">
                        {employee ? "Update" : "Save "}
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default EmployeeModel;