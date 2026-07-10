import React, { useState } from 'react';
import { calculateSalary, saveSalaryReportApi } from '../services/api';
import Modal from "./Modal";

const SalaryModal = ({ isOpen, onClose, mentor, isAdmin, onReportGenerated }) => {
    const [salaryDates, setSalaryDates] = useState({ start: '', end: '' });
    const [salaryResult, setSalaryResult] = useState(null);
    const [salaryLoading, setSalaryLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const handleCalculateSalary = async (e) => {
        e.preventDefault();
        if (!salaryDates.start || !salaryDates.end) return;

        setSalaryLoading(true);
        try {
            const result = await calculateSalary({
                mentorId: Number(mentor.id),
                start: salaryDates.start,
                end: salaryDates.end
            });
            setSalaryResult(result);
        } catch (err) {
            console.error(err);
            alert("Error calculating salary");
        } finally {
            setSalaryLoading(false);
        }
    };

    const handleSaveAndSendReport = async () => {
        setSaveLoading(true);
        try {
            await saveSalaryReportApi({
                mentorId: Number(mentor.id),
                start: salaryDates.start,
                end: salaryDates.end
            });
            alert("PDF generated and successfully assigned to mentor profile!");
            if (onReportGenerated) onReportGenerated();
            handleClose();
        } catch (err) {
            console.error(err);
            alert("Failed to save report on backend");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleClose = () => {
        setSalaryDates({ start: '', end: '' });
        setSalaryResult(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} width="400px">
            <div className="p-4 flex flex-col gap-4 text-gray-800">
                <h2 className="text-xl font-bold border-b pb-2">Salary for {mentor?.user?.name}</h2>
                <form onSubmit={handleCalculateSalary} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-600">Start Date:</label>
                        <input
                            type="date"
                            required
                            value={salaryDates.start}
                            onChange={(e) => setSalaryDates(prev => ({ ...prev, start: e.target.value }))}
                            className="border p-2 rounded text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-600">End Date:</label>
                        <input
                            type="date"
                            required
                            value={salaryDates.end}
                            onChange={(e) => setSalaryDates(prev => ({ ...prev, end: e.target.value }))}
                            className="border p-2 rounded text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={salaryLoading}
                        className="bg-emerald-600 text-white font-semibold py-2 px-4 rounded text-sm hover:bg-emerald-700 disabled:opacity-50 mt-2 transition-colors"
                    >
                        {salaryLoading ? "Calculating..." : "Calculate"}
                    </button>
                </form>

                {salaryResult !== null && (
                    <div className="mt-4 flex flex-col gap-3">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                            <div className="flex justify-between text-sm text-gray-600 border-b border-dashed pb-1.5">
                                <span>Group Lessons:</span>
                                <span className="font-semibold text-gray-800">{salaryResult.groupSalary.toFixed(0)} Dram</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 border-b border-dashed pb-1.5">
                                <span>Single Lessons:</span>
                                <span className="font-semibold text-gray-800">{salaryResult.singleSalary.toFixed(0)} Dram</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-sm font-bold text-emerald-800">Total Salary:</span>
                                <span className="text-xl font-black text-emerald-700">{salaryResult.totalSalary.toFixed(0)} Dram</span>
                            </div>
                        </div>

                        {isAdmin && (
                            <button
                                type="button"
                                disabled={saveLoading}
                                onClick={handleSaveAndSendReport}
                                className="w-full bg-slate-800 text-white font-medium text-xs py-2 px-3 rounded-lg hover:bg-slate-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                            >
                                {saveLoading ? "Saving..." : "💾 Save PDF into Mentor's Profile"}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SalaryModal;