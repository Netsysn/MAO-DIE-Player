import config from "./config.js";

let audio = null;
let currentMusicIndex = 0;

export function initPlaylist() {
  const list = document.querySelector("ul.music");
  const playBtn = document.querySelector(".play_btn");
  const pauseBtn = document.querySelector(".pause_btn");
  const musicDetail = document.querySelector(".music_detail");
  const nextBtn = document.querySelector(".next_btn");
  const prevBtn = document.querySelector(".prev_btn");
  const progressBar = document.querySelector(".bar");
  const timeTooltip = document.querySelector(".time-tooltip");

  if (!list) return;

  initMusic();
  renderPlaylist();

  let isDragging = false;
  let dragTime = 0;

  // 更新进度条
  function updateProgressVisual(x) {
    if (!audio || !audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    dragTime = percentage * audio.duration;

    document.querySelector(".progress").style.width = `${percentage * 100}%`;
    document.querySelector(".current_time").textContent =
      formatDuration(dragTime);
  }

  // 更新提示框位置和内容
  function updateTimeTooltip(x) {
    if (!audio || !audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const hoverTime = percentage * audio.duration;

    timeTooltip.style.left = `${x}px`;
    timeTooltip.textContent = formatDuration(hoverTime);
  }

  progressBar.addEventListener("mousemove", (e) => {
    const x = e.clientX - progressBar.getBoundingClientRect().left;
    updateTimeTooltip(x);
  });

  progressBar.addEventListener("click", (e) => {
    if (isDragging) return;

    if (!audio || !audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = percentage * audio.duration;
  });

  // 拖动功能
  progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    const x = e.clientX - progressBar.getBoundingClientRect().left;
    updateProgressVisual(x);
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      updateProgressVisual(x);
      updateTimeTooltip(x);
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      if (audio && audio.duration) {
        audio.currentTime = dragTime;
      }
      isDragging = false;
    }
  });

  list.addEventListener("click", (e) => {
    let clickedElement = e.target;
    if (clickedElement.tagName === "LI") {
      for (let i = 0; i < list.children.length; i++) {
        list.children[i].classList.remove("active");
      }
      clickedElement.classList.add("active");

      currentMusicIndex = Array.from(list.children).indexOf(clickedElement);
      playMusic(currentMusicIndex);
    }
  });

  playBtn.addEventListener("click", () => {
    if (audio && audio?.paused) {
      audio.play();
      playBtn.classList.remove("active");
      musicDetail.classList.add("active");
      pauseBtn.classList.add("active");
    }
  });

  pauseBtn.addEventListener("click", () => {
    if (audio && !audio?.paused) {
      audio.pause();
      pauseBtn.classList.remove("active");
      musicDetail.classList.remove("active");
      playBtn.classList.add("active");
    }
  });

  nextBtn.addEventListener("click", () => {
    currentMusicIndex++;
    if (currentMusicIndex >= config.music.length) {
      currentMusicIndex = 0;
    }
    playMusic(currentMusicIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentMusicIndex--;
    if (currentMusicIndex < 0) {
      currentMusicIndex = config.music.length - 1;
    }
    playMusic(currentMusicIndex);
  });

  audio.addEventListener("ended", () => {
    currentMusicIndex++;
    if (currentMusicIndex >= config.music.length) {
      currentMusicIndex = 0;
    }
    playMusic(currentMusicIndex);
  });

  audio.addEventListener("loadedmetadata", showTotalTime);

  audio.addEventListener("timeupdate", () => {
    if (isDragging) return;

    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = currentTime / duration;
    const progressBar = document.querySelector(".progress");
    progressBar.style.width = `${progress * 100}%`;
    document.querySelector(".current_time").textContent =
      formatDuration(currentTime);
  });
}

function initMusic() {
  audio = new Audio(config.music[currentMusicIndex].url);

  document.querySelector(".name").textContent =
    config.music[currentMusicIndex].name;
  document.querySelector(".music_detail").src =
    config.music[currentMusicIndex].image;
}

function playMusic(index) {
  if (audio) {
    audio.pause();
  }

  // 循环播放
  if (index >= config.music.length) {
    index = 0;
  }

  audio.src = config.music[index].url;
  const playBtn = document.querySelector(".play_btn");
  const pauseBtn = document.querySelector(".pause_btn");

  audio.play();
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");

  document.querySelector(".music_detail").classList.add("active");
  document.querySelector(".name").textContent = config.music[index].name;
  document.querySelector(".music_detail").src = config.music[index].image;

  // 更新播放列表的 active 状态
  const list = document.querySelector("ul.music");
  const items = list.querySelectorAll("li");
  items.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
function showTotalTime() {
  if (audio && audio.duration) {
    document.querySelector(".total_time").textContent = formatDuration(
      audio.duration
    );
  }
}

function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function renderPlaylist() {
  const list = document.querySelector("ul.music");
  if (!list) return;

  list.innerHTML = "";

  config.music.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "item";
    if (index === currentMusicIndex) {
      li.classList.add("active");
    }
    li.textContent = `${index + 1}. ${item.name}`;
    li.dataset.url = item.url;
    list.appendChild(li);
  });
}
