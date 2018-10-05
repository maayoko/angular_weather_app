export class City {
    private name: string;
    private country: string;
    private coords: Map<string, number>;
    private currentWeather: Map<string, any>;
    private _5DayWeather: Map<number, any>;

    public generate5DayWeather(weather_data: any): void {

    }

    public getCityName(): string {
        return this.name;

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
        //             day: "Tue",
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
    }
}