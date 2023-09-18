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
    <main className="flex h-screen w-screen flex-col items-center justify-center text-xs uppercase tracking-widest">
      <p>Home Page</p>
      <p>Redirecting in 5 seconds...</p>
    </main>
  );
}
