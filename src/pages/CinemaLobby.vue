<script>
import { mapMutations, mapGetters } from "vuex"
import feather from "feather-icons"
import api from "../services/websocket/websocket-service"

export default {
    data() {
        return {
            intervalID: 0,
        }
    },
    methods: {
        ...mapMutations(["setStoreRooms", "setCurrentRoom"]),
        setRooms(tempRooms) {
            if (tempRooms === undefined) {
                const map = this.getRooms.map((room) => {
                    if (room.time !== 0 && room.play === true) room.time++
                    return room
                })
                this.setStoreRooms(map)
            } else {
                this.setStoreRooms(tempRooms)
                clearInterval(this.intervalID)
                this.intervalID = setInterval(() => this.setRooms(), 1000)
            }
        },

        onClick(room) {
            this.setCurrentRoom(room)
            clearInterval(this.intervalID)
        },

        formatTime(room) {
            let time = "00:00:00"
            let duration = "00:00:00"

            if (!isNaN(room.time) && room.path !== "")
                time = new Date(parseInt(room.time) * 1000)
                    .toISOString()
                    .substr(11, 8)
            if (!isNaN(room.duration))
                duration = new Date(parseInt(room.duration) * 1000)
                    .toISOString()
                    .substr(11, 8)

            return `${time} / ${duration}`
        },
    },
    mounted() {
        (this.getWs.onmessage = (message) => {
            let msg = JSON.parse(message.data)

            if (msg[0].method === "patch" && msg[0].type === "rooms") {
                this.setRooms(msg[1])
            }
        }),
            this.$refs.cinemaContainer.addEventListener("wheel", (e) => {
                if (e.deltaY > 0) {
                    this.$refs.cinemaContainer.scrollLeft += 80
                } else {
                    this.$refs.cinemaContainer.scrollLeft -= 80
                }
            })

        this.$refs.roomContainer.addEventListener("wheel", (e) => {
            if (e.deltaY > 0) {
                this.$refs.roomContainer.scrollLeft += 80
            } else {
                this.$refs.roomContainer.scrollLeft -= 80
            }
        })

        api.getRooms(this.getWs)
        feather.replace()
    },
    updated: () => {
        feather.replace()
    },
    computed: {
        ...mapGetters(["getWs", "getCurrentRoom", "getRooms"]),
    },
}
</script>

<template>
    <div class="container">
        <div class="cinema-wrapper">
            <h1>Cinema's</h1>
            <div ref="cinemaContainer" class="cinema-container">
                <template class="scroll" v-for="room in this.getRooms">
                    <li class="cinema-card" @click="onClick(room)" :key="room.name" v-if="room.type === 'cinema'">
                        <div class="relative-cinema">
                            <div class="darken"></div>
                            <div class="cinema-info">
                                <div>
                                    <h2>{{ room.name }}</h2>
                                </div>
                                <div class="dot-indicator">
                                    <div style="
                                            display: flex;
                                            align-items: center;
                                        ">
                                        <div class="dot" :class="{
                                            live:
                                                room.play &&
                                                room.initialized,
                                            'not-initialized':
                                                room.play &&
                                                !room.initialized,
                                            'not-live': !room.play,
                                        }"></div>
                                        <p class="room-participants">
                                            {{
                                                room.clients
                                            }}<i data-feather="user"></i>
                                        </p>
                                    </div>
                                    <p class="room-time">
                                        {{ formatTime(room) }}
                                    </p>
                                </div>
                            </div>
                            <div class="room-image">
                                <img :src="room.thumbnail" />
                            </div>
                        </div>
                    </li>
                </template>
            </div>
        </div>
        <div class="rooms-wrapper">
            <h1>Channels</h1>
            <div ref="roomContainer" class="rooms-container">
                <template v-for="room in this.getRooms">
                    <li class="room-card" @click="onClick(room)" :key="room.name" v-if="room.type === 'channel'">
                        <div class="relative">
                            <div class="darken"></div>
                            <div class="room-info">
                                <div>
                                    <h2>{{ room.name }}</h2>
                                </div>
                                <div class="dot-indicator">
                                    <div style="
                                            display: flex;
                                            align-items: center;
                                        ">
                                        <div class="dot" :class="{
                                            live:
                                                room.play &&
                                                room.initialized,
                                            'not-initialized':
                                                room.play &&
                                                !room.initialized,
                                            'not-live': !room.play,
                                        }"></div>
                                        <p class="room-participants">
                                            {{
                                                room.clients
                                            }}<i data-feather="user"></i>
                                        </p>
                                    </div>
                                    <p class="room-time">
                                        {{ formatTime(room) }}
                                    </p>
                                </div>
                            </div>
                            <div class="room-image">
                                <img :src="
    room.playlist[room.index].thumbnail ===
        undefined
        ? room.thumbnail
        : room.playlist[room.index]
            .thumbnail
                                " />
                            </div>
                        </div>
                    </li>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0px 50px 0px 50px;
    margin-top: 60px;
}

