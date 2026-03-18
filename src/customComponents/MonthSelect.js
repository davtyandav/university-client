import React, { useState } from 'react';

export default function MonthSelect() {
    const [month, setMonth] = useState("");

    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ];

    return (
        <div>
            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border px-2 py-1 rounded"
            >
                <option value="" disabled>Select month</option>
                {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>

            {month && <p className="mt-2">Selected month: {month}</p>}
        </div>
    );
}