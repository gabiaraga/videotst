import { Player } from './components/Player'


import styles from './App.module.css'

import './global.css'

import { useState } from 'react'
import videos from '../videos.json'
import { VideoCard } from './components/VideoCard'

export function App() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  function handleSelectedVideo(id: number) {
    const video = videos.find(v => v.id === id);

    if (!video) {
      alert("Video not found");
      return;
    }

    setSelectedVideo(video);
  }

  function handleTheaterMode() {
    setIsTheaterMode(!isTheaterMode);
  }

  function handleNextVideo() {
    const indexCurrentVideo = selectedVideo.id - 1;
    setSelectedVideo(videos[indexCurrentVideo + 1]);
  }

  function handlePreviousVideo() {
    const indexCurrentVideo = selectedVideo.id - 1;
    setSelectedVideo(videos[indexCurrentVideo - 1]);
  }

  const hasPreviousVideo = videos.findIndex(video => video.id === selectedVideo.id) !== 0;
  const hasNextVideo = videos.findIndex(video => video.id === selectedVideo.id) < videos.length - 1;

  const videosFiltered = videos.filter(videos => videos.title.includes(searchText))

  return (
    <div className={styles.container}>
      <main className={!isTheaterMode ? styles.wrapper : styles.wrapperTheaterMode}>
        <Player
          url={selectedVideo.url}
          handleTheaterMode={handleTheaterMode}
          handleNextVideo={handleNextVideo}
          handlePreviousVideo={handlePreviousVideo}
          hasNextVideo={hasNextVideo}
          hasPreviousVideo={hasPreviousVideo}
        />

        <div className={styles.containerList}>
          <input type="text" placeholder='Search video'  value={searchText} onChange={event => setSearchText(event.target.value)} />
          <aside className={styles.list}>
            {videosFiltered.map((video) => (
              <div key={video.id}>
                <VideoCard
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  isSelectedVideo={selectedVideo.id === video.id}
                  handleSelectedVideo={handleSelectedVideo}
                />
              </div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  )
}