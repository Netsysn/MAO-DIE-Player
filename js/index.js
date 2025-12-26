import { initBackgroundSwitcher } from "./background.js";
import { initPlaylist } from "./playlist.js";

window.onload = () => {
  initBackgroundSwitcher();
  initPlaylist();
};
