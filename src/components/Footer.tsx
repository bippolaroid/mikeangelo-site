import { createEffect, createSignal, Show } from "solid-js";

export default function Footer() {
  const [isCopied, setIsCopied] = createSignal<boolean>(false);
  createEffect(() => {
    if (isCopied()) {
      setTimeout(() => setIsCopied(false), 3000);
    }
  });

  function copiedMessage() {
    return (
      <div class="text-center w-full ring ring-neutral-500 text-neutral-500 rounded-full px-4 py-2">Copied to clipboard!</div>
    );
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
    <footer
      id="footer"
      class="w-full bg-neutral-950"
    >
      <div class="max-w-7xl mx-auto flex gap-3 items-center justify-between px-3 2xl:px-0 py-24">
      <div></div>
      <div class="text-right grid gap-3">
        <div class="text-neutral-300 text-5xl">Let's build something cool!</div>
        <div class="flex justify-end w-full">
          <Show when={!isCopied()} fallback={copiedMessage()}>
            <div
              class="text-neutral-300 text-3xl font-bold hover:text-neutral-500 cursor-pointer"
              onClick={() => copyToClipboard("m.angelo@177edgar.com")}
            >
              📧 <span class="underline">m.angelo@177edgar.com</span>
            </div>
          </Show>
        </div>
      </div>
      </div>
    </footer>
  );
}
