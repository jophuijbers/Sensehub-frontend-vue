<script>
import api from '../services/websocket/websocket-service'
import { mapGetters } from 'vuex'
import feather from 'feather-icons'

export default {
    name: "playlistPanel",
    data() {
        return {
        }
    },
    methods: {
        removeVideo(index) {
            api.deleteVideo(this.getWs, this.getCurrentRoom.name, index)
        },
        formatTime(duration) {
            let formattedTime = new Date(duration * 1000).toISOString().substr(11, 5)
            return formattedTime
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
    <div class="playlist-container">
        <h3>Playlist</h3>
        <ul>
            <li v-for="(video, index) in getCurrentRoom.playlist" :key="index">
                <p>{{ video.name }}</p>
                <p style="color: #a1a1a1;">{{ formatTime(video.duration) }}</p>
                <button @click="removeVideo(getCurrentRoom.playlist.indexOf(video))" v-if="getUser.isAdmin"><i
                        data-feather="trash-2"></i></button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.playlist-container {
    display: flex;
    flex-direction: column;
    box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    width: 100%;
    min-width: 250px;
    height: 30vh;
    max-height: 30vh;
    transition: all .3s ease;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 8px;
    max-width: 400px;
    margin-left: auto;
    margin-right: 0;

}

h3 {
    text-align: center;
    margin: 10px;
}

ul {
    padding: 0;
    margin: 15px;
    position: relative;
}

li {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin: 10px;
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