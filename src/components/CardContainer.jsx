import { useState, useEffect } from 'react';
import Card from './Card';
import { getRandomInt } from '../utils';

const api_key = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5&offset=0&rating=pg-13&bundle=messaging_non_clips`;
const searchTerm = 'cats';
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

export default function CardContainer() {
  const [gifs, setGifs] = useState();
  const [cardArray, setCardArray] = useState([]);

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

  useEffect(() => {
    if (gifs) populateCardArray();
  }, [gifs]);

  const clearStorage = () => {
    localStorage.removeItem('gifs');
  };

  const populateCardArray = () => {
    let tempCardArray = [];
    for (let i = 0; i < gifs.length * 2; i++) {
      let gif, numInstances;
      while (true) {
        gif = gifs[getRandomInt(0, gifs.length - 1)];
        console.log(`selected ${gif.title}`);
        numInstances = 0;
        tempCardArray.forEach((card) => {
          console.log(`comparing ${card.title} to ${gif.title}`);
          if (card && card.id === gif.id) numInstances++;
        });
        if (numInstances > 1) continue;
        else break;
      }
      console.log(`adding ${gif.title} to card array`);
      tempCardArray.push(gif);
      console.log(tempCardArray);
    }
    setCardArray(tempCardArray);
  };

  console.log('gifs:');
  console.log(gifs);

  console.log('cards:');
  console.log(cardArray);

  return (
    <div>
      <button
        className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl'
        onClick={() => fetchGifs()}
      >
        Get new gifs!
      </button>
      <button
        className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl'
        onClick={() => clearStorage()}
      >
        Clear local storage
      </button>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center'>
        {cardArray && cardArray.map((gif, index) => <Card key={index} gif={gif} />)}
      </div>
    </div>
  );
}
