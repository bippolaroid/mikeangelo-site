type Keypoint = {
  keypoint: ProjectKeypointProps;
}

export interface ProjectKeypointProps {
  id: number;
  featured: string;
  title: string;
  summary: string;
}
export function ProjectKeypoint({keypoint}: Keypoint) {
  return (
    <div class="max-w-7xl mx-auto px-3 pb-3">
      <h2 class="text-3xl py-12 text-neutral-500">{keypoint.title}</h2>
      <div class="grid gap-3 lg:gap-0 lg:flex lg:ring lg:ring-neutral-300 rounded">
        <div class="h-[10vh] lg:max-w-xl w-full min-h-[288px]">
          <img
            src={`${keypoint.featured}`}
            class="mx-auto w-full object-cover h-full"
          />
        </div>
        <div>
          <p class="lg:p-3">{keypoint.summary}</p>
        </div>
      </div>
    </div>
  );
}
