import { mapState , mapMutations, mapGetters } from 'vuex';

export default {
    methods: {
        ...mapMutations('States', [
            'SetCurrentVideo',
            'SetVideoList',
            'SetShuffledList',
            'GoNextVid',
            'GoPreviousVid',
            'AddVideo',
            'TogglePlayState',
            'ToggleRepeatOptions'
        ]),
        ...mapGetters('States', [
            'GetCurrentVideo',
            'GetCurrentVideoTitle'
        ])
    },
    computed: {
        ...mapState ('States', [
            'videoId',
            'originalVideoList',
            'shuffledList',
            'isShuffled',
            'isPlaying'
        ])
    }
}