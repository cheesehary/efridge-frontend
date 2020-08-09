declare module '*.scss' {
  const value: { [className: string]: string };
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}
