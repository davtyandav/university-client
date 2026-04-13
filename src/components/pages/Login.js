import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../services/api"; // getMe тут не нужен, если роль приходит в login

const Login = ({onLoginSuccess}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Добавили стейт для ошибок
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login({ email, password });

            // Теперь мы проверяем: если res.data нет, значит res — это и есть наш объект
            const data = res.data || res;

            console.log("Данные, которые мы вытащили:", data);

            const token = data.token;
            const role = data.role;

            if (token && role) {
                // 1. Сохраняем в localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                console.log("Успех! Сохранили роль:", role);

                // 2. Обязательно уведомляем App.js
                if (onLoginSuccess) {
                    onLoginSuccess();
                }

                // 3. Переходим в профиль
                navigate("/profile");
            } else {
                console.error("Поля token или role отсутствуют в:", data);
                setError("Ошибка авторизации: сервер прислал неполные данные");
            }

        } catch (err) {
            console.error("Ошибка при запросе:", err);
            setError("Неверный email или пароль");
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