import { FrameCorners, Pause, Play, Rectangle, SkipBack, SkipForward, SpeakerHigh, SpeakerSlash } from 'phosphor-react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import styles from './Player.module.css';

interface PlayerProps {
  url: string;
  handleTheaterMode: () => void;
  handleNextVideo: () => void;
  handlePreviousVideo: () => void;
  hasNextVideo: boolean;
  hasPreviousVideo: boolean;
}

export function Player({ url, handleTheaterMode, handleNextVideo, handlePreviousVideo, hasNextVideo, hasPreviousVideo }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>() as MutableRefObject<HTMLVideoElement>;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  function handlePlayPause() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(oldState => !oldState);
  }

  function handleTimeUpdate() {
    if (!isSeeking) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  function handleLoadedMetadata() {
    setDuration(videoRef.current.duration);
  }

  function handleMuteUnmute() {
    videoRef.current.muted = !isMutating;
    setIsMutating(oldState => !oldState);
  }

  function handleFullScreen() {
    videoRef.current.requestFullscreen();
  }

  function handleTimelineClick(event: React.MouseEvent<HTMLDivElement>) {
    const timelineWidth = event.currentTarget.clientWidth;
    const clickPosition = event.nativeEvent.offsetX;
    const clickedTime = (clickPosition / timelineWidth) * duration;
    videoRef.current.currentTime = clickedTime;
    setCurrentTime(clickedTime);
  }

  useEffect(() => {
    const videoRefEvent = videoRef.current;
    videoRefEvent.addEventListener('timeupdate', handleTimeUpdate);
    videoRefEvent.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      videoRefEvent.removeEventListener('timeupdate', handleTimeUpdate);
      videoRefEvent.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const minutesFormatted = minutes.toString().padStart(2, '0');
    const secondsFormatted = seconds.toString().padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className={styles.player}>
      <video ref={videoRef} src={url} onClick={handlePlayPause} className={styles.videoPlayer}></video>

      <div className={styles.controls}>
        <div>
          {!isPlaying ? (
            <button onClick={handlePlayPause}>
              <Play size={20} />
            </button>
          ) : (
            <button onClick={handlePlayPause}>
              <Pause size={20} />
            </button>
          )}

          <button onClick={handlePreviousVideo} disabled={!hasPreviousVideo}>
            <SkipBack size={20} />
          </button>

          <button onClick={handleNextVideo} disabled={!hasNextVideo}>
            <SkipForward size={20} />
          </button>

          {!isMutating ? (
            <button onClick={handleMuteUnmute}>
              <SpeakerHigh size={20} />
            </button>
          ) : (
            <button onClick={handleMuteUnmute}>
              <SpeakerSlash size={20} />
            </button>
          )}
        </div>

        <div className={styles.timeline} onClick={handleTimelineClick} onMouseDown={() => setIsSeeking(true)} onMouseUp={() => setIsSeeking(false)}>
          <div className={styles.progress} style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <span>{formatTime(currentTime)}</span>

        <div>
          <button onClick={handleTheaterMode}>
            <Rectangle size={20} />
          </button>

          <button onClick={handleFullScreen}>
            <FrameCorners size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
