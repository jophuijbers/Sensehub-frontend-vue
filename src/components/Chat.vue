<script>
import api from '../services/websocket/websocket-service'
import { mapGetters } from 'vuex'
import feather from 'feather-icons'

export default {
    name: "chat",
    data() {
        return {
            chatMessage: '',
            growChat: true,
        }
    },
    methods: {
        sendChat() {
            if(this.chatMessage.trim() !== ''){
                api.putChat(this.getWs, this.getCurrentRoom.name, this.getUser.username, this.chatMessage)
                this.chatMessage = ''
            }
            else{
                alert('Nothing found in chat input.')
            }
        },
        toggleChat(){
            this.growChat = !this.growChat
        }
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getUser', 'getChat'])
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
    <div>
        <div :style="{transform: growChat ? 'rotate(180deg)' : 'rotate(0deg)'}" class="chat-button-show" @click="toggleChat">
            <i data-feather="chevron-left"></i>
        </div>
        <div class="chat-container" :style="{display: growChat ? 'flex' : 'none'}">
            <ul style="flex-grow: 1;">
                <template v-for="message in this.getChat.chat">
                    <li :key="message.message" v-if="message.clientName !== getUser.username">{{ message.clientName + ': ' + message.message }}</li>
                    <li :key="message" class="right" v-else>{{ message.message }}</li>
                </template>
            </ul>
            <div class="horizontal-container">
                <p> {{ getChat.clients }} <i data-feather="user"></i></p>
                <input @keyup.enter="sendChat()" v-model="chatMessage" type="text" placeholder="Type a message...">
                <button @click="sendChat()"><i data-feather="send"></i></button>
            </div>
            <div id="anchor"></div>
        </div>
    </div>
</template>

<style scoped>
.absolute {
    position: absolute;
}
.relative {
    position: relative;
    left: 0;
    bottom: 0;
}
.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0px 0px 8px 0px rgba(0,0,0,0.6);
    border-radius: 8px;
    width: 100%;
    min-width: 250px;
    max-width: 250px;
    height: 60vh;
    max-height: 60vh;
    margin-left: 10px;
    transition: all .3s ease;
    overflow-x: hidden;
    overflow-y: scroll;
}
.chat-container * {
    overflow-anchor: none;
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
    font-size: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0px;
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
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 8px;
    max-height: 20px;
    overflow-anchor: auto;
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
    color: #a1a1a1;
}

@media screen and (max-width: 1355px) {
    .chat-container{
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
    .chat-container{
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
@media screen and (max-width: 460px){
  .chat-container{
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