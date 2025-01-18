import { useState, useEffect } from 'react';

const api_key = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=10&offset=0&rating=pg-13&bundle=messaging_non_clips`;

export default function CardContainer() {
  const [ gifs, setGifs ] = useState();
  
  const fetchGifs = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => setGifs(data.data));
  }
  
  console.log(gifs);

  return (
    <div>
      <button className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl' onClick={() => fetchGifs()}>Get gifs!</button>
    </div>
  );
}
