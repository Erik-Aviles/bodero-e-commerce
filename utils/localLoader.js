// Docs: https://aws.amazon.com/developer/application-security-performance/articles/image-optimization
export default function localLoader({ src, width, quality }) {
  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/${src}`);
  url.searchParams.set("format", "auto");
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}
