<script>
import Chat from '../components/Chat.vue';
import ClientPanel from '../components/ClientPanel.vue';
import AdminPanel from '../components/AdminPanel.vue';
import { mapGetters, mapMutations } from "vuex";
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';

export default {
    name: "CinemaPlayer",
    components: { ClientPanel, AdminPanel, Chat },
    data() {
        return {
            latency: 0
        }
    },
    methods: {
        ...mapMutations([
            'setStoreTime',
            'setChat',
            'setCurrentRoom',
            'setVideo'
        ]),
        ping() {
            api.ping(this.getWs)
            this.latency -= performance.now()
        },
        formatTime(sec) {
            if(!isNaN(sec)) {
                let data = new Date(parseInt(sec) * 1000).toISOString().substr(11, 8)
                return data
            }
            return '00:00:00'
        },
        formatPath(path) {
            let fileName = path.replace(/\.[^/.]+$/, "").split('/').pop()
            return fileName
        },
        toLobby() {
            this.setVideo(null)
            this.setCurrentRoom(null)
            api.getRooms(this.getWs)
        },
    },
    mounted() {
        this.setVideo(this.$refs.video)

        this.getWs.onmessage = message => {
            let msg = JSON.parse(message.data)

            if(msg[0].method === 'patch' && msg[0].type === 'status') {
                this.ping()
                if(this.getCurrentRoom.path !== msg[1].path) this.$refs.video.load()
                this.setCurrentRoom(msg[1])
                this.$refs.video.currentTime = msg[1].time
                msg[1].play ? this.$refs.video.play() : this.$refs.video.pause()
            }

            if(msg[0].method === 'trace' && msg[0].type === 'pong') {
                this.latency += performance.now()
                this.$refs.video.currentTime += (this.latency / 1000 / 2)
            }
            
            if(msg[0].method === 'patch' && msg[0].type === 'chat') {
                this.setChat(msg[1])
            }
        }
        feather.replace();
        api.getStatus(this.getWs, this.getCurrentRoom.name)
        
        this.$refs.video.ontimeupdate = () => {
            this.setStoreTime(this.$refs.video.currentTime)
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getVideo', 'getTime', 'getChat', 'getUser'])
    }
}
</script>



<template>
    <div>
        <div @click="toLobby()" class="back-wrapper">
            <i data-feather="chevron-left"></i>
            <h1 style="margin-left: 10px;" >{{ this.getCurrentRoom.name }}</h1>
        </div>
        <div class="horizontal-container">
            <video ref="video" class="video-player">
                <source :src="getCurrentRoom.path" type="video/mp4">
            </video>
            <Chat />
        </div>
        <div style="margin-left: 50px; margin-top: 5px;">
            <div style="display: flex; justify-content: space-between; width: 70vw;">
                <ClientPanel />
                <p>{{ formatTime(getTime) + '/' + formatTime(getCurrentRoom.duration) }}</p>
                <p>{{ formatPath(getCurrentRoom.path) }}</p>
                
            </div>
            <AdminPanel v-if="getUser.isAdmin"/>
        </div>
    </div>
</template>



<style scoped>
.back-wrapper {
    display: flex;
    align-items: center;
    width: 250px;
    margin: 80px 0px 0px 20px; 
    cursor: pointer;
}

video::-webkit-media-controls-enclosure {
  display:none !important;
}
.horizontal-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
}
.video-player {
    width: 70vw;
    max-height: 70vh;
    margin-left: 50px;
}

video {
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.6);
    border-radius: 8px;
}
</style>