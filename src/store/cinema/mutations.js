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
    setStoreTime(state, value) {
        state.time = value
    },
    setVideo(state, value) {
        state.video = value
    }
}

export default mutations