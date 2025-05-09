import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
const [isMobile, setIsMobile] = createSignal<boolean>();

export default function Nav() {
  const location = useLocation();
  const [prevScrollY, setPrevScrollY] = createSignal<number>(0);
  const [scrollingDown, setScrollingDown] = createSignal<boolean>(false);

  function scrollHandler() {
    let { scrollY } = window;
    if (scrollY > prevScrollY()) {
      setPrevScrollY(scrollY);
      setScrollingDown(true);
    } else {
      setPrevScrollY(scrollY);
      setScrollingDown(false);
    }
  }

  function checkWindowWidth() {
    let { innerWidth } = window;
    return innerWidth > 430 ? false : true;
  }
  onMount(() => {
    setIsMobile(checkWindowWidth());

    document.addEventListener("resize", checkWindowWidth);
    document.addEventListener("scroll", scrollHandler);
    onCleanup(() => {
      document.removeEventListener("resize", scrollHandler);
      document.removeEventListener("scroll", checkWindowWidth);
    });
  });

  createEffect(() => {
    if (prevScrollY() > 0) {
      document.getElementById("nav")!.classList =
        "z-100 fixed w-full flex p-3 lg:py-12 bg-neutral-50 transition-all duration-1000 border-b border-neutral-300";
    } else {
      document.getElementById("nav")!.classList =
        "z-100 fixed w-full flex p-3 lg:py-12 bg-transparent transition-all duration-1000 border-b border-transparent";
    }
  });

  return (
    <>
      <nav id="nav" class="">
        <div class="flex w-full max-w-7xl mx-auto justify-between items-center">
          <div class="w-full flex justify-start">
            <A
              href="./"
              class="text-neutral-950 hover:text-neutral-300 cursor-pointer uppercase tracking-widest"
            >
              Mike Angelo
            </A>
          </div>
          <Show when={!isMobile()}>
            <div class="w-full flex gap-3 justify-end items-center">
              <A href="./#footer">
                <button class="bg-neutral-950 hover:bg-neutral-300 px-3 py-1 cursor-pointer rounded text-neutral-50">
                  Contact
                </button>
              </A>
              <div class="flex gap-3">
                <A
                  class="text-neutral-300 hover:text-neutral-500 hover:underline"
                  href="https://github.com/bippolaroid"
                >
                  Github
                </A>
                <A
                  class="text-neutral-300 hover:text-neutral-500 hover:underline"
                  href="https://www.behance.net/mikeangelotho"
                >
                  Behance
                </A>
              </div>
            </div>
          </Show>
        </div>
      </nav>
      <div class="h-[5vh] md:h-[5vh] lg:h-[8vh] xl:h-[11vh]"></div>
    </>
  );
}
