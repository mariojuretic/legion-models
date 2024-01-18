import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ExitPortfolio = ({ category }: { category: string }) => {
  const href =
    category === "models"
      ? "/main-board"
      : category === "new-faces"
      ? "/development"
      : "/";

  return (
    <div className="flex items-center justify-end lg:fixed lg:top-0 lg:h-[100px] lg:w-full lg:p-8">
      <Link href={href} className="p-4 lg:hidden">
        <XMarkIcon className="h-5 w-5" />
      </Link>

      <Link href={href} className="brand-text hidden lg:block">
        Close
      </Link>
    </div>
  );
};

export default ExitPortfolio;
