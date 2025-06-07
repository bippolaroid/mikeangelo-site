import { Project } from "../types/data";
import * as settings from "~/data/settings.json";

let [remoteUrl, remoteEndpoint] = [
  settings.remoteUrl.value,
  settings.remoteEndpoint.value,
];

let tunnelsUrl = settings.tunnels_url.value;

/**
 * Fetches <Project> data from the local API.
 *
 * @returns Promise that attempts to fetch <Project> data.
 */
export async function getLocalData(): Promise<Project[]> {
  try {
    const res = await fetch(`${tunnelsUrl}/projects`);
    return await res.json();
  } catch (error) {
    console.warn(error);
    return [];
  }
}

export async function getRemoteData(): Promise<Project[]> {
  try {
    const res = await fetch(`https://${remoteUrl}/${remoteEndpoint}`);
    return await res.json();
  } catch (error) {
    console.warn(error);
    return [];
  }
}

export async function getData(): Promise<Project[]> {
  try {
    const data = await getLocalData();
    console.log("Successfully fetched local data!");
    return data;
  } catch (error) {
    console.error(`Failed to fetch local data: ${error}`);
    console.log("Fetching remote data...");
    try {
      const data = await getRemoteData();
      console.log("Successfully fetched remote data!");
      return data;
    } catch (error) {
      console.error(`Failed to fetch remote data: ${error}`);
      throw error;
    }
  }
}

export async function deleteCollection(collection: Project, key: string) {
  try {
    await fetch(`${tunnelsUrl}/projects`, {
      method: "DELETE",
      body: JSON.stringify(collection),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${key}`,
      },
    }).then(async (response) => {
      if (!response.ok) {
        console.error(`Failed to delete collection: ${response.statusText}`);
      }
    });
  } catch (error) {
    console.error(`Failed to connect to server: ${error}`);
  }
}

export async function createCollection(collection: Project, key: string) {
  try {
    await fetch(`${tunnelsUrl}/projects`, {
      method: "POST",
      body: JSON.stringify(collection),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${key}`,
      },
    }).then(async (response) => {
      if (!response.ok) {
        console.error(`Failed to add collection: ${response.statusText}`);
      }
    });
  } catch (error) {
    console.error(`Failed to connect to server: ${error}`);
  }
}

export async function updateCollection(collection: Project, key: string) {
  try {
    await fetch(`${tunnelsUrl}/projects`, {
      method: "PUT",
      body: JSON.stringify(collection),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${key}`,
      },
    }).then(async (response) => {
      if (!response.ok) {
        console.error(`Failed to update collection: ${response.statusText}`);
      }
    });
  } catch (error) {
    console.error(`Failed to connect to server: ${error}`);
  }
}

export async function serverCheck() {
  try {
    const res = await fetch(`${tunnelsUrl}/folio`);
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.warn(error);
    return false;
  }
}
