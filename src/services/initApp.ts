function initializeCodec() {
  // this.videoElement = document.querySelector("#vid");
  const mediaSourceSupported = !!window.MediaSource;
  if (!mediaSourceSupported) {
    // eslint-disable-next-line no-alert
    alert(
      "Your browser or system doesn't support this type of media, please update!",
    );
  }
  // @TODO: UPDATE TO RUN THIS WHEN GETTING DATA FROM DB
  // const codecSupported = MediaSource.isTypeSupported(this.manifestJSON.codec);
  // if (!codecSupported) {
  //   alert(
  //     `Your browser doesn't support the codec : ${this.manifestJSON.codec}`,
  //   );
  // }

  // const mediaSource = new MediaSource();
  // this.videoElement.src = URL.createObjectURL(mediaSource);

  // mediaSource.addEventListener(
  //   "sourceopen",
  //   this.sourceOpenWrapper(mediaSource),
  // );
}

async function nextChunk(data: string) {
  // @FIXME: THIS ARCHITECTURE WILL ONLY WORK WITH ONE STORY
  // const key = data.toLowerCase();
  const videoElement = document.getElementById(
    "video",
  ) as unknown as HTMLVideoElement;
  // @TODO: MAKE API CALL TO DB TO GET VIDEO INFO
  // const selected = this.manifestJSON[key];
  const selected = {
    url: "//vjs.zencdn.net/v/oceans.mp4",
    showOptionsAt: parseInt(`${videoElement.currentTime + 20}`, 10),
    options: ["Go Caving", "Collect Wood"],
    defaultOption: "Go Caving",
    videoDuration: 46.613333,
  };
  // this.selected = {
  //   ...selected,
  //   // Adjusts time modal will show up, based on currentTime
  //   at: parseInt(this.videoElement.currentTime + selected.at),
  // };
  // this.manageLag(selected);
  // this.videoElement.play();
  // await this.fileDownload(selected.url);
}

const manageLag = () => {
    if (!!~this.selections.indexOf(selected.url)) {
      selected.at += 4;
      return;
    }

    this.selections.push(selected.url);
}

export const initApp = () => {
  if (!window) return;
  initializeCodec();
  window.nextChunk = nextChunk;
};
