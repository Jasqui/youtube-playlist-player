export function GetNextVideo (state) {

}

export function GetCurrentVideo (state) {
    let currId = state.videoId;

    return state.originalVideoList.find(vid => currId === vid.contentDetails.videoId);
}

export function GetCurrentVideoTitle (state) {
    let currVideo = GetCurrentVideo(state);

    return currVideo && currVideo.snippet && currVideo.snippet.title || '';
}