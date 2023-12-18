"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DELAY_SECONDS = 2;

export default function Redirect({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      push("/main-board");
    }, DELAY_SECONDS * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [push]);

  return children;
}
