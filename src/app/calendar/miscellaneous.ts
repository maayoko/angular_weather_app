export function getDateObject(date: string): Date {
    const splittedDate = date.split(/[- :]/);
    const year = +splittedDate[0];
    const month = (+splittedDate[1]) - 1;
    const dateOfTheMonth = +splittedDate[2];
    const hour = +splittedDate[3];
    const minutes = +splittedDate[4];
    const seconds = +splittedDate[5];
    return new Date(year, month, dateOfTheMonth, hour, minutes, seconds);
}