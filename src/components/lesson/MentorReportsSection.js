import React, {useEffect, useState} from 'react';
import {deleteSalaryReportApi, downloadSalaryReportFile, getMentorReportsApi} from '../../services/api';

const MentorReportsSection = ({mentorId}) => {
    const [reports, setReports] = useState([]);
    const [downloadingId, setDownloadingId] = useState(null);

    const loadReports = () => {
        if (mentorId && mentorId !== 'no-mentor') {
            getMentorReportsApi(mentorId)
                .then(data => setReports(data))
                .catch(err => console.error(`Failed to load reports for mentor ${mentorId}:`, err));
        }
    };

    useEffect(() => {
        loadReports();
    }, [mentorId]);

    const handleDownload = async (reportId) => {
        setDownloadingId(reportId);
        try {
            await downloadSalaryReportFile(reportId);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Could not download PDF.");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleDelete = async (reportId) => {
        if (window.confirm("Are you sure you want to delete this financial report?")) {
            try {
                await deleteSalaryReportApi(reportId);
                alert("Report deleted successfully");
                loadReports();
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete report.");
            }
        }
    };

    if (mentorId === 'no-mentor' || reports.length === 0) {
        return <p className="text-xs text-slate-400 italic px-2">No official statements generated yet.</p>;
    }

    return (
        <div className="flex flex-col gap-2 w-full px-2">
            {reports.map((report, idx) => (
                <div key={`${report.id}-${idx}`}
                     className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                    <div>
                        <p className="font-semibold text-slate-700">
                            Period: {report.startDate.split('T')[0]} to {report.endDate.split('T')[0]}
                        </p>
                        <small
                            className="text-slate-400">Generated: {new Date(report.generatedAt).toLocaleDateString()}</small>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {report.totalSalary.toFixed(0)} Dram
                        </span>
                        <button
                            onClick={() => handleDownload(report.id)}
                            disabled={downloadingId === report.id}
                            className="bg-slate-800 text-white font-medium py-1 px-2.5 rounded hover:bg-slate-700 transition disabled:opacity-50"
                        >
                            {downloadingId === report.id ? "..." : "📥 Download"}
                        </button>
                        <button
                            onClick={() => handleDelete(report.id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-medium py-1 px-2.5 rounded transition border border-rose-100"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MentorReportsSection;