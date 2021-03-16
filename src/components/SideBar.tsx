import { useEffect, useState } from 'react';
import { Button } from '../components/Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar({selectedGenreId, setSelectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenreId(genre.id);
  }

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={genre.id}
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

    </nav>
  )
}