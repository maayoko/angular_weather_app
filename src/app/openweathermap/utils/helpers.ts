export function generateUrlLink(
    hostname: string, 
    path: string, 
    queryParams: {[key: string]: string}): string
{
    let url = '';
    url += hostname;
    url += path;

    const queryParamsKeys = Object.keys(queryParams);

    for (let i = 0; i < queryParamsKeys.length; i++) {
        const queryParamsKey = queryParamsKeys[i];
        url += `${queryParamsKey}=${queryParams[queryParamsKey]}`;

        if (i < queryParamsKeys.length - 1) {
            url += "&";
        }
    }
    return url;
}

const mapIcons: Map<string, string> = new Map();
mapIcons.set("01d", "wi-day-sunny");
mapIcons.set("01n", "wi-night-clear");
mapIcons.set("02d", "wi-day-cloudy");
mapIcons.set("02n", "wi-night-alt-cloudy");
mapIcons.set("03d", "wi-cloud");
mapIcons.set("03n", "wi-cloud");
mapIcons.set("04d", "wi-cloudy");
mapIcons.set("04n", "wi-cloudy");
mapIcons.set("09d", "wi-day-showers");
mapIcons.set("09n", "wi-night-alt-showers");
mapIcons.set("10d", "wi-day-rain");
mapIcons.set("10n", "wi-night-alt-rain");
mapIcons.set("11d", "wi-day-thunderstormn");
mapIcons.set("11n", "wi-night-alt-thunderstorm");
mapIcons.set("13d", "wi-day-snow");
mapIcons.set("13n", "wi-night-alt-snow");
mapIcons.set("50d", "wi-fog");
mapIcons.set("50n", "wi-fog");

const mapColors: Map<string, string> = new Map();
// mapColors.set("")

export function getWeatherIconText(icon: string): string {
    if (mapIcons.has(icon)) {
        return mapIcons.get(icon);
    }

    return "wi-cloud";
}

// export function defineHomeCardBgColor(icon: string): string {

// }