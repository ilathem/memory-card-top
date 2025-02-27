import { useEffect, useRef } from 'react';
import brain from '../reshot-icon-brain-Q5WBF2N9ER.svg';

export default function Card({
  indexNumber,
  gif,
  flipped,
  matchFound,
  selectCard,
  clickable,
}) {
  const src = gif.images.fixed_width.url;
  const alt = gif.title;
  const onMount = useRef(true);
  const strictModeRunTwice = useRef(true);

  useEffect(() => {
    if (onMount.current) {
      onMount.current = false;
      return;
    }
    if (strictModeRunTwice.current) {
      strictModeRunTwice.current = false;
      return;
    }
    // console.log(`card ${indexNumber} is ${flipped ? '' : 'not '}flipped`);
    // console.log(`match ${matchFound ? '' : 'not '}found for ${indexNumber}`);
  }, [flipped, matchFound]);

  if (matchFound)
    return (
      <div>
        <img
          src={src}
          alt={alt}
          className='border-green-500 border-solid border-2 rounded-xl w-[200px] h-[200px] object-cover object-center'
        />
      </div>
    );

  return (
    <a
      onClick={() =>
        !flipped && clickable
          ? selectCard()
          : console.log(`flipped is ${flipped} and clickable is ${clickable}`)
      }
      onKeyDown={(e) => {
        if (e.code == 'Space' || e.code == 'Enter') {
          if (!flipped && clickable) {
            selectCard();
          } else {
            console.log(`flipped is ${flipped} and clickable is ${clickable}`);
          }
        }
      }}
      tabIndex={'0'}
      className='rounded-xl w-[200px] h-[200px] bg-emerald-700 grid place-content-center cursor-pointer'
    >
      {flipped && (
        <img
          src={src}
          alt={alt}
          className='rounded-xl w-[200px] h-[200px] object-cover object-center'
        />
      )}
      {''}
    </a>
  );
}
