<script>
import api from '../services/websocket/websocket-service'
import { mapMutations, mapGetters } from 'vuex'
import feather from 'feather-icons'

export default {
    name: "chat",
    data() {
        return {
            chatMessage: '',
            growChat: true,
            clientHover: false,
            infoHover: false,
            clientColors: new Map,
            hideMessageTime: 4,
            disco: false,
            discoKey: 0,
            intervalID: 0,
            storedVolume: 0,
        }
    },
    methods: {
        ...mapMutations([
            'setCurrentRoom',
            'setVolume'

        ]),
        sendChat() {
            if (this.chatMessage.trim() !== '') {
                if (this.chatMessage.substring(0, 6) === '/disco') {
                    this.disco = !this.disco
                    this.runDisco()
                } else if (this.chatMessage.substring(0, 5) === '/hide') {
                    this.growChat = false
                } else if (this.chatMessage.substring(0, 6) === '/lobby') {
                    this.setCurrentRoom(null)
                } else {
                    api.putChat(this.getWs, this.getCurrentRoom.name, this.getUser.username, this.chatMessage)
                }
                this.chatMessage = ''
            }
            else {
                alert('Nothing found in chat input.')
            }
        },
        toggleChat() {
            this.growChat = !this.growChat
        },
        formatTime(timeStamp) {
            let formattedTime = new Date(timeStamp).toString().substr(16, 5)
            return formattedTime
        },
        getClientColor(clientName) {
            if (!this.clientColors.has(clientName)) {
                let hsla = `hsla(${360 * Math.random()}, 80%, 70%, 1)`
                this.clientColors.set(clientName, hsla)
            }
            return this.clientColors.get(clientName)
        },
        checkTime(timeStamp) {
            let check = (parseInt(Date.parse(timeStamp)) + (this.hideMessageTime * 60 * 60 * 1000)) > Date.now()
            return check
        },
        runDisco() {
            clearInterval(this.intervalID)
            if (this.disco === true) {
                this.clientColors.clear()
                this.discoKey++
                this.intervalID = setInterval(() => this.runDisco(), 500)
            }
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getUser', 'getChat', 'getVideo', 'getVolume']),
    },
    mounted() {
        feather.replace();
        this.$refs.chatBox.scrollIntoView(false)
        this.runDisco()
    },
    updated() {
        feather.replace();
    }
}
</script>

<template>
    <div>
        <div :style="{ transform: growChat ? 'rotate(180deg)' : 'rotate(0deg)' }" class="chat-button-show"
            @click="toggleChat">
            <i data-feather="chevron-left"></i>
        </div>
        <div class="chat-container" :style="{ display: growChat ? 'flex' : 'none' }">
            <ul class="chatBox" ref="chatBox" style="flex-grow: 1;">
                <li class="info-container">
                    <div @mouseover="infoHover = true" @mouseleave="infoHover = false"
                        style="display: flex; align-items: center; position: relative;">
                        <i data-feather="info"></i>
                        <ul class="info-box" :style="{ visibility: infoHover ? 'visible' : 'hidden' }">
                            <li>
                                <h4>/play</h4>
                                <p>vote to play video</p>
                            </li>
                            <li>
                                <h4>/pause</h4>
                                <p>vote to pause video</p>
                            </li>
                            <li>
                                <h4>/skip</h4>
                                <p>vote to skip video</p>
                            </li>
                            <li>
                                <h4>/hide</h4>
                                <p>hides chat</p>
                            </li>
                            <li>
                                <h4>/lobby</h4>
                                <p>returns to lobby</p>
                            </li>
                            <li>
                                <h4>/accept</h4>
                                <p>accepts current request</p>
                            </li>
                        </ul>
                    </div>
                    <p style="font-size:small; color: #6e6e6e; text-align: center;">Messages get
                        removed after {{ hideMessageTime }} hours</p>
                </li>
                <ul :key="discoKey">
                    <template v-for="(message, index) in getChat.chat">
                        <li class="message" v-if="message.clientName !== 'server' &&
                            (getUser.isAdmin || checkTime(message.timeStamp))" :key="index"
                            :style="checkTime(message.timeStamp) ? {} : { 'font-style': 'italic' }">
                            <p style="font-weight: lighter; font-size: 14px; display: flex;">{{
                                formatTime(message.timeStamp)
                            }} </p>
                            <p :style="[{ 'font-weight': 500 }, { color: getClientColor(message.clientName) }]">{{
                                `${message.clientName}:` }}</p>
                            <p style="word-break: break-word;"
                                :style="checkTime(message.timeStamp) ? { 'color': '#ccc8c1' } : { 'color': '#6e6e6e', 'font-style': 'italic' }">
                                {{ message.message }}</p>
                        </li>
                        <li class="message" v-if="message.clientName === 'server' &&
                            (getUser.isAdmin || checkTime(message.timeStamp))" :key="index"
                            :style="checkTime(message.timeStamp) ? {} : { 'font-style': 'italic' }">
                            <p style="font-weight: lighter; font-size: 14px; display: flex;">{{
                                formatTime(message.timeStamp)
                            }} </p>
                            <p style="font-weight: 500; color: #ff0000">{{
                                '[server] ' }}</p>
                            <p style="color: #6e6e6e; word-break: break-word;">{{ message.message }}</p>
                        </li>
                    </template>
                    <div id="anchor"></div>
                </ul>
            </ul>
            <div class="horizontal-container">
                <div @mouseover="clientHover = true" @mouseleave="clientHover = false"
                    style="display: flex; align-items: center; position: relative;">
                    <p> {{ getChat.clients !== undefined ? getChat.clients.length : 0 }} <i data-feather="user"></i></p>
                    <ul ref="clients" class="clients" style="margin: 0px 0px 50px 30px;"
                        :style="{ visibility: clientHover ? 'visible' : 'hidden' }">
                        <li :key="client" v-for="client in getChat.clients">{{ client }}</li>
                    </ul>
                </div>
                <input @keyup.enter="sendChat()" v-model="chatMessage" type="text" placeholder="Type a message...">
                <button @click="sendChat()"><i data-feather="send"></i></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#anchor {
    height: 1px;
    overflow-anchor: auto;
}

