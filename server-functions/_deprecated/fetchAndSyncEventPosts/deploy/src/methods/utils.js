"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRange = exports.formatDate = exports.isValidDate = void 0;
function isValidDate(input) {
    if (typeof input === 'string' || input instanceof String) {
        const date = new Date(input);
        return !isNaN(date.getTime());
    }
    else if (input instanceof Date) {
        return !isNaN(input.getTime());
    }
    return false;
}
exports.isValidDate = isValidDate;
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
exports.formatDate = formatDate;
function getDateRange(rangeMounths) {
    const currentDate = new Date();
    const startDate = formatDate(currentDate);
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + (rangeMounths || 2));
    const formattedEndDate = formatDate(endDate);
    return { startDate, endDate: formattedEndDate };
}
exports.getDateRange = getDateRange;
