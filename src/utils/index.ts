import { persistor } from "../store";
import { relaunch } from "@tauri-apps/api/process";

export async function resetApp() {
  await persistor.purge();
  await relaunch();
}
