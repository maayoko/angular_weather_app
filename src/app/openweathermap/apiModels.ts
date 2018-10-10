export interface FiveDaysWeather {
    city: {
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        id: number;
        name: string;
        population: number;
    };
    cnt: number;
    cod: string;
    list: {
        clouds: { all: number; };
        dt: number;
        dt_txt: string;
        main: {
            grnd_level: number;
            humidity: number;
            pressure: number;
            sea_level: number;
            temp: number;
            temp_kf: number;
            temp_max: number;
            temp_min: number;
            sys: { pod: string; };
        },
        wind: {
            speed: number;
            deg: number;
        };
        weather: {
            description: string;
            icon: string;
            id: number;
            main: string;
        }[];
    }[];
    message: number;
}


export interface CurrentWeather {
    base: string;
    clouds: { all: number; };
    cod: number;
    coord: {
        lat: number;
        lon: number;
    };
    dt: number;
    id: number;
    main: {
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        message: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    visibility: number;
    weather: {
        description: string
        icon: string
        id: string
        main: string
    }[];
    wind: { speed: number; };
}