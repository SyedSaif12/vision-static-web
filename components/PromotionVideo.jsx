export default function PromotionVideo() {
  return (
    <>
      <div className="w-full flex justify-center rounded-2xl z-50 overflow-hidden items-center h-96">
        <iframe
          className="w-full h-full "
          //   width="560"
          //   height="315"
          src="https://www.youtube-nocookie.com/embed/adOkTjIIDnk?si=JarvQp6ZvyX5ZzeE"
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
