export function GetNextVideo (state) {

}

export function GetCurrentVideoIndex (state) {
    let currentVideo = GetCurrentVideo(state);

    return state.isShuffled ? state.shuffledList.indexOf(currentVideo) : state.originalVideoList.indexOf(currentVideo);
}

export function GetCurrentVideo (state) {
    let currId = state.videoId;

    return state.originalVideoList.find(vid => currId === vid.contentDetails.videoId);
}

export function GetCurrentVideoTitle (state) {
    let currVideo = GetCurrentVideo(state);

    return currVideo && currVideo.snippet && currVideo.snippet.title || '';
}

export function GetDeletedVideosCount (state) {
    return state.deletedVideos;
}