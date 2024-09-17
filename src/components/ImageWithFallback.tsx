import { createSignal, createEffect } from "solid-js";

const ImageWithFallback = (props: any) => {
  const [imgSrc, setImgSrc] = createSignal(props.src);

  createEffect(() => {
    setImgSrc(props.src);
  });

  const handleError = (e: any) => {
    setImgSrc(props.fallbackSrc);
  };

  return (
    <img src={imgSrc()} alt={props.alt} onError={handleError} class={props.class} />
  );
};

export default ImageWithFallback;
