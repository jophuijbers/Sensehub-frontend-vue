<script>
import api from '../services/websocket/websocket-service'
import { mapGetters } from 'vuex'

export default {
    name: "chat",
    data() {
        return {
            chatMessage: ''
        }
    },
    methods: {
        sendChat() {
            console.log(this.chatMessage)
            api.putChat(this.getWs, this.getCurrentRoom.name, this.getUser.username, this.chatMessage)
            this.chatMessage = ''
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getUser', 'getChat'])
    },
}
</script>

<template>
     <div class="chat-container">
        <ul>
            <template v-for="message in this.getChat.chat">
                <li :key="message.message" v-if="message.clientName !== getUser.username">{{ message.clientName + ': ' + message.message }}</li>
                <li  :key="message" class="right" v-else>{{ message.message }}</li>
            </template>
        </ul>
        <div class="horizontal-container">
            <p> {{ getChat.clients }} <i data-feather="user"></i></p>
            <input @keyup.enter="sendChat()" v-model="chatMessage" type="text" placeholder="Type a message...">
            <button @click="sendChat()"><i data-feather="send"></i></button>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.6);
    border-radius: 8px;
    margin-right: 3%;
    min-width: 20vw;
}
input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 20px;
    font-size: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    color: #f1f1f1;
}
input:focus{
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

p svg {
    height: 14px;
}

button svg {
    height: 14px;
}


.horizontal-container {
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

ul {
    padding: 0;
    margin: 30px;
    position: relative;
}

li {
    list-style: none;
}

.right {
    text-align: right;
}
</style>