export const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
};

export const isBirthDate = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        return false;
    }

    return (
        birthDate.getDate() === today.getDate() &&
        birthDate.getMonth() === today.getMonth()
    );
};

export const getMonthDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let days = [];
    let week = new Array(7).fill(null);

    let startIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let day = 1; day <= daysInMonth; day++) {
        week[startIndex] = day;
        startIndex++;

        if (startIndex === 7 || day === daysInMonth) {
            days.push(week);
            week = new Array(7).fill(null);
            startIndex = 0;
        }
    }

    return days;
};
