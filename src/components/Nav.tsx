import { A } from "@solidjs/router";
import { createEffect } from "solid-js";
import { useScrollDirection } from "~/hooks/useScrollDirection";

export default function Nav() {
  const { scrollDirection, scrollPos } = useScrollDirection();

  createEffect(() => {
    const navStyle = (document.getElementById("nav") as HTMLDivElement).style;
    if (scrollDirection() === 1) {
      if (scrollPos() > 0) {
        navStyle.backdropFilter = "brightness(0.15) blur(16px)";
        navStyle.boxShadow = "0px 6px 72px 0px";
      }
    } else {
      if (scrollPos() < 72) {
        navStyle.backdropFilter = "brightness(1)";
        navStyle.boxShadow = "0px 0px 0px 0px";
      }
    }
  });

  return (
    <>
      <nav
        id="nav"
        class="z-1000 fixed w-full flex 2xl:py-6 transition-all duration-500 border-b border-neutral-950"
      >
        <div class="flex w-full max-w-7xl mx-auto p-4 2xl:p-0 justify-between items-center">
          <div class="w-full flex justify-start">
            <A
              href="/"
              class="text-neutral-50 hover:text-neutral-700 duration-1000 transition-all ease-out cursor-pointer uppercase tracking-widest"
            >
              Mike Angelo
            </A>
          </div>
          <div class="w-full flex gap-4 justify-end items-center">
            <A href="./#footer">
              <button class="bg-neutral-50 hover:bg-neutral-300 px-4 py-2 cursor-pointer rounded text-neutral-950">
                Contact
              </button>
            </A>
            <div class="flex gap-4"></div>
          </div>
        </div>
      </nav>
      <div class="h-[4.5rem] 2xl:h-[5.5rem]"></div>
    </>
  );
}
