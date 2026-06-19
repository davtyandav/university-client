import React from 'react';
import {updateUserStatus} from '../services/api';

const ChangeStatusForm = ({user, newStatus, onClose, onSuccess}) => {

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        const requestData = {
            status: newStatus
        };

        try {
            console.log("statsu", requestData)
            await updateUserStatus(user.id, requestData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving status:", error);
            alert("Не удалось обновить статус.");
        }
    };

    return (
        <div className="form space-y-4 p-4 text-center">
            <h2 className="text-xl font-bold">Подтверждение</h2>
            <p>
                Изменить статус для <b>{user.name}</b> на
                <span className={newStatus === "ACTIVE" ? "text-green-600" : "text-red-600"}>
                    {" "}{newStatus === "ACTIVE" ? "Active" : "Inactive"}
                </span>?
            </p>

            <div className="section-btn flex justify-center gap-4">
                <button className="saveBtn" type="button" onClick={handleSubmit}>OK</button>
                <button className="cancelBtn" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ChangeStatusForm;
