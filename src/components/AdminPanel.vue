<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: "AdminPanel",
    data() {
        return {
            autoplay: true,
            loop: false,
            inputTime: null,
            path: '',
            sliderTime: 0,
        }
    },
    methods: {
        ...mapMutations([
            'setStoreTime',
        ]),

        setPlay() {
            api.patchPlay(this.getWs, this.getCurrentRoom.name)
        }, 

        setAutoplay() {
            api.patchAutoplay(this.getWs, this.getCurrentRoom.name, !this.autoplay)
        },

        setLoop() {
            api.patchLoop(this.getWs, this.getCurrentRoom.name, !this.loop)
        },

        syncClients() {
            api.patchStatus(this.getWs, this.getCurrentRoom.name)
        },

        clearChat() {
            api.deleteChat(this.getWs, this.getCurrentRoom.name)
        },

        setTime(time) {
            api.postTime(this.getWs, this.getCurrentRoom.name, time)
        },

        setPath() {
            api.patchPath(this.getWs, this.getCurrentRoom.name, this.path)
        },

        setIndex(index) {
            let tempIndex = this.getCurrentRoom.index + index

            if(tempIndex > (this.getCurrentRoom.playlist.length - 1)) {
                tempIndex = 0
            }
            else if(tempIndex < 0) {
                tempIndex = (this.getCurrentRoom.playlist.length - 1)
            }
            api.patchIndex(this.getWs, this.getCurrentRoom.name, tempIndex)
        },

        formatTime(sec) {
            if(!isNaN(sec)) {
                var data = new Date(parseInt(sec) * 1000).toISOString().substr(11, 8)
                return data
            }
            return '00:00:00'
        },
    },
    mounted() {
        feather.replace()
    },
    computed: {
        ...mapGetters(['getVideo', 'getWs', 'getCurrentRoom', 'getTime']),
    }
}
</script>

<template>
    <div class="panel-container">
        <div class="wrapper">
            <button @click="setIndex(-1)" type="button">prev</button>
            <button @click="setIndex(1)" type="button">next</button>
            <button @click="setPlay()" type="button"><i data-feather="play"></i><i style="margin-left: -16px;" data-feather="pause"></i></button>
            <label>autoplay<input @click="setAutoplay()" type="checkbox" v-model="autoplay"></label>
            <label>loop<input @click="setLoop()" type="checkbox" v-model="loop"></label>
            <button @click="syncClients()" type="button">sync clients</button>
            <button @click="clearChat()" type="button">clear chat</button>
            <input @keyup.enter="setTime(getTime + inputTime); inputTime = null" v-model="inputTime" type="number" placeholder="Add time in sec." min="0">
            <input @keyup.enter="setPath(path)" v-model="path" type="text" placeholder="Path">
        </div>
        <p>{{ formatTime(sliderTime) }}</p>
        <input class="time-slider" @change="(time) => setTime(time.target._value)" v-model="sliderTime" type="range" :max="getCurrentRoom.duration">
    </div>
</template>

<style scoped>
.panel-container {
    border-radius: 8px;
    margin-top: 10px;
    margin-right: 50px;
    padding: 5px;
}
.wrapper {
    display: flex;
    align-items: center;
}

button{
    display: flex;
    align-items: center;
    background-color: transparent;
    margin-right:10px;
    border: none;
    color: #f1f1f1;
    cursor: pointer;
}
button:hover{
    color: #bbbbbb;
    stroke: #bbbbbb;
}
svg {
    height: 14px;
    stroke: #f1f1f1;
}

input{
    margin-right:10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    color: #f1f1f1;
}
input:focus{
    outline: none;
}
.time-slider {
    width: 100%;
}
</style>