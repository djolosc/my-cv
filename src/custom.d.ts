declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.avif";

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.pdf" {
  const src: string;
  export default src;
}
