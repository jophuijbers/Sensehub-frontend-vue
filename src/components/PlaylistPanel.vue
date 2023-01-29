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
        ...mapGetters(['getWs', 'getCurrentRoom', 'getUser'])
    },
    mounted(){
        feather.replace();
    },
    updated(){
        feather.replace();
    }
}
</script>

<template>
    <div class="playlist-container">
        <h2>Playlist</h2>
        <ul>
            <li :key="video.name" v-for="video in getCurrentRoom.playlist">
                <p>{{ video.name }}</p>
                <p style="color: #a1a1a1;">{{ formatTime(video.duration) }}</p>
                <button @click="removeVideo(getCurrentRoom.playlist.indexOf(video))" v-if="getUser.isAdmin"><i data-feather="trash-2"></i></button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.playlist-container {
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.6);
    border-radius: 8px;
}

li {
    list-style: none;
    display: flex;
}
</style>