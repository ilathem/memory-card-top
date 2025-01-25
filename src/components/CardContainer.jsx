import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { getRandomInt } from '../utils';

const api_key = import.meta.env.VITE_GIPHY_API_KEY;
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=5&offset=0&rating=pg-13&bundle=messaging_non_clips`;
const searchTerm = 'cats';
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

export default function CardContainer() {
  const [gifs, setGifs] = useState();
  const [cardArray, setCardArray] = useState([]);
  const [score, setScore] = useState(0);
  const firstSelectedCardRef = useRef(null);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    setGifs(JSON.parse(localStorage.getItem('gifs')));
  }, []);

  useEffect(() => {
    if (gifs) populateCardArray();
  }, [gifs]);

  const fetchGifs = () => {
    console.log(`fetching new gifs for theme ${theme}...`);
    let url = searchUrl;
    if (theme) {
      url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${theme}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGifs(data.data);
        localStorage.setItem('gifs', JSON.stringify(data.data));
      });
  };

  const clearStorage = () => {
    localStorage.removeItem('gifs');
  };

  const populateCardArray = () => {
    let tempCardArray = [];
    for (let i = 0; i < gifs.length * 2; i++) {
      let gif, numInstances;
      while (true) {
        gif = gifs[getRandomInt(0, gifs.length - 1)];
        numInstances = 0;
        tempCardArray.forEach((card) => {
          if (card.gif.id === gif.id) numInstances++;
        });
        // console.log(`selected gif ${gif.id}`);
        // console.log(Object.assign({}, tempCardArray));
        // console.log(`number of instances is ${numInstances}`);
        if (numInstances > 1) continue;
        else break;
      }
      tempCardArray.push({
        clickable: true,
        matchFound: false,
        flipped: false,
        gif: gif,
      });
    }
    // console.log(tempCardArray);
    setCardArray(tempCardArray);
  };

  const selectCard = (cardArrayIndex) => {
    console.log(`selecting ${cardArrayIndex}`);
    console.log(
      `value stored in firstSelectedCardRef is ${firstSelectedCardRef.current}`
    );
    if (firstSelectedCardRef.current === null) {
      console.log(`setting first selected card to ${cardArrayIndex}`);
      firstSelectedCardRef.current = cardArrayIndex;
      setCardArray(
        cardArray.map((value, index) => {
          if (index === cardArrayIndex) {
            return {
              ...value,
              flipped: true,
              clickable: false,
            };
          } else {
            return {
              ...value,
            };
          }
        })
      );
    } else {
      console.log('comparing cards');
      const firstSelectedCard = firstSelectedCardRef.current;
      if (
        cardArray[firstSelectedCard].gif.id === cardArray[cardArrayIndex].gif.id
      ) {
        setCardArray(
          cardArray.map((value, index) => {
            if (index === firstSelectedCard || index === cardArrayIndex) {
              return {
                ...value,
                matchFound: true,
              };
            } else {
              return value;
            }
          })
        );
      } else {
        setCardArray(
          cardArray.map((value, index) => {
            if (index === cardArrayIndex) {
              return {
                ...value,
                flipped: true,
                clickable: false,
              };
            } else {
              return {
                ...value,
                clickable: false,
              };
            }
          })
        );
        // setCardArray(cardArray.map((card) => ({ ...card, clickable: false })));
        setTimeout(() => {
          setCardArray(
            cardArray.map((value, index) => {
              if (index === firstSelectedCard || index === cardArrayIndex) {
                return {
                  ...value,
                  clickable: true,
                  flipped: false,
                };
              } else {
                return {
                  ...value,
                  clickable: true,
                };
              }
            })
          );
        }, 700);
        setScore(score + 1);
      }
      firstSelectedCardRef.current = null;
    }
  };
  
  return (
    <div>
      <div className='w-full flex flex-row items-center justify-center mb-4'>
        <label htmlFor='theme' className='text-xl'>Select your theme:</label>
        <input value={theme} onChange={e => setTheme(e.target.value)} placeholder='cats' id='theme' className='text-white placeholder:text-gray-500 text-xl placeholder:text-xl ml-2 p-1'/>
        <button
          className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl mr-2 hover:bg-slate-800 focus:bg-slate-800 transition-all'
          onClick={() => fetchGifs()}
        >
          Get new gifs!
        </button>
        <button
          className='border-blue-700 text-blue-700 border-2 px-4 py-2 text-xl rounded-xl hover:bg-slate-800 focus:bg-slate-800 transition-all'
          onClick={() => clearStorage()}
        >
          Clear local storage
        </button>
      </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 justify-items-center'>
        {cardArray &&
          cardArray.map((card, index) => (
            <Card
              indexNumber={index}
              key={index}
              gif={card.gif}
              selectCard={() => selectCard(index)}
              flipped={card.flipped}
              matchFound={card.matchFound}
              clickable={card.clickable}
            />
          ))}
      </div>
    </div>
  );
}
