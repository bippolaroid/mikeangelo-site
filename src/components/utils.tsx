export function renderMedia(media: string) {
  if (media.includes("vimeo.com")) {
    return (
      <div class="w-full relative pt-[56.25%] flex justify-center">
        <iframe
          class="absolute left-0 top-0 w-full h-full object-contain"
          src={`${media}`}
          allow="fullscreen"
        ></iframe>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    );
  } else if (media.includes("mp4")) {
    return (
      <video
        controls
        src={`${media}`}
        class="mx-auto w-full object-cover h-full"
      ></video>
    );
  } else {
    return (
      <>
        <div class="w-full mx-auto rounded overflow-hidden shadow shadow-neutral-400 ring ring-neutral-300">
          <img src={`${media}`} class="mx-auto w-full h-full" />
        </div>
      </>
    );
  }
}
