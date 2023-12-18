import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CloseModel({ category }: { category: string }) {
  const href =
    category === "models"
      ? "/main-board"
      : category === "new-faces"
      ? "/development"
      : "/";

  return (
    <div className="flex items-center justify-end lg:h-[100px]">
      <Link href={href} className="p-4 lg:hidden">
        <XMarkIcon className="h-5 w-5" />
      </Link>

      <Link href={href} className="brand-text mr-8 hidden lg:block">
        Close
      </Link>
    </div>
  );
}