.container h1 {
    margin-top: 20px;
}

.cinema-card {
    width: 40vw;
    height: 40vh;
    min-width: 550px;
    max-width: 550px;
    height: 100%;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    margin-bottom: 30px;
    margin: 0px 10px;
    transition: all 0.3s ease;
}

.cinema-card:hover {
    transform: scale(1.02);
    cursor: pointer;
}

.cinema-container {
    display: flex;
    padding: 10px 0px;
    overflow-x: auto;
    overflow-y: hidden;
    height: 41vh;
    -webkit-box-shadow: inset 0px 0px 50px -3px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0px 0px 50px -3px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
}

.cinema-wrapper {
    height: 50vh;
}

.darken {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    border-radius: 8px;
    top: 0;
    left: 0;
}

.darken:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.rooms-container {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 10px 0px;
    height: 30vh;
    border-radius: 8px;
    -webkit-box-shadow: inset 0px 0px 50px -3px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0px 0px 50px -3px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
}

.room-participants {
    display: flex;
    align-items: center;
}

.relative {
    position: relative;
    border-radius: 8px;
    height: 100%;
    width: 100%;
}

.relative-cinema {
    position: relative;
    border-radius: 8px;
    height: 100%;
    width: 100%;
}

.room-participants svg {
    height: 14px;
    stroke-width: 2;
}

.dot-indicator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.dot-indicator p {
    margin: 0;
    font-size: 12px;
}

.room-card {
    margin: 0px 10px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    min-width: 350px;
    max-width: 350px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.room-card:hover {
    transform: scale(1.02);
}

.room-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

.cinema-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 10px 20px;
    margin: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

.room-info h2 {
    font-weight: bold;
    margin: 0;
}

.room-image {
    width: 100%;
    height: 100%;
}

.room-image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 8px;
}

.live {
    animation: blinker 2s linear infinite;
    background-color: green;
    font-size: xx-large;
    text-align: left;
}

.dot {
    height: 7px;
    width: 7px;
    border-radius: 25px;
    margin-right: 8px;
}

.not-initialized {
    background-color: orange;
    font-size: xx-large;
    text-align: left;
}

.not-live {
    background-color: red;
}

.ellipsis {
    text-overflow: ellipsis;

    /* Required for text-overflow to do anything */
    white-space: nowrap;
    overflow: hidden;
}

li {
    list-style: none;
}

/*Scrollbar*/
/* width */
::-webkit-scrollbar {
    height: 3px;
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

@keyframes blinker {
    50% {
        opacity: 0;
    }
}

@media screen and (max-width: 759px) {
    .cinema-card {
        min-width: 300px;
        max-width: 300px;
    }

    .room-card {
        min-width: 300px;
        max-width: 300px;
    }

    .container {
        padding: 0px 10px 0px 10px;
    }

    .container h1 {
        padding: 0px;
        margin-left: 0px;
    }
}

@media screen and (max-width: 460px) {
    .cinema-card {
        min-width: 250px;
        max-width: 250px;
    }

    .room-card {
        min-width: 250px;
        max-width: 250px;
    }
}
</style>
