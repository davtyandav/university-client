import React, { useState } from 'react';

const ChangePasswordModal = ({ user, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        if (!formData.oldPassword) {
            return setError('Введите старый пароль');
        }
        if (formData.newPassword.length < 6) {
            return setError('Новый пароль должен быть не менее 6 символов');
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return setError('Новые пароли не совпадают');
        }
        if (formData.oldPassword === formData.newPassword) {
            return setError('Новый пароль не должен совпадать со старым');
        }

        setLoading(true);
        try {

            console.log(user)
            // Отправляем на сервер старый и новый пароли
            // await updateUserPassword(user.id, {
            //     oldPassword: formData.oldPassword,
            //     newPassword: formData.newPassword
            // });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при смене пароля');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center text-gray-800">Безопасность</h2>
            <p className="text-sm text-gray-600 text-center">
                Смена пароля для <b>{user.name}</b>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Старый пароль */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Текущий пароль</label>
                    <input
                        type="password"
                        name="oldPassword"
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <hr className="border-gray-100" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
                    <input
                        type="password"
                        name="newPassword"
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Минимум 6 символов"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Подтвердите новый пароль</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && (
                    <div className="p-2 bg-red-50 border-l-4 border-red-500">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex justify-center gap-3 pt-4">
                    <button
                        type="submit"
                        className="saveBtn flex-1 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Сохранение...' : 'Обновить'}
                    </button>
                    <button
                        type="button"
                        className="cancelBtn flex-1 border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordModal;