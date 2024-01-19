"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect({
  children,
  redirectTimeout,
}: {
  children: React.ReactNode;
  redirectTimeout: number;
}) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/main-board");
    }, redirectTimeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, redirectTimeout]);

  return children;
}
