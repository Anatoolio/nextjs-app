"use client";

import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
  const searchError =
    useSearchParams().get("message") || "Unauthorized access. Please log in.";
  return (
    <div className="flex items-center justify-center text-red-500">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-xl">{searchError}</p>
    </div>
  );
};

export default ErrorPage;
