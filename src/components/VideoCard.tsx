import { ArrowLeft } from 'phosphor-react';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  id: number;
  title: string;
  thumbnail: string;
  isSelectedVideo: boolean;
  handleSelectedVideo: (id: number) => void;
}

export function VideoCard({ id, title, thumbnail, isSelectedVideo, handleSelectedVideo }: VideoCardProps) {
  return (
    <div className={isSelectedVideo ? styles.videoSelected : ''}>
      {isSelectedVideo && <ArrowLeft size={20} />}
      <button onClick={() => handleSelectedVideo(id)} className={styles.container}>
        <img src={thumbnail} className={styles.thumbnail} />
        <h3>{title}</h3>
      </button>
    </div>
  )
}