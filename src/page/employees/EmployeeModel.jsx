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

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        passwordHash: "",
        role: "",
        department: "",
    });
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

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Minimum 3 characters required";
        } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
            newErrors.name = "Only letters are allowed";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[a-z][a-z0-9._]*@(gmail|yahoo)\.(com)$/.test(
                formData.email
            )
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!employee) {
            if (!formData.passwordHash) {
                newErrors.passwordHash = "Password is required";
            } else if (
                !/^(?=.*\d)(?=.*[@$#^_!%*?&]).{8,}$/.test(
                    formData.passwordHash
                )
            ) {
                newErrors.passwordHash =
                    "Enter Valid Password (Eg: Abc@123)"
            }
        }

        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        await onSave(formData);
    };
    // const handleSave = async () => {
    //     console.log("Received Data :", formData);

    //     if (employee) {
    //         const payload = {
    //             name: formData.name,
    //             email: formData.email,
    //             department: formData.department,
    //             role: formData.role,

    //         };

    //         await dispatch(
    //             updateEmployee({
    //                 id: employee.id,
    //                 payload,
    //             })
    //         );
    //     } else {
    //         const payload = {
    //             name: formData.name,
    //             email: formData.email,
    //             passwordHash:
    //                 formData.passwordHash,
    //             role: formData.role,
    //             department: formData.department,
    //         };

    //         await dispatch(
    //             createEmployee(payload)
    //         );
    //     }

    //     dispatch(
    //         getEmployees({
    //             page: 1,
    //             size: 5,
    //             name: "",
    //         })
    //     );

    //     onClose();
    // };
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
                        <label className="field-label-popup">Name <span>*</span></label>
                        <div className="field-box-popup">
                            <input
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <p className="error-message-popup">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email - Full Width */}
                    <div className="form-group-popup full-width">
                        <label className="field-label-popup">Email <span>*</span></label>
                        <div className="field-box-popup">
                            <input
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="error-message-popup">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Password - Full Width (Conditional) */}
                    {!employee && (
                        <div className="form-group-popup full-width">
                            <label className="field-label-popup">Password <span>*</span></label>
                            <div className="field-box-popup password-wrapper-popup">
                                <input
                                    name="passwordHash"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={formData.passwordHash}
                                    onChange={handleChange}
                                />
                                {errors.passwordHash && (
                                    <p className="error-message-popup">
                                        {errors.passwordHash}
                                    </p>
                                )}
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
                        <label className="field-label-popup">Role <span>*</span></label>
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
                            {errors.role && (
                                <p className="error-message-popup">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Department - Half Width */}
                    <div className="form-group-popup half-width">
                        <label className="field-label-popup">Department <span>*</span></label>
                        <div className="field-box-popup">
                            <input
                                name="department"
                                placeholder="Enter department"
                                value={formData.department}
                                onChange={handleChange}
                            />
                            {errors.department && (
                                <p className="error-message-popup">
                                    {errors.department}
                                </p>
                            )}
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