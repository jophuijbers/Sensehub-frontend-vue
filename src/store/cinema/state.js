export default function () {
    return {
        ws: new WebSocket('wss://sensegang.nl:3231/'),
        clientName: '',
        currentRoom: null,
        rooms: [],
        chat: [],
        time: 0,
        volume: 100,
        video: null,
        videos: []
    }
}