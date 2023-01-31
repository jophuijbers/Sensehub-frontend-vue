<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: "AdminPanel",
    components: {},
    data() {
        return {
            autoplay: true,
            loop: false,
            inputTime: null,
            path: '',
            sliderTime: 0,
            searchValue: '',
        }
    },
    methods: {
        ...mapMutations([
            'setTime',
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

        postTime(time) {
            api.postTime(this.getWs, this.getCurrentRoom.name, time)
        },

        addVideo(video) {
            api.postVideo(this.getWs, this.getCurrentRoom.name, video)
        },
        removeVideo(index) {
            api.deleteVideo(this.getWs, this.getCurrentRoom.name, index)
        },
        setIndex(index) {
            api.patchIndex(this.getWs, this.getCurrentRoom.name, index)
        },

        formatTime(sec) {
            if (!isNaN(sec)) {
                var data = new Date(parseInt(sec) * 1000).toISOString().substr(11, 8)
                return data
            }
            return '00:00:00'
        },
    },
    mounted() {
        feather.replace()
        api.getVideos(this.getWs)
    },
    updated() {
        feather.replace()
    },
    computed: {
        ...mapGetters(['getVideo', 'getWs', 'getCurrentRoom', 'getTime']),
        time: {
            get() {
                return this.getTime
            },
            set(value) {
                this.setTime(value)
            }
        }
    }
}
</script>

<template>
    <div class="panel-container">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%;">
            <div class="wrapper">
                <button @click="setIndex(-1)" type="button"><i data-feather="skip-back"></i></button>
                <button @click="setIndex(1)" type="button"><i data-feather="skip-forward"></i></button>
                <button v-show="!getCurrentRoom.play" @click="setPlay()" type="button"><i
                        data-feather="play"></i></button>
                <button v-show="getCurrentRoom.play" @click="setPlay()" type="button"><i
                        data-feather="pause"></i></button>
                <label>Autoplay<input @click="setAutoplay()" type="checkbox" v-model="autoplay"></label>
                <label>Loop<input @click="setLoop()" type="checkbox" v-model="loop"></label>
                <button @click="syncClients()" type="button">Sync clients</button>
                <button @click="clearChat()" type="button">Clear chat</button>
                <button @click="removeVideo(getCurrentRoom.index)" type="button">Remove video</button>
            </div>
            <div class="flex between">
                <input @keyup.enter="postTime(time + inputTime); inputTime = null" v-model="inputTime" type="number"
                    placeholder="Add time in sec." min="0" style="margin-right: 0px 10px">
                <input v-model="path" type="text" placeholder="Path (Not working yet)" style="margin-right: 0px 10px">
            </div>
            <div class="flex" style="width: 100%">
                <p>{{ formatTime(time) }}</p>
                <input style="border: none;" class="time-slider" @change="postTime(time)"
                    @input="() => getVideo.currentTime = time" v-model="time" type="range"
                    :max="getCurrentRoom.duration">
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel-container {
    border-radius: 8px;
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    width: 70%;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.flex {
    display: flex;
    align-items: center;
}

.between {
    justify-content: space-around;
}

button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    color: #f1f1f1;
    cursor: pointer;
    font-size: 12px;
}

label {
    display: flex;
    font-size: 12px;
    padding: 8px;
}

input[type="checkbox"] {
    margin-left: 8px;
}

button:hover {
    color: #bbbbbb;
    stroke: #bbbbbb;
}

svg {
    height: 14px;
    stroke: #f1f1f1;
}

input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
    color: #f1f1f1;
}

input:focus {
    outline: none;
}

.time-slider {
    width: 100%;
}

.flex input {
    width: 48%;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
}

input[type=range] {
    height: 24px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
}

input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #F1F1F1;
    border-radius: 1px;
    border: 0px solid #000000;
    border-radius: 5px;
}

input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #F1F1F1;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #A1A1A1;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6.5px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #F1F1F1;
}

input[type=range]::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000;
    background: #F1F1F1;
    border-radius: 1px;
    border: 0px solid #000000;
}

input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #F1F1F1;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #A1A1A1;
    cursor: pointer;
}

input[type=range]::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type=range]::-ms-fill-lower {
    background: #F1F1F1;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-fill-upper {
    background: #F1F1F1;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #F1F1F1;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #A1A1A1;
    cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
    background: transparent;
}

input[type=range]:focus::-ms-fill-upper {
    background: transparent;
}

@media screen and (max-width: 1355px) {
    .panel-container {
        flex-direction: column;
    }

}

@media screen and (max-width: 759px) {
    .chat-container {
        height: 20vh;
        margin-left: 0px;
        min-width: 60vw;
    }

    .chat-button-hide {
        display: none;
    }

    .chat-button-show {
        display: none;
    }

}

@media screen and (max-width: 460px) {
    .chat-container {
        height: 35vh;
        min-width: 70vw;
    }
}
</style>