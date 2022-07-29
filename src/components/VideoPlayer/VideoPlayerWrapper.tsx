import { useState, useCallback, SetStateAction, useEffect, FC } from "react";

import videojs from "video.js";

import { VideoPlayerComponent } from "./VideoPlayerComponent";

export type SelectedVideoType = {
  url: string;
  showOptionsAt: number;
  options: string[];
  defaultOption: string;
  videoDuration: number;
};

interface IVideoPlayerWrapperProps {
  options: videojs.PlayerOptions;
  currentVideoSrc?: string;
}

export const VideoPlayerWrapper: FC<IVideoPlayerWrapperProps> = ({
  options,
  currentVideoSrc = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const [selections, setSelections] = useState<string[]>([""]);
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoType>();
  const [modal, setModal] = useState<videojs.ModalDialog>();

  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el: SetStateAction<null>) => {
    setVideoEl(el);
  }, []);

  const manageLag = () => {
    if (!selectedVideo) return;
    if (selections.indexOf(selectedVideo.url)) {
      setSelectedVideo({
        ...selectedVideo,
        showOptionsAt: selectedVideo.showOptionsAt + 4,
      });
      return;
    }
    setSelections((oldSelections) => [...oldSelections, selectedVideo.url]);
  };

  async function nextChunk(_data: string) {
    // const key = data.toLowerCase();
    const videoElement = videoEl as unknown as HTMLVideoElement;
    // @TODO: MAKE API CALL TO DB TO GET VIDEO INFO
    // const selected = this.manifestJSON[key];
    const selected: SelectedVideoType = {
      url: currentVideoSrc,
      showOptionsAt: parseInt(`${videoElement.currentTime + 20}`, 10),
      options: ["Go Caving", "Collect Wood"],
      defaultOption: "Go Caving",
      videoDuration: 46.613333,
    };

    setSelectedVideo(selected);
    manageLag();
    videoElement.play();
    // this.videoElement.play();
    // await this.fileDownload(selected.url);
  }

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") window.nextChunk = nextChunk;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <VideoPlayerComponent
        options={options}
        videoEl={videoEl}
        // @ts-ignore
        ref={onVideo}
        // @ts-ignore
        modal={modal}
        setModal={setModal}
      />
    </>
  );
};
