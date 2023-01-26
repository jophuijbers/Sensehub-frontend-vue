<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters } from 'vuex'

export default {
    name: "clientPanel",
    data() {
        return {
            volume: 100
        }
    },
    methods: {
        sync() {
            api.getStatus(this.getWs, this.getCurrentRoom.name)
        }
    },
    mounted() {
        feather.replace()
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getVideo'])
    },
}
</script>

<template>
    <div class="panel-container">
        <button @click="sync()" type="button"><i class="button" data-feather="refresh-cw"></i></button>
        <div style="display: flex; align-items: center;">
            <i data-feather="volume-2"></i>
            <input @input="getVideo.volume = (volume / 100)" v-model="volume" type="range" min="0" max="100">
        </div>
        <button @click="getVideo.requestFullscreen()" type="button"><i class="button" data-feather="maximize"></i></button>
    </div>
</template>

<style scoped>
.panel-container {
    display: flex;
    padding: 5px;
    align-items: center; 
    justify-content: space-between; 
    width: 300px;
}

button{
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
svg {
    height: 20px;
    stroke: #f1f1f1;
}
.button:hover {
    stroke: #bbbbbb;
}
</style>