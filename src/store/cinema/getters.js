const getters = {
    getWs: (state) => state.ws,
    getClientName: (state) => state.clientName,
    getCurrentRoom: (state) => state.currentRoom,
    getRoomName: (state) => state.roomName,
    getRooms: (state) => state.rooms,
    getChat: (state) => state.chat,
    getTime: (state) => state.time,
    getVolume: (state) => state.volume,
    getVideo: (state) => state.video,
    getVideos: (state) => state.videos
}

export default getters