import { Shuffle } from '@js/Utils.js'

export function SetCurrentVideo (state, videoId) {
    state.videoId = videoId;
    state.isPlaying = true;
}

export function SetVideoList(state, videoList) {
    state.originalVideoList = videoList;
}

export function AddVideo(state, video) {
    state.originalVideoList.push(video);
}

export function SetShuffledList(state, doShuffle = true) {
    state.isShuffled = doShuffle

    if (doShuffle) {
        state.shuffledList = [...state.originalVideoList];
        Shuffle(state.shuffledList);
    }
}

export function GoNextVid(state) {
    let currentVidID = state.videoId;
    let currentVidIndex = state.shuffledList.indexOf(state.shuffledList.find(v => v.contentDetails.videoId == currentVidID));
    let nextVid = state.shuffledList[currentVidIndex + 1];

    if (nextVid) {
        SetCurrentVideo(state, nextVid.contentDetails.videoId);
    }
}

export function GoPreviousVid(state) {
    let currentVidID = state.videoId;
    let currentVidIndex = state.shuffledList.indexOf(state.shuffledList.find(v => v.contentDetails.videoId == currentVidID));
    let nextVid = state.shuffledList[currentVidIndex - 1];

    if (nextVid) {
        SetCurrentVideo(state, nextVid.contentDetails.videoId);
    }
}

export function ToggleRepeatOptions(state) {
    //TODO
    let currentOpt = state.repeatOption;
}

export function TogglePlayState(state) {
    if (!state.isPlaying && !state.videoId && state.originalVideoList && state.originalVideoList.length) {
        state.videoId = state.shuffledList[0].contentDetails.videoId;
    }

    state.isPlaying = !state.isPlaying;
}