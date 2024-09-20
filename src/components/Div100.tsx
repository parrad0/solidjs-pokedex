import { createSignal, onCleanup, onMount, ParentComponent } from 'solid-js';

const Div100vh: ParentComponent = (props) => {
  const [height, setHeight] = createSignal('100vh');

  const setRealHeight = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      setHeight(`${vh * 100}px`);
    }
  };

  onMount(() => {
    setRealHeight();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', setRealHeight);
    }
  });

  onCleanup(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', setRealHeight);
    }
  });

  return (
    <div style={{ height: height() }} {...props}>
      {props.children}
    </div>
  );
};

export default Div100vh;