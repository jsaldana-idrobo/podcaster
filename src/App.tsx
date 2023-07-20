import { useEffect, useState } from 'react';
import './App.css';
import { Entry, Podcasts } from './types.d';

function App() {
  const [podcasts, setPodcasts] = useState<Entry[]>([]);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then(async res => await res.json())
      .then((res: Podcasts) => {
        setPodcasts(res.feed.entry)
      }
      ).catch(error => console.log(error)
      );
  }, [])

  return (
    <div className='App'>
      <h1>Prueba tecnica - Podcaster</h1>
      {JSON.stringify(podcasts)}
    </div>
  )
}

export default App
