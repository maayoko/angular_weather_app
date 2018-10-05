const eng_short_day_names = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

const eng_long_day_names = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function isInRange(num: number) {
    return num > -1 && num < 7;
}

function convertNumberToDayName(dayNumber: number, day_name: string[]): string {
    if (isInRange(dayNumber)) {
        return day_name[dayNumber];
    }

    throw new Error("Number has to be between 0 and 6. Yours is: " + dayNumber);
}

export function convertNumberToShortName(dayNumber: number): string {
    return convertNumberToDayName(dayNumber, eng_short_day_names);
}

export function convertNumberToLongName(dayNumber: number): string {
    return convertNumberToDayName(dayNumber, eng_long_day_names);
}