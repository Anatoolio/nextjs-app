"use client";

import { siteConfig } from "@/app/config/siteConfig";
import { usePathname } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

const PageContent = () => {
  const pathName = usePathname();
  const pageContent =
    siteConfig.pagesContent[pathName as keyof typeof siteConfig.pagesContent];

  if (!pageContent) {
    return (
      <div>
        <h1>Page Not Found</h1>
      </div>
    );
  }
  const cleanHTML = DOMPurify.sanitize(pageContent.description);

  return <div>{parse(cleanHTML)}</div>;
};

export default PageContent;
