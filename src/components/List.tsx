
import videos from '../../videos.json';
import { VideoCard } from './VideoCard';

import styles from './List.module.css';

export function List() {
  return (
    <aside className={styles.container}>
      {videos.map((video) => (
        <div key={video.id}>
          <VideoCard
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            isSelectedVideo={false} 
            handleSelectedVideo={() => {}} 
          />
        </div>
      ))}
    </aside>
  );
}
