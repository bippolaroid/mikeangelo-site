import { For } from "solid-js";
import { Keypoint, Project } from "~/types/data";
import { deleteCollection, createCollection, updateCollection } from "~/utils/data_utils";

interface ProjectEditorProps {
  project: Project;
}

export default function ProjectEditor(props: ProjectEditorProps) {
  let { project } = props;
  let { id, title } = project;

  let project_original = project;

  return (
    <div class="grid gap-3 border border-neutral-200 py-3 px-5 rounded mt-3 w-full">
      <div class="w-full grid py-3">
        <label
          id={`${id}-title-label`}
          class="text-neutral-300 text-xs uppercase"
        >
          Title
        </label>
        <input
          type="text"
          id={`${id}-title`}
          value={`${title}`}
          class="w-full text-2xl text-neutral-700 hover:text-neutral-500 focus:text-neutral-500 focus:outline-0"
          onChange={(event) => {
            const { value } = event.target as HTMLInputElement;
            project.title = value as string;
          }}
          onMouseOver={(event) => {
            let field = event.target;
            if (document.activeElement !== field) {
              let label = document.getElementById(
                `${event.target.id}-label`
              ) as HTMLLabelElement;
            }
          }}
          onMouseOut={(event) => {
            let field = event.target;
            if (document.activeElement !== field) {
              let label = document.getElementById(
                `${event.target.id}-label`
              ) as HTMLLabelElement;
            }
          }}
          onFocusIn={(event) => {
            let label = document.getElementById(
              `${event.target.id}-label`
            ) as HTMLLabelElement;
            label!.style.color = "#404040";
          }}
          onFocusOut={(event) => {
            let label = document.getElementById(
              `${event.target.id}-label`
            ) as HTMLLabelElement;
            label!.style.color = "#d4d4d4";
          }}
          onFocus={(event) => {
            let target = event.target as HTMLInputElement;
            target.setSelectionRange(0, 100, "forward");
          }}
        />
      </div>
      <For each={Object.keys(project) as Array<keyof Project>}>
        {(key) => {
          switch (key) {
            case "id":
              let id = project[key];
              return (
                <div>
                  <label
                    id={`${key}-${project.id}-label`}
                    class="text-neutral-300 text-xs uppercase"
                  >
                    UUID
                  </label>
                  <p>{id}</p>
                </div>
              );
            case "tags":
              break;
            case "text_fields":
              break;
            case "keypoints":
              let keypoints: Keypoint[] = project[key];
              return (
                <div>
                  <label
                    id={`${key}-${project.id}-label`}
                    class="text-neutral-300 text-xs uppercase"
                  >
                    Portfolio Key Point
                  </label>
                  <For each={keypoints}>
                    {(point) => {
                      return <p>{point.title}</p>;
                    }}
                  </For>
                </div>
              );
            default:
              let value = project[key] as string;

              return (
                <div class="grid grid-cols-1 gap-1 w-full items-center">
                  <label
                    id={`${key}-${project.id}-label`}
                    class="text-neutral-300 text-xs uppercase"
                  >
                    {key}
                  </label>
                  <input
                    id={`${key}-${project.id}`}
                    class="px-3 py-1 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 rounded ring ring-neutral-200 hover:ring-neutral-300 focus:outline-0 focus:ring-neutral-500 bg-white w-full"
                    type="text"
                    value={value}
                    onChange={(event) => {
                      const { value } = event.target as HTMLInputElement;
                      project[key] = value as string;
                    }}
                    onFocusIn={(event) => {
                      let label = document.getElementById(
                        `${event.target.id}-label`
                      ) as HTMLLabelElement;
                      label!.style.color = "#404040";
                    }}
                    onFocusOut={(event) => {
                      let label = document.getElementById(
                        `${event.target.id}-label`
                      ) as HTMLLabelElement;
                      label!.style.color = "#d4d4d4";
                    }}
                    onFocus={(event) => {
                      let target = event.target as HTMLInputElement;
                      target.setSelectionRange(0, 100, "forward");
                    }}
                  />
                </div>
              );
          }
        }}
      </For>
      <div class="w-full justify-between py-3 flex gap-3">
        <button
          class="w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-700 rounded text-white px-3 py-1"
          onClick={() => {
            updateCollection(project);
          }}
        >
          Save
        </button>
        <button
          class="w-fit cursor-pointer bg-red-500 hover:bg-red-400 rounded text-white px-3 py-1"
          onClick={() => {
            deleteCollection(project);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
