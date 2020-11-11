<template>
    <q-drawer
        :value="value"
        @input="$emit('input')"

        show-if-above
        bordered
        content-class="bg-grey-1"
        :breakpoint="300"
    >
        
        <q-bar class="bg-primary absolute-top z-top" dense>
            <template v-if="!!originalVideoList.length">
                <template v-if="!!videoId">
                    <q-icon name="fas fa-music" color="white">
                    </q-icon>

                    <q-toolbar-title style="font-size: 13px" class="text-white text-center">
                        {{GetCurrentVideoTitle()}}

                        <q-tooltip>
                            {{GetCurrentVideoTitle()}}
                        </q-tooltip>                    
                    </q-toolbar-title>

                    <q-icon name="fas fa-music" color="white">
                    </q-icon>
                </template>

                <template v-else>
                    <q-icon name="fas fa-hand-pointer" color="white">
                    </q-icon>

                    <q-toolbar-title style="font-size: 13px" class="text-white text-center">
                        Select a song or press play :)               
                    </q-toolbar-title>

                    <q-icon name="fas fa-hand-pointer" color="white">
                    </q-icon>                    
                </template>
            </template>

            <template v-else>
                <q-icon name="fas fa-arrow-down" color="white">
                </q-icon>

                <q-toolbar-title style="font-size: 13px" class="text-white text-center">
                    Enter a playlist link to continue
                </q-toolbar-title>

                <q-icon name="fas fa-arrow-down" color="white">
                </q-icon>
            </template>
        </q-bar>

        <q-toolbar class="absolute-top bg-primary q-pa-none z-top" style="top:24px">
            <q-input
                v-model="playlistLinkInput"
                label="Playlist Link"
                class="full-width"
                outlined
                bg-color="white"
                
                @keyup.enter="onLinkSubmit"
            >
                <template v-slot:append>
                    <q-btn
                        flat
                        round
                        :color="!playlistLinkInput ? undefined : 'primary'"
                        icon="fas fa-paper-plane"
                        :disable="!playlistLinkInput"
                        @click="onLinkSubmit"
                    >
                    </q-btn>
                </template>
            </q-input>
        </q-toolbar>

        <q-slide-transition>
            <q-toolbar v-if="!!originalVideoList.length" class="absolute-top z-top justify-between bg-white" style="top:80px">
                <q-btn
                    @click="ToggleShuffleList"
                    icon="fas fa-random"
                    :flat="!isShuffled"
                    dense
                    round
                    :unelevated="isShuffled"

                    :color="!isShuffled ? 'primary' : 'blue-2'"
                    text-color="primary"
                >
                    <!-- :color="isShuffled ? 'primary' : 'grey'" -->
                    <q-tooltip>
                        Shuffle
                    </q-tooltip>
                </q-btn>
                
                <q-btn
                    @click="GoPreviousVid"
                    icon="fas fa-step-backward"
                    v-bind="optionBarBtnProps"

                    color="primary"
                >
                    <q-tooltip>
                        Backward
                    </q-tooltip>
                </q-btn>

                <q-btn
                    @click="TogglePlayState"
                    :icon="!isPlaying ? 'fas fa-play' : 'fas fa-pause'"
                    v-bind="optionBarBtnProps"

                    color="primary"
                >
                    <q-tooltip>
                        <span v-if="isPlaying">Pause</span> <span v-else>Resume</span>
                    </q-tooltip>
                </q-btn>                

                <q-btn
                    @click="GoNextVid"
                    icon="fas fa-step-forward"
                    v-bind="optionBarBtnProps"

                    color="primary"
                >
                    <q-tooltip>
                        Next
                    </q-tooltip>
                </q-btn>

                <q-btn
                    @click="ToggleRepeatOptions"
                    icon="fas fa-redo-alt"
                    v-bind="optionBarBtnProps"

                    :color="isShuffled ? 'primary' : 'gray'"
                >
                    <q-tooltip>
                        Toggle Repeat (W.I.P)
                    </q-tooltip>
                </q-btn>

                <!-- <q-btn
                    @click="GoNextVid"
                    icon="fas fa-search"
                    v-bind="optionBarBtnProps"

                    color="primary"
                >
                    <q-tooltip>
                        Filter
                    </q-tooltip>
                </q-btn> -->
                                
            </q-toolbar>
        </q-slide-transition>

        <q-scroll-area style="height: calc(100vh - 144px); margin-top: 136px">
            <q-list v-if="originalVideoList.length">
                <q-item v-for="playlistItem in isShuffled ? shuffledList : originalVideoList" :key="playlistItem.id" clickable @click="onVideoSelect(playlistItem)"
                    :active="playlistItem.contentDetails.videoId == videoId">
                    <q-item-section avatar>
                        <q-img
                            :src="playlistItem.snippet.thumbnails.default.url"
                            width="60px"
                            height="45px"
                        />
    <!-- 
                        :width="`${playlistItem.snippet.thumbnails.default.width}px`"
                        :height="`${playlistItem.snippet.thumbnails.default.height}px`" -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                            {{playlistItem.snippet.title}}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>

            <div class="full-width flex flex-center" style="height: calc(100vh - 204px);">
                <div class="text-center">
                    <q-icon name="fas fa-frown-open" size="42px" color="grey-5"/>
                    <div class="full-width text-center text-italic text-grey-6">
                        Nothing here yet...
                    </div>
                </div>
            </div>
        </q-scroll-area>

        <q-slide-transition>
            <q-bar
                class="absolute-bottom bg-white text-center"
                v-if="!originalVideoList.length"
            >
                <q-toolbar-title
                    style="font-size: 13px"
                    class="text-primary text-bold"
                >
                    App Made by Jasqui
                </q-toolbar-title>
            </q-bar>
        </q-slide-transition>
    </q-drawer>
