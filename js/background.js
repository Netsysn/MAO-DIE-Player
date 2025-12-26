import config from "./config.js";

export function initBackgroundSwitcher() {
  function randomBackgroundPlay() {
    const list = config.backgroundList.map((item) => item.url);
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomUrl = list[randomIndex];
    document.body.style.backgroundImage = `url(${randomUrl})`;
  }

  setInterval(randomBackgroundPlay, 10000);
}
