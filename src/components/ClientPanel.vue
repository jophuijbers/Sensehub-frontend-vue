<script>
import api from '../services/websocket/websocket-service'
import feather from 'feather-icons';
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: "clientPanel",
    data() {
        return {
          storedVolume: 100
        }
    },
    methods: {
      ...mapMutations([
        'setTime',
        'setVolume'

      ]),
        sync() {
            api.getStatus(this.getWs, this.getCurrentRoom.name)
        },
        volumeToggle(){
            if(this.volume > 0){
              this.storedVolume = this.volume
              this.volume = 0
              this.getVideo.volume = 0;
            }
            else {
              this.volume = this.storedVolume
              this.getVideo.volume = this.storedVolume / 100;
            }
        },
    },
    mounted() {
        feather.replace()
    },
    updated(){
        feather.replace();
    },
    computed: {
        ...mapGetters(['getWs', 'getCurrentRoom', 'getVideo', 'getVolume']),
        volume: {
            get() {
                return this.getVolume
            },
            set(value) {
                this.setVolume(value)
            }
        }
    },
}
</script>

<template>
    <div class="panel-container">
        <button @click="sync()" type="button"><i class="button" data-feather="refresh-cw"></i></button>
        <div style="display: flex; align-items: center;">
                <div @click="volumeToggle" style="display: flex; align-items: center; padding: 8px; cursor: pointer;">
                    <div style="display: flex; align-items: center;">
                      <div class="volume" v-show="volume > 50"><i data-feather="volume-2"></i></div>
                      <div class="volume" v-show="(volume > 0 && volume <= 50)"><i data-feather="volume-1"></i></div>
                      <div class="volume" v-show="volume < 1"><i data-feather="volume-x"></i></div>
                    </div>
                </div>
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
    background-color: transparent;
}
.volume:hover {
  stroke: #bbbbbb;
  transform: scale(1.1)
}
.button:hover {
    stroke: #bbbbbb;
    transform: scale(1.1)
}
.info {
    display: flex;
    align-items: center;
}

/* input slide styles */
input {
    background: transparent;
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
  border: 0px solid #A1A1A1;
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
</style>