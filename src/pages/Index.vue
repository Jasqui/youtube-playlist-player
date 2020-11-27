<template>
    <q-page class="bg-dark">
            <youtube
                :video-id="videoId"

                :player-vars="playerVars"

                v-if="videoId"
                
                :player-height="frameHeight"
                :player-width="frameWidth"
                
                ref="youtube"

                @ended="onVideoEnded"
            ></youtube>
    </q-page>
</template>

<style scoped>
.video-responsive{
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
}
.video-responsive iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}
</style>

<script>
import StateControllerMixin from '@mixins/StateControllerMixin.js'
import { debounce } from 'quasar'

export default {
    name: 'Index',
    mixins: [StateControllerMixin],
    data() {
        return {
            playerVars: {
                autoplay: 1
            },
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth
        }
    },
    mounted() {
        window.addEventListener('resize', 
            debounce(_ => {
                this._setInnerWidth();
                this._setInnerHeight()
            }, 300)
        );
    },
    methods: {
        onVideoEnded() {
            this.GoNextVid();
        },
        _setInnerHeight() {
            this.innerHeight = window.innerHeight;
        },
        _setInnerWidth() {
            this.innerWidth = window.innerWidth;
        }
    },
    computed: {
        frameHeight() {
            return this.innerHeight - 8;
        },
        frameWidth() {
            return this.innerWidth - 300;
        }
    },
    watch: {
        isPlaying() {
            if (this.$refs.youtube) {
                let player = this.$refs.youtube.player;

                if (this.isPlaying)
                    player.playVideo();
                else
                    player.pauseVideo();

            }
        }
    }
}
</script>
