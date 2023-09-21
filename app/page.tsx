"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      push("/models");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [push]);

  return (
    <div className="p-4 lg:p-8">
      <p className="text-xs font-light uppercase tracking-widest lg:text-sm">
        Home Page. Redirecting to Models Page in 5 seconds...
      </p>
    </div>
  );
}
