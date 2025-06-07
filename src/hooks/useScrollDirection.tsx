import { createSignal, onCleanup, onMount } from "solid-js";

export enum ScrollDirection {
  UP,
  DOWN,
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = createSignal<ScrollDirection>(
    ScrollDirection.DOWN
  );
  const [scrollPos, setScrollPos] = createSignal<number>(0);

  let scrollY: number = 0;

  function userScroll() {
    if (window.scrollY > scrollPos()) {
      setScrollDirection(ScrollDirection.DOWN);
      setScrollPos(window.scrollY);
    } else {
      setScrollDirection(ScrollDirection.UP);
      setScrollPos(window.scrollY);
    }
  }

  onMount(() => {
    scrollY = window.scrollY;
    document.addEventListener("scroll", userScroll);
    onCleanup(() => {
      document.removeEventListener("scroll", userScroll);
    });
  });

  return { scrollDirection, scrollPos };
}