.absolute {
    position: absolute;
}

.relative {
    position: relative;
    left: 0;
    bottom: 0;
}

.clients {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px 10px;
    border-radius: 8px;
    position: absolute;
    z-index: 1;
}

.chat-container {
    display: flex;
    flex-direction: column;
    box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    width: 100%;
    min-width: 350px;
    max-width: 350px;
    height: 60vh;
    max-height: 60vh;
    margin-left: 20px;
    transition: all .3s ease;
}

.info-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.info-container svg {
    height: 16px;
    margin-right: 5px;
}

.info-box {
    background-color: rgba(0, 0, 0, 0.6);
    left: 26px;
    top: 20px;
    padding: 5px 10px;
    border-radius: 8px;
    position: absolute;
    z-index: 1;
    white-space: nowrap;
}

.info-box li {
    padding: 2px;
}

.message {
    display: flex;
}

.message p {
    justify-content: center;
    align-items: center;
    margin-right: 3px;
}

.chat-button-show {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 45%;
    right: 0;
    padding: 5px;
    width: 30px;
    height: 30px;
    margin-right: 12px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    transition: all .3s ease;
    z-index: 5;
}

.chat-button-show:hover {
    cursor: pointer;
    margin-right: 10px;
}

input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 20px;
    font-size: 12px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
    color: #f1f1f1;
}

input:focus {
    outline: none;
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
    stroke: #bbbbbb;
    transform: scale(1.1)
}

svg {
    height: 14px;
}

.horizontal-container {
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px;
    max-height: 20px;
}

.horizontal-container p {
    display: flex;
    align-items: center;
}

.chatBox {
    padding: 0;
    margin: 15px;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
}

ul * {
    overflow-anchor: none;
}

li {
    list-style: none;
    align-items: baseline;
}

.client {
    color: #a1a1a1;
}

@media screen and (max-width: 1355px) {
    .chat-container {
        height: 15vh;
        margin-left: 0px;
        min-width: 40vw;
    }

    .chat-button-hide {
        display: none;
    }

    .chat-button-show {
        display: none;
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

/*Scrollbar*/
/* width */
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