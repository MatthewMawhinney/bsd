export class Geolocation {
    lat: number;
    lng: number;
    accuracy: number;
    heading: number;
    speed: number;
    wpid: number;
    geo_options: object = {
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000
    };
}
