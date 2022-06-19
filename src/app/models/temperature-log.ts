export class TemperatureLog {
    id: number;
    deviceName: string;
    temperature: number;
    humidity: number;
    timestamp: number;

    [key: string]: any;

    constructor(
        id: number,
        deviceName: string,
        temperature: number,
        humidity: number,
        timestamp: number
    ){
        this.id = id;
        this.deviceName = deviceName;
        this.temperature = temperature;
        this.humidity = humidity;
        this.timestamp = timestamp;
    }
}
