import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

function setMeta(id: string, content: string, attr: string) {
  let el = document.querySelector(`meta[${attr}="${id}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, id);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function useSEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("AMVerge") ? title : `${title} | AMVerge`;
    document.title = fullTitle;

    setMeta("og:title", fullTitle, "property");
    setMeta("twitter:title", fullTitle, "name");

    if (description) {
      const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (descEl) {
        descEl.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description, "name");
    }

    if (image) {
      setMeta("og:image", image, "property");
      setMeta("twitter:image", image, "name");
    }

    if (url) {
      setMeta("og:url", url, "property");
    }

    const twCard = document.querySelector('meta[name="twitter:card"]');
    if (!twCard) {
      const meta = document.createElement("meta");
      meta.name = "twitter:card";
      meta.content = "summary_large_image";
      document.head.appendChild(meta);
    }
  }, [title, description, image, url]);
}
