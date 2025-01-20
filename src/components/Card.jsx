import { useEffect } from 'react';

export default function Card({
  indexNumber,
  gif,
  flipped,
  matchFound,
  selectCard,
}) {
  const src = gif.images.fixed_width.url;
  const alt = gif.title;

  useEffect(() => {
    console.log(`card ${indexNumber} is ${!flipped && 'not'} flipped`);
  }, [flipped]);

  useEffect(() => {
    console.log(`match found for ${indexNumber}`);
  }, [matchFound]);

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
    <div onClick={() => !flipped && selectCard()}>
      {flipped ? (
        <div className='rounded-xl w-[200px] h-[200px] bg-transparent'>
          <img
            src={src}
            alt={alt}
            className='rounded-xl w-[200px] h-[200px] object-cover object-center'
          />{' '}
        </div>
      ) : (
        <div className='opacity-25 rounded-xl w-[200px] h-[200px] bg-emerald-900'>
          <img
            src={src}
            alt={alt}
            className='rounded-xl w-[200px] h-[200px] object-cover object-center'
          />{' '}
        </div>
      )}
    </div>
  );
}
