import {
  useEffect,
  useState,
  forwardRef,
  SetStateAction,
  Dispatch,
} from "react";

import videojs, { VideoJsPlayer } from "video.js";
// @ts-ignore
// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
  modal: videojs.ModalDialog;
  setModal: Dispatch<SetStateAction<videojs.ModalDialog | undefined>>;
  videoEl: any;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

export const VideoPlayerComponent = forwardRef<
  (el: SetStateAction<null>) => void,
  IVideoPlayerProps
>(({ options, videoEl, modal, setModal }, onVideo) => {
  const [videoPlayer, setVideoPlayer] = useState<VideoJsPlayer>();

  const getModalTemplate = (modalOptions: [string, string]) => {
    return () => {
      const [option1, option2] = modalOptions;
      const htmlTemplate = `
            <div class="absolute flex top-0 bottom-0 left-0 right-0 items-center justify-center flex-col text-white text-center">
                <div class="flex flex-row mb-2 w-full items-center gap-20 justify-center">
                    <button class="max-h-[52px] w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white !bg-orange-500 shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto" onclick="window.nextChunk('${option1}')">
                        ${option1}
                    </button>
                    <button class="max-h-[52px] w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white !bg-orange-500 shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto" onclick="window.nextChunk('${option2}')">
                        ${option2}
                    </button>
                </div>
            </div>
        `;
      if (modal) {
        // eslint-disable-next-line no-param-reassign
        modal.contentEl().innerHTML = htmlTemplate;
      }
    };
  };

  const openModal = (modalOptions: [string, string]) => {
    if (modal) {
      modal.on("modalopen", getModalTemplate(modalOptions));
      modal.open();
    }
  };

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(videoEl, { ...initialOptions, ...options });
    if (player) {
      setVideoPlayer(player);
      const ModalDialog = videojs.getComponent("ModalDialog");
      const videoModal = new ModalDialog(player, {
        temporary: false,
        uncloseable: true,
      });

      player.addChild(videoModal);

      player.on("play", () => videoModal.close());
      setModal(videoModal);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      if (player) {
        player.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoEl]);

  useEffect(() => {
    // setup modal listener on timeupdate
    if (videoPlayer) {
      videoPlayer.ready(() => {
        videoPlayer.on("timeupdate", () => {
          if (Math.round(videoPlayer.currentTime()) === 4) {
            openModal(["Option 1", "Option 2"]);
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoPlayer]);
  // if (player.current) {
  //   console.log("initializing modal");
  //   const ModalDialog = videojs.getComponent("ModalDialog");
  //   const videoModal = new ModalDialog(player.current, {
  //     temporary: false,
  //     uncloseable: false,
  //   });

  //   player.current.addChild(videoModal);

  //   player.current.on("play", () => videoModal.close());
  //   setModal(videoModal);
  // }

  // useEffect(() => {
  //   console.log(player.current && !modal, player.current, modal);
  //   if (player.current && !modal) {
  //     console.log("initializing modal");
  //     const ModalDialog = videojs.getComponent("ModalDialog");
  //     const videoModal = new ModalDialog(player.current, {
  //       temporary: false,
  //       uncloseable: false,
  //     });

  //     player.current.addChild(videoModal);

  //     player.current.on("play", () => videoModal.close());
  //     setModal(videoModal);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [player.current]);

  // console.log(videoEl);
  // TEST OPENING MODAL

  // useEffect(() => {
  //   waitForQuestions() {
  //     /**
  //      * Calculates current time of video to show questions when defined to
  //      * Options will show when time of selected.at is equal to currentTime
  //      * Also, if modal has been shown once, it will just return
  //      */
  //     const currentTime = parseInt(videoEl.currentTime);
  //     const option = this.selected.at === currentTime;
  //     if (!option) return;
  //     if (this.activeItem.url === this.selected.url) return;
  //     this.videoComponent.configureModal(this.selected.options);
  //     this.activeItem = this.selected;
  //   }
  // }, [videoEl.currentTime])

  // @ts-ignore
  return (
    <video
      // @ts-ignore
      ref={onVideo}
      id="video"
      className="video-js bg-cover !min-h-full !min-w-full aspect-video"
    />
  );
});

VideoPlayerComponent.displayName = "VideoPlayer";
