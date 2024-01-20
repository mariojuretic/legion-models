import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="brand-text flex h-full w-full flex-col items-center justify-center gap-2 p-4 lg:gap-4 lg:p-8">
      <p>Page not found.</p>

      <Link
        href="/main-board"
        className="bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
      >
        Go to the Main Board
      </Link>
    </div>
  );
};

export default NotFound;
