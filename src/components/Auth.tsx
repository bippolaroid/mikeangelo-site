import { Setter } from "solid-js";
import { Project } from "~/types/data";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "~/utils/data_utils";

export enum Endpoint {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
}

interface AuthProps {
  endpoint: Endpoint;
  collection: Project;
  signalSetter: Setter<boolean>;
  refreshSetter: Setter<boolean>;
}

export default function Auth(props: AuthProps) {
  const { endpoint, collection, refreshSetter, signalSetter } = props;

  function passkeyHandler() {
    let passkey = document.getElementById("auth") as HTMLInputElement;
    switch (endpoint) {
      case Endpoint.DELETE_COLLECTION:
        deleteCollection(collection, passkey.value);
        break;
      case Endpoint.UPDATE_COLLECTION:
        updateCollection(collection, passkey.value);
        break;
      case Endpoint.CREATE_COLLECTION:
        createCollection(collection, passkey.value);
        break;
    }
    refreshSetter(true);
    signalSetter(false);
  }

  return (
    <div class="z-1000 absolute top-0 left-0 backdrop-blur-lg w-[100vw] h-[100vh] flex justify-center items-center">
      <div class="w-fit bg-neutral-200 shadow-xl shadow-neutral-800 p-12 rounded-xl grid gap-2 justify-center items-center">
        <label class="text-xl">Enter passkey:</label>
        <input
          id="auth"
          type="password"
          class="bg-neutral-50 rounded text-xl px-2 py-2"
        />
        <button
          class="w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-800 rounded text-neutral-50 px-4 py-2"
          onClick={passkeyHandler}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
