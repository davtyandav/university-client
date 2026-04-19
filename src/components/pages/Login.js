import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/api";

const Login = ({onLoginSuccess}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login({ email, password });

            const data = res.data || res;

            console.log("Данные от бэкенда:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("userLastName", data.userLastName);

                if (onLoginSuccess) {
                    onLoginSuccess();
                }

                navigate("/profile");
            }
        } catch (err) {
            console.error("Login error", err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Please login to your account</p>

                {/* Выводим ошибку, если она есть */}
                {error && (
                    <div style={{
                        color: '#721c24',
                        backgroundColor: '#f8d7da',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        textAlign: 'center',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />

                <button type="submit" className="login-button">
                    Login
                </button>

                <p className="login-footer">
                    Don't have an account? <a href="/register" className="login-link">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;