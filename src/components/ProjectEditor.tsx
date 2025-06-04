import { A } from "@solidjs/router";
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
    <div class="grid gap-4 py-4 px-4 rounded-xl w-full border border-neutral-700">
      <div class="w-full flex items-start py-4 border-b border-neutral-700">
        <div class="w-full grid items-start">
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
        <div class="w-fit flex justify-end items-start">
          <div
            
            onclick={() => {
              setExpanded(!expanded());
            }}
          >
            <label class="text-xs text-neutral-500 underline hover:text-neutral-300 cursor-pointer">{expanded() ? "Collapse" : "Expand"}</label>
          </div>
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
              case "last_modified":
                break;
              // wysiwyg?
              case "summary":
                return (
                  <div class="grid grid-cols-1 gap-2 w-full items-center">
                    <label
                      id={`${key}-${project.id}-label`}
                      class="text-neutral-700 text-xs uppercase"
                    >
                      {key}
                    </label>
                    <textarea
                      id={`${key}-${project.id}`}
                      class="min-h-48 px-4 py-2 text-neutral-500 hover:text-neutral-300 focus:text-neutral-300 rounded ring ring-neutral-700 hover:ring-neutral-500 focus:outline-0 focus:ring-neutral-500 bg-neutral-800 w-full"
                      value={project[key] as string}
                      onChange={(event) => {
                        const { value } = event.target as HTMLTextAreaElement;
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
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          (event.target as HTMLInputElement).blur();
                        }
                      }}
                    />
                  </div>
                );

              case "keypoints":
                let keypoints: Keypoint[] = project[key] as Keypoint[];
                return (
                  <div class="text-neutral-700 hover:text-neutral-500">
                    <label
                      id={`${key}-${project.id}-label`}
                      class="text-xs uppercase"
                    >
                      Portfolio Key Point
                    </label>
                    <div class="p-4 ring ring-neutral-700 hover:ring-neutral-500 rounded">
                      <For each={keypoints}>
                        {(point) => {
                          return (
                            <div>
                          <p class="text-neutral-500">{point.title}</p>
                          </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                );
              default:
                return (
                  <div class="grid gap-2 w-full items-center">
                    <label
                      id={`${key}-${project.id}-label`}
                      class="text-neutral-700 text-xs uppercase"
                    >
                      {key}
                    </label>
                    <input
                      id={`${key}-${project.id}`}
                      class="px-4 py-2 text-neutral-500 hover:text-neutral-300 focus:text-neutral-300 rounded ring ring-neutral-700 hover:ring-neutral-500 focus:outline-0 focus:ring-neutral-500 bg-neutral-800 w-full"
                      type="text"
                      value={project[key] as string}
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
      <div class="w-full py-4">
        <button
          class="w-fit cursor-pointer bg-neutral-50 hover:bg-neutral-300 rounded text-green-950 px-4 py-2"
          onClick={() => {
            updateCollection(project);
            handleRefreshSignal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
