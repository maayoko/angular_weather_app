type WeatherDetails = {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    wind_speed: number;
    date?: string;
    humidity: number;
    weather_main: string;
    weather_description: string;
    icon: string;
}

type CityDetails = {
    name: string;
    coord?: {
        lat: number;
        lon: number;
    }
    country?: string
}

type Day = {
    name: string;
    n0: number;
}

type Hour = {
    hour: number;
    weather_details: WeatherDetails;
}

type _5DayWeather = {
    day_short: string;
    day_long: string;
    weather_by_hour: WeatherDetails[];
}

interface WeatherModel {
    city: CityDetails;
}

export interface ICityModel {
    cityDetails?: CityDetails;
    currentWeather?: WeatherDetails;
    _5DayWeather?: _5DayWeather[];
}

export interface IWeather5DayModel extends WeatherModel {
    list: WeatherDetails[];
}

export interface IWeatherCurrentDayModel extends WeatherModel {
    weather_details: WeatherDetails;
}

// const obj = {
//     name: "Zagreb",
//     country: "HR",
//     coords: {
//         lon: 54.3,
//         lat: 43.2
//     },
//     currentWeather: {
//         temp: 23,
//         temp_min: 18,
//         temp_max: 25,
//         pressure: 1032,
//         wind_speed: 32,
//         date: "2018-10-01 23:00:00",
//         humidity: 65,
//         weather_main: "Drizzle",
//         weather_description: "light intensity drizzle",
//         icon: "drizzle"
//     },
//     _5DayWeather: [
//         {
//             day: "Mon",
//             weather_by_hour: [
//                 {
//                     hour: 8,
//                     temp: 23,
//                     temp_min: 18,
//                     temp_max: 25,
//                     pressure: 1032,
//                     wind_speed: 32,
//                     date: "2018-10-01 23:00:00",
//                     humidity: 65,
//                     weather_main: "Drizzle",
//                     weather_description: "light intensity drizzle"
//                 },
//                 {
//                     hour: 11,
//                     temp: 23,
//                     temp_min: 18,
//                     temp_max: 25,
//                     pressure: 1032,
//                     wind_speed: 32,
//                     date: "2018-10-01 23:00:00",
//                     humidity: 65,
//                     weather_main: "Drizzle",
//                     weather_description: "light intensity drizzle"
//                 }
//             ]
//         },
//         {
//             day_short: "Tue",
//             day_long: "Tuesday",
//             weather_by_hour: [
//                 {
//                     hour: 8,
//                     temp: 23,
//                     temp_min: 18,
//                     temp_max: 25,
//                     pressure: 1032,
//                     wind_speed: 32,
//                     date: "2018-10-01 23:00:00",
//                     humidity: 65,
//                     weather_main: "Drizzle",
//                     weather_description: "light intensity drizzle"
//                 }
//             ]
//         },
//     ]
// }