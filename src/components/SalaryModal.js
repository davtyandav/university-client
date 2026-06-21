import React, { useState } from 'react';
import { calculateSalary } from '../services/api';
import Modal from "./Modal";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SalaryModal = ({ isOpen, onClose, mentor, isAdmin }) => {
    const [salaryDates, setSalaryDates] = useState({ start: '', end: '' });
    const [salaryResult, setSalaryResult] = useState(null);
    const [salaryLoading, setSalaryLoading] = useState(false);

    const handleCalculateSalary = async (e) => {
        e.preventDefault();
        if (!salaryDates.start || !salaryDates.end) return;

        setSalaryLoading(true);
        try {
            console.log(mentor)
            const result = await calculateSalary({
                mentorId: mentor.id,
                start: `${salaryDates.start}T00:00:00`,
                end: `${salaryDates.end}T00:00:00`
            });
            setSalaryResult(result);
        } catch (err) {
            console.error("Salary calculation error:", err);
            alert("Error calculating salary");
        }finally {
            setSalaryLoading(false);
        }
    };

    const generatePdfReport = () => {
        if (!salaryResult) return;

        const doc = new jsPDF();

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Salary Financial Report", 14, 20);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Mentor : ${mentor.user.name}`, 14, 28);
        doc.text(`Period: ${salaryDates.start} to ${salaryDates.end}`, 14, 34);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 40);

        const tableColumn = ["Salary Category", "Amount (AMD)"];
        const tableRows = [
            ["Group Lessons Salary", `${salaryResult.groupSalary.toFixed(0)} Dram`],
            ["Single Lessons Salary", `${salaryResult.singleSalary.toFixed(0)} Dram`],
            ["Total Payout", `${salaryResult.totalSalary.toFixed(0)} Dram`]
        ];

        autoTable(doc, {
            startY: 48,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [5, 150, 105] },
            styles: { font: "Helvetica", fontSize: 10 },
            columnStyles: {
                0: { fontStyle: 'bold' },
                1: { halign: 'right' }
            }
        });

        doc.save(`Salary_Report_Mentor_${mentor.id}_${salaryDates.start}_to_${salaryDates.end}.pdf`);
    };

    const handleClose = () => {
        setSalaryDates({ start: '', end: '' });
        setSalaryResult(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} width="400px">
            <div className="p-4 flex flex-col gap-4 text-gray-800">
                <h2 className="text-xl font-bold border-b pb-2">Salary Calculation</h2>
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
                                onClick={generatePdfReport}
                                className="w-full bg-slate-800 text-white font-medium text-xs py-2 px-3 rounded-lg hover:bg-slate-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                            >
                                📥 Download PDF Report
                            </button>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default SalaryModal;