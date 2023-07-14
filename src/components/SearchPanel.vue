<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters } from 'vuex'

export default {
    name: "searchPanel",
    data() {
        return {
            searchValue: '',
            showOverlay: false,
        }
    },
    methods: {
        addVideo(video) {
            console.log(this.getUser.isAdmin)
            this.getUser.isAdmin ? api.postVideo(this.getWs, this.getCurrentRoom.name, video) : api.postRequestVideo(this.getWs, this.getCurrentRoom.name, this.getUser.username, video)
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getVideos', 'getUser']),
        videos() {
            let searchValues = []
            searchValues = this.getVideos.filter(video => video.toLowerCase().includes(this.searchValue.toLowerCase()))
            return this.searchValue === '' ? [] : searchValues
        }
    },
    mounted() {
        feather.replace()
        api.getVideos(this.getWs)
    },
    updated() {
        feather.replace()
    }
}
</script>

<template>
    <div>
        <div v-if="getUser.isAdmin || this.getCurrentRoom.type === 'cinema'" @click="showOverlay = true"
            style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <i data-feather="search"></i>
        </div>
        <div v-if="showOverlay" class="overlay">
            <div class="results-container">
                <div class="search-video">
                    <input @keyup.enter="addVideo(searchValue)" v-model="searchValue" type="text" placeholder="Search video"
                        autofocus />
                    <div class="back-button" @click="showOverlay = false"><i data-feather="x"></i></div>
                </div>
                <ul>
                    <li v-for="(video, index) in videos" :key="index" @click="addVideo(video)">{{ video }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3;
}

svg:hover {
    stroke: #a1a1a1;
}

.back-button:hover {
    cursor: pointer;
}

.results-container {
    display: flex;
    flex-direction: column;
    box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    background-color: #1e1e1e;
    border-radius: 8px;
    min-width: 250px;
    width: 400px;
    height: 30vh;
    max-height: 30vh;
    transition: all .3s ease;
    border-radius: 8px;
    max-width: 400px;
    z-index: 999999;
}

.search-video {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 15px;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 0px 10px 0px;
}

input {
    height: 20px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    color: #f1f1f1;
}

svg {
    height: 16px;
}

ul {
    padding: 0;
    margin: 0px 15px;
    overflow-x: hidden;
    overflow-y: scroll;
}

li {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    list-style: none;
    padding: 8px 0px;
    border-bottom: 1px solid #f1f1f1;
}

li:hover {
    cursor: pointer;
    color: #a1a1a1;
}

input:focus {
    outline: none;
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