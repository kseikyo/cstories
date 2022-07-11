import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface VideoContextType {
  selections: string[];
}

const VideoContext = createContext<VideoContextType>({} as VideoContextType);

const useVideoContext = () => useContext(VideoContext);

const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [selections, setSelections] = useState<string[]>([""]);
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoType>();

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

  async function nextChunk(data: string) {
    // @FIXME: THIS ARCHITECTURE WILL ONLY WORK WITH ONE STORY
    // const key = data.toLowerCase();
    const videoElement = document.getElementById(
      "video",
    ) as unknown as HTMLVideoElement;
    // @TODO: MAKE API CALL TO DB TO GET VIDEO INFO
    // const selected = this.manifestJSON[key];
    const selected: SelectedVideoType = {
      url: "//vjs.zencdn.net/v/oceans.mp4",
      showOptionsAt: parseInt(`${videoElement.currentTime + 20}`, 10),
      options: ["Go Caving", "Collect Wood"],
      defaultOption: "Go Caving",
      videoDuration: 46.613333,
    };

    setSelectedVideo(selected);
    manageLag();
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
    <VideoContext.Provider value={{ selections }}>
      {children}
    </VideoContext.Provider>
  );
};

export { useVideoContext, VideoProvider };
