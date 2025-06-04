import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
const [isMobile, setIsMobile] = createSignal<boolean>();

export default function AdminNav() {
  const location = useLocation();
  const [prevScrollY, setPrevScrollY] = createSignal<number>(0);

  function scrollHandler() {
    let { scrollY } = window;
    if (scrollY > prevScrollY()) {
      setPrevScrollY(scrollY);
    } else {
      setPrevScrollY(scrollY);
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
    let navStyle = document.getElementById("nav");
    if (prevScrollY() === 0) {
      //navStyle!.style.borderColor = "#d4d4d4";
      //navStyle!.style.backgroundColor = "#131313";
    } else {
      //navStyle!.style.borderColor = "transparent";
      navStyle!.style.backgroundColor = "transparent";
    }
  });

  return (
    <>
      <nav id="nav" class="backdrop-blur-lg backdrop-brightness-75 z-1000 fixed w-full flex 2xl:py-6 transition-all duration-500 border-b border-transparent">
        <div class="flex w-full max-w-7xl mx-auto p-4 2xl:p-0 justify-between items-center">
          <div class="w-full flex justify-start">
            <A
              href="/"
              class="text-neutral-50 hover:text-amber-500 cursor-pointer uppercase tracking-widest"
            >
              Mike Angelo
            </A>
          </div>
          {/*<Show when={!isMobile()}>*/}
            <div class="w-full flex gap-4 justify-end items-center">
              <A href="./#footer">
                <button class="bg-neutral-50 hover:bg-neutral-300 px-4 py-2 cursor-pointer rounded text-neutral-950">
                  Settings
                </button>
              </A>
              <div class="flex gap-4">
                
              </div>
            </div>
          {/*</Show>*/}
        </div>
      </nav>
      <div class="h-[4.5rem] 2xl:h-[5.5rem]"></div>
    </>
  );
}
