const mutations = {
    setClientName(state, value) {
        state.clientName = value
    },
    setCurrentRoom(state, value) {
        state.currentRoom = value
    },
    setStoreRooms(state, value) {
        state.rooms = value
    },
    setChat(state, value) {
        state.chat = value
    },
    setTime(state, value) {
        state.time = value
    },
    setVolume(state, value) {
        state.volume = value
    },
    setVideo(state, value) {
        state.video = value
    },
    setVideos(state, value) {
        state.videos = value
    }
}

export default mutations