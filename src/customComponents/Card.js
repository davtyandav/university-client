import ChangeStatusForm from "./ChangeStatusForm";
import avatar from '../assets/user.png';
import "../styles/card.css"
import Modal from "../components/Modal";
import {useState} from "react";

export default function Card({user, onClick}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);

    const onStatusClick = (nextStatus) => {
        setPendingStatus(nextStatus);
        setIsModalOpen(true);
    };

    const onUpdateSuccess = () => {
        user.status=pendingStatus
    }

    const handleCloseAddModal = (e) => {
        if (e) e.stopPropagation();
        setIsModalOpen(false);
        setPendingStatus(null);
    };

    return (
        <div className="card" onClick={() => onClick(user.id)}>
            <div className="card-avatar">
                <img src={avatar} alt="User Avatar"/>
            </div>

            <div className="card-info">
                <h3 className="card-name">
                    {user.name} {user.lastName}
                </h3>
            </div>
            <div className="card-actions">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        const nextStatus = user.status === "ACTIVE" ? "DISABLE" : "ACTIVE";
                        onStatusClick(nextStatus);
                    }}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                        user.status === "ACTIVE"
                            ? 'bg-green-100 text-green-600 border border-green-500'
                            : 'bg-red-100 text-red-600 border border-red-500'
                    }`}
                >
                    {user.status === "ACTIVE" ? 'Active' : 'Inactive'}
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseAddModal}>
                <ChangeStatusForm
                    user={user}
                    newStatus={pendingStatus}
                    onClose={handleCloseAddModal}
                    onSuccess={onUpdateSuccess}
                />
            </Modal>
        </div>
    );
}
