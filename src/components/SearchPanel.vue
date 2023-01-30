<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters } from 'vuex'

export default {
    name: "searchPanel",
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {
        addVideo(video) {
            api.postVideo(this.getWs, this.getCurrentRoom.name, video)
        }
    },
    computed: {
        ...mapGetters(['getVideos']),
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
    <div class="results-container">
        <input @keyup.enter="addVideo(searchValue)" v-model="searchValue" type="text" placeholder="Search video"
            style="margin-right: 0px 10px">
        <ul>
            <li v-for="video in videos" :key="video" @click="addVideo(video)">{{ video }}</li>
        </ul>
    </div>
</template>

<style scoped>
.results-container {
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

input {
    text-align: center;
    width: 100%;
    margin: 10px;
    height: 20px;
    font-size: 15px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
    color: #f1f1f1;
}

ul {
    margin: 20px;
}

li {
    list-style: none;
    margin: 10px 0px;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
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