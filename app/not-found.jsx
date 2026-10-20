"use client";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <div className="min-h-[60vh] flex flex-col items-center relative justify-center">
        {/* <div className="absolute -mt-5"> */}
        {/* </div> */}
        <h1 className="text-7xl lg:text-9xl text-muted font-bold">404</h1>
        <p className="text-faint text-base lg:text-2xl mt-2 mb-3">Page not found</p>
        <Link
          href={`/`}
          className={`mt-2 sm:mt-3 max-w-40 w-full text-white text-center text-base font-medium p-1 sm:p-2 rounded-md transition-colors bg-primary`}
        >
          Back to home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