</template>

<script>
import StateControllerMixin from '@mixins/StateControllerMixin.js'

export default {
    name: 'PlaylistSidebar',
    mixins: [StateControllerMixin],
    props: {
        value: Boolean
    },
    data() {
        return {
            playlistItems: [],
            playlistLinkInput: 'https://www.youtube.com/playlist?list=PLVaD_A2r243OFWaJo5Hy5Y1-uQ81r4B_O',
            playlistSelectedId: '',
            optionBarBtnProps: {
                flat: true,
                dense: true,
                round: true
            }
        };
    },
    methods: {
        ToggleShuffleList() {
            this.SetShuffledList(!this.isShuffled);
        },
        onVideoSelect(playlistItem) {
            let videoId = playlistItem.contentDetails.videoId;

            this.SetCurrentVideo(videoId);
        },
        onLinkSubmit() {
            this.playlistSelectedLink = this._getPlaylistIDFromLink(this.playlistLinkInput);

            this.GetAllPlaylistItems();
        },
        _getPlaylistIDFromLink(playlistLink) {
            let id = playlistLink.split('=')[1];

            return id;
        },
        GetAllPlaylistItems(pageToken) {
            this.GetPlaylistItems(pageToken)
            .then(response => {
                let nextToken = response.data.nextPageToken;
                this.playlistItems.push(...response.data.items);

                if (!!nextToken) {
                    this.GetAllPlaylistItems(nextToken);
                } else {
                    this.SetVideoList(this.playlistItems);
                    this.SetShuffledList();
                }
            });
        },
        GetPlaylistItems(pageToken = undefined) {
            return this.$axios({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/playlistItems',
                params: {
                    part: 'id, snippet, contentDetails',
                    playlistId: this.playlistSelectedLink,
                    key: 'AIzaSyBAXldq_TvBMhIXP-wpk9Hy1wBsCzsi2tI',
                    pageToken,
                    maxResults: 50
                }
            });     
        }
    }
}
</script>