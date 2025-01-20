import { useState, useEffect } from 'react';
import Card from './Card';

const api_key = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=10&offset=0&rating=pg-13&bundle=messaging_non_clips`;
const searchTerm = 'cats';
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

export default function CardContainer() {
  const [gifs, setGifs] = useState();

  const fetchGifs = () => {
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
        setGifs(data.data);
        localStorage.setItem('gifs', JSON.stringify(data.data));
      });
  };

  useEffect(() => {
    console.log('loading gifs from localStorage...');
    setGifs(JSON.parse(localStorage.getItem('gifs')));
  }, []);

  return (
    <div>
      <button
        className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl'
        onClick={() => fetchGifs()}
      >
        Get new gifs!
      </button>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center'>
        {gifs && gifs.map((gif) => <Card key={gif.id} gif={gif} />)}
      </div>
    </div>
  );
}
