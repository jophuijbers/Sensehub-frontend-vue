<script>
import api from '../services/websocket/websocket-service'
import SearchPanel from "../components/SearchPanel.vue"
import { mapGetters } from 'vuex'
import feather from 'feather-icons'

export default {
    name: "playlistPanel",
    components: { SearchPanel },
    data() {
        return {
            growPanel: false,
        }
    },
    methods: {
        removeVideo(index) {
            api.deleteVideo(this.getWs, this.getCurrentRoom.name, index)
        },
        formatTime(duration) {
            let formattedTime = new Date(duration * 1000).toISOString().substr(11, 5)
            return formattedTime
        },
        addIndex(index) {
            api.patchIndex(this.getWs, this.getCurrentRoom.name, index)
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getUser']),
    },
    mounted() {
        feather.replace();
    },
    updated() {
        feather.replace();
    }
}
</script>

<template>
    <div class="wrapper" :style="{ bottom: growPanel ? '0' : '-30.2vh' }">
        <div
            style="display: flex; align-items: center; justify-content: start; border-bottom: 1px solid #f1f1f1; margin: 0px 15px;">
            <div>
                <SearchPanel />
            </div>
            <div style="display: flex; justify-content: center; align-items: center; flex-grow: 1;">
                <button @click="growPanel = !growPanel" class="playlist-header">Playlist<div
                        style="display: flex; justify-content: center; align-items: center; transition: all .6s ease;"
                        :class="{ turn: !growPanel }"><i data-feather="chevron-down"></i></div></button>
            </div>
        </div>
        <div class="playlist-container">
            <ul>
                <li :key="index" v-for="(video, index) in getCurrentRoom.playlist">
                    <div style="display: flex; align-items: center;">
                        <p v-if="getUser.isAdmin === true" class="item" @click="addIndex(index - getCurrentRoom.index)">
                            {{ video.name }}</p>
                        <p v-else>{{ video.name }}</p>
                        <p style="color: #a1a1a1; margin-left: 12px;">{{ formatTime(video.duration) }}</p>
                    </div>
                    <button @click="removeVideo(getCurrentRoom.playlist.indexOf(video))" v-if="getUser.isAdmin"><i
                            data-feather="trash-2"></i></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: end;
    flex-direction: column;
    transition: all .3s ease;
    position: fixed;
    bottom: -30%;
    right: 0;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    background-color: #1e1e1e;
    border-top-left-radius: 8px;
}

.turn {
    transform: rotate(180deg);
}

.playlist-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 250px;
    height: 30vh;
    max-height: 30vh;
    transition: all .3s ease;
    overflow-x: hidden;
    overflow-y: scroll;
    max-width: 350px;
}

.playlist-header {
    margin: 20px 0px;
    font-size: large;
    font-family: 'Roboto';
    width: fit-content;
}

.playlist-header:hover {
    cursor: pointer;
    color: #a1a1a1;
}

.item {
    cursor: pointer;
}

.item:hover {
    color: #a1a1a1;
}

h3 {
    text-align: center;
    margin: 10px;
}

ul {
    padding: 0;
    margin: 0px 15px;
    position: relative;
    height: 100.01%
}

svg {
    height: 16px;
}

li {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    list-style: none;
    padding: 8px 0px;
    border-bottom: 1px solid #f1f1f1;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 20px;
    font-size: 10px;
    background-color: transparent;
    border: none;
    color: #f1f1f1;
    cursor: pointer;
}

button:hover {
    color: #bbbbbb;
    stroke: #bbbbbb;
}

::-webkit-scrollbar {
    height: 5px;
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #1e1e1e;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    padding: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: white;
}
</style>