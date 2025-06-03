import { createEffect, createResource, createSignal, Show } from "solid-js";
import { Project, ProjectFactory } from "~/types/data";
import { serverCheck } from "~/utils/data_utils";
import Dashboard from "~/components/Dashboard";

export default function DashboardPage() {
  const [liveCheck, loadLiveCheck] = createResource<boolean>(serverCheck);
  const [refreshSignal, setRefreshSignal] = createSignal<boolean>(false);

  function refresh() {
    return (
      <div class="w-full grid gap-4 justify-center">
        <p>folio server is not running...</p>
        <button class="w-fit mx-auto px-4 py-2 ring ring-neutral-950 text-neutral-50 hover:text-neutral-950 rounded cursor-pointer bg-neutral-950 hover:bg-neutral-50"
        onclick={() => {
          setRefreshSignal(true);
        }}>
          Refresh
        </button>
      </div>
    );
  }

  createEffect(() => {
    if (refreshSignal()) {
      setTimeout(() => {
        loadLiveCheck.refetch();
        setRefreshSignal(false);
      }, 1);
    }
  });

  return (
    <Show when={liveCheck()} fallback={refresh()}>
      <Dashboard />
    </Show>
  );
}
