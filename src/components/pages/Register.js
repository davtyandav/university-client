import React, {useEffect, useState} from "react";
import {getRoles, register} from "../../services/api";

const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = () => {
        // getRoles()
        //     .then(data => {
        //         setRoles(data);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        const staticRoles = [
            { id: 1, name: 'STUDENT', label: 'Студент' },
            { id: 2, name: 'MENTOR', label: 'Ментор' },
            { id: 3, name: 'ADMIN', label: 'Администратор' }
        ];

        setRoles(staticRoles);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const registrationData = {
            name,
            lastName,
            email,
            password,
            role: selectedRole
        };

        console.log(registrationData)
        try {
            await register(registrationData);
        } catch (error) {
            console.error("Ошибка регистрации:", error.response?.status);
            if (error.response?.status === 403) {
                alert("У вас нет прав администратора для этого действия!");
            }
        }
    };

    return (
        <div className="register-wrapper">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Sign up to start using our platform</p>

                <input
                    type="text"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="register-input"
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="register-input"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="register-input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="register-input"
                />

                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    required
                    className="register-input"
                >
                    <option value="" disabled>Select your role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.label}
                        </option>
                    ))}
                </select>

                <button type="submit" className="register-button">
                    Register
                </button>

                <p className="register-footer">
                    Already have an account? <a href="/login" className="register-link">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;