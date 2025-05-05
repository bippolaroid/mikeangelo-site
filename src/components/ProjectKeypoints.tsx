import { For } from "solid-js";
import { ProjectKeypointProps, ProjectKeypoint } from "./ProjectKeypoint";

type Keypoints = {
  data: ProjectKeypointProps[];
};

export default function ProjectKeypoints({ data }: Keypoints) {
  return (
    <div class="bg-neutral-100 border-t border-neutral-300">
      <For each={data}>
        {(project) => {
          return <ProjectKeypoint keypoint={project} />;
        }}
      </For>
    </div>
  );
}
