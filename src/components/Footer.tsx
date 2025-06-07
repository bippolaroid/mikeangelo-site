import { A } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";

export default function Footer() {
  const [isCopied, setIsCopied] = createSignal<boolean>(false);
  createEffect(() => {
    if (isCopied()) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  });

  function copiedMessage() {
    return <div class="w-full text-neutral-500">Copied to clipboard!</div>;
  }
  async function copyToClipboard(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      console.log("Copied!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <footer id="footer" class="w-full bg-neutral-950">
      <div class="max-w-7xl mx-auto flex gap-2 items-start justify-between px-4 2xl:px-0 py-12">
        <div class="grid gap-2">
          <div class="text-neutral-100 text-xl font-bold">
            Let's build something together!
          </div>
          <div class="flex w-full">
            <Show when={!isCopied()} fallback={copiedMessage()}>
              <div
                class="text-neutral-100 hover:text-neutral-500 cursor-pointer"
                onClick={() => copyToClipboard("m.angelo@177edgar.com")}
              >
                📧 <span class="underline">m.angelo@177edgar.com</span>
              </div>
            </Show>
          </div>
        </div>
        <div class="grid text-right">
          <A
            class="text-neutral-700 hover:text-neutral-500 hover:underline"
            href="https://www.behance.net/mikeangelotho"
          >
            Behance
          </A>
          <A
            class="text-neutral-700 hover:text-neutral-500 hover:underline"
            href="https://github.com/bippolaroid"
          >
            Github
          </A>
          <A
            class="text-neutral-700 hover:text-neutral-500 hover:underline"
            href="./dashboard"
          >
            Dashboard
          </A>
        </div>
      </div>
    </footer>
  );
}
