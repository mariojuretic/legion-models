"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      push("/models");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [push]);

  return children;
}
