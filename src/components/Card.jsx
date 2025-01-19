export default function Card({gif}) {
  const src = gif.images.fixed_width.url;
  const alt = gif.title;
  return (
    <div>
      <img src={src} alt={alt} className="rounded-xl w-[200px] h-[200px] object-cover object-center"/>
    </div>
  )
}