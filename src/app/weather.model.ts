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

type _5DayWeather = {
    day_short: string;
    day_long: string;
    max_temp: number;
    min_temp: number;
    weather_by_hour: WeatherDetails[];
}

export interface ICityModel {
    cityDetails?: CityDetails;
    currentWeather?: WeatherDetails;
    _5DayWeather?: _5DayWeather[];
}