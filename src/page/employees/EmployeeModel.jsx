// import React, { useState, useEffect } from "react";

// function EmployeeModal({ employee, onClose }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     passwordHash: "",
//     role: "",
//     department: "",
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData({
//         name: employee.name,
//         email: employee.email,
//         passwordHash: "",
//         role: employee.role,
//         department: employee.department,
//       });
//     }
//   }, [employee]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="employee-modal">
//         <h2>
//           {employee ? "Edit Employee" : "Add Employee"}
//         </h2>

//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         {!employee && (
//           <input
//             name="passwordHash"
//             type="password"
//             placeholder="Password"
//             value={formData.passwordHash}
//             onChange={handleChange}
//           />
//         )}

//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//         >
//           <option value="">Select Role</option>
//           <option value="Admin">Admin</option>
//           <option value="Manager">Manager</option>
//           <option value="Employee">Employee</option>
//         </select>

//         <input
//           name="department"
//           placeholder="Department"
//           value={formData.department}
//           onChange={handleChange}
//         />

//         <div className="modal-buttons">
//           <button className="save-btn">
//             {employee ? "Update" : "Save"}
//           </button>

//           <button
//             className="cancel-btn"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmployeeModal;

import React, { useState, useEffect } from "react";
import {
    FaUser, FaEnvelope, FaLock, FaBuilding, FaUserShield,
    FaEye, FaEyeSlash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createEmployee, updateEmployee, getEmployees, }
    from "../../features/employees/employeesActions";

function EmployeeModal({ employee, onClose, onSave, }) {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Button clicked");
        console.log("Submitting :", formData);
         onSave(formData);
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
    return (
        <div className="emp-modal-overlay-popup">
            <div className="emp-modal-popup">

                <h2 className="modal-title-popup">
                    {employee ? "Edit Employee" : "Add Employee"}
                </h2>

                {/* Name */}
                <div className="form-group-popup">
                    <div className="icon-box-popup">
                        <FaUser />
                    </div>

                    <div className="field-box-popup">
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="form-group-popup">
                    <div className="icon-box-popup">
                        <FaEnvelope />
                    </div>

                    <div className="field-box-popup">
                        <label>Email</label>
                        <input
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Password */}
                {!employee && (
                    <div className="form-group-popup">
                        <div className="icon-box-popup">
                            <FaLock />
                        </div>

                        <div className="field-box-popup password-wrapper-popup ">
                            <label>Password</label>

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

                {/* Role */}
                <div className="form-group-popup">
                    <div className="icon-box-popup">
                        <FaUserShield />
                    </div>

                    <div className="field-box-popup">
                        <label>Role</label>

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

                {/* Department */}
                <div className="form-group-popup">
                    <div className="icon-box-popup">
                        <FaBuilding />
                    </div>

                    <div className="field-box-popup">
                        <label>Department</label>

                        <input
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="emp-modal-footer-popup">
                    <button className="save-btn-popup" onClick={handleSubmit}>
                        {employee ? "Update" : "Save"}
                    </button>

                    <button
                        className="cancel-btn-popup"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeModal;