import {
  Accessor,
  createEffect,
  createSignal,
  For,
  Show,
  Setter,
} from "solid-js";
import { Keypoint, Project } from "~/types/data";
import { deleteCollection, updateCollection } from "~/utils/data_utils";

interface ProjectEditorProps {
  project: Project;
  refreshSignal: {
    accessor: Accessor<boolean>;
    setter: Setter<boolean>;
  };
}

export default function ProjectEditor(props: ProjectEditorProps) {
  const [expanded, setExpanded] = createSignal<boolean>(true);
  let { project, refreshSignal } = props;
  function handleRefreshSignal() {
    refreshSignal.setter(true);
    setTimeout(() => {
      refreshSignal.setter(false);
    }, 10);
  }
  let { id, title } = project;

  let project_original = project;

  return (
    <div class="grid gap-4 py-4 px-6 rounded w-full border-r border-t border-b border-neutral-800">
      <div class="w-full flex justify-between py-3">
        <div class="w-[75%]">
          <label
            id={`${id}-title-label`}
            class="text-neutral-700 text-xs uppercase"
          >
            Collection Name
          </label>
          <input
            type="text"
            id={`${id}-title`}
            value={`${title}`}
            class="w-full text-2xl text-neutral-300 hover:text-neutral-50 focus:text-neutral-500 focus:outline-0"
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
              label!.style.color = "#737373";
            }}
            onFocusOut={(event) => {
              let label = document.getElementById(
                `${event.target.id}-label`
              ) as HTMLLabelElement;
              label!.style.color = "#404040";
            }}
            onFocus={(event) => {
              let target = event.target as HTMLInputElement;
              target.setSelectionRange(0, 100, "forward");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                (event.target as HTMLInputElement).blur();
              }
            }}
          />
        </div>
        <div class="w-[25% flex justify-end]">
          <span
            class="text-xs text-neutral-500 underline hover:text-neutral-300 cursor-pointer"
            onclick={() => {
              setExpanded(!expanded());
            }}
          >
            Collapse
          </span>
        </div>
      </div>
      <Show when={expanded()}>
        <For each={Object.keys(project) as Array<keyof Project>}>
          {(key) => {
            // refactor to TYPES of fields, i.e. TextField.
            switch (key) {
              case "id":
                break;
              case "title":
                break;
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
                  <div class="grid grid-cols-1 gap-2 w-full items-center">
                    <label
                      id={`${key}-${project.id}-label`}
                      class="text-neutral-700 text-xs uppercase"
                    >
                      {key}
                    </label>
                    <input
                      id={`${key}-${project.id}`}
                      class="px-4 py-2 text-neutral-500 hover:text-neutral-300 focus:text-neutral-700 rounded ring ring-neutral-700 hover:ring-neutral-500 focus:outline-0 focus:ring-neutral-500 bg-neutral-800 w-full"
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
                        label!.style.color = "#737373";
                      }}
                      onFocusOut={(event) => {
                        let label = document.getElementById(
                          `${event.target.id}-label`
                        ) as HTMLLabelElement;
                        label!.style.color = "#404040";
                      }}
                      onFocus={(event) => {
                        let target = event.target as HTMLInputElement;
                        let index = key === "accent_color" ? 1 : 0;
                        target.setSelectionRange(index, 100, "forward");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          (event.target as HTMLInputElement).blur();
                        }
                      }}
                    />
                  </div>
                );
            }
          }}
        </For>
      </Show>
      <div class="w-full justify-between py-4 flex gap-4">
        <button
          class="w-fit cursor-pointer bg-neutral-50 hover:bg-neutral-300 rounded text-green-950 px-4 py-2"
          onClick={() => {
            updateCollection(project);
            handleRefreshSignal();
          }}
        >
          Save
        </button>
        <button
          class="w-fit cursor-pointer bg-red-500 hover:bg-red-400 rounded text-white px-4 py-2"
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
