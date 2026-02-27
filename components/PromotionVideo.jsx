export default function PromotionVideo({
  url = "https://www.youtube.com/embed/54Ej0JdngZI?si=jrXQfgO0BSwGZcX8",
}) {
  return (
    <>
      <div className="w-full flex justify-center rounded-2xl z-50 overflow-hidden items-center h-96">
        <iframe
          className="w-full h-full "
          //   width="560"
          //   height="315"
          src={url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
