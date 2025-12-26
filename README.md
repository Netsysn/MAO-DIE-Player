# 🎵 哈基米音乐播放器

一个基于 Web 的耄耋音乐播放器，简洁美观，功能完整。(不是)

## ✨ 功能特点

- 📋 **歌曲列表** - 完整的 16 首歌曲播放列表
- 🎮 **播放控制** - 播放、暂停、上一首、下一首
- 🎚️ **进度控制** - 支持点击跳转和拖拽调整播放进度
- 🎨 **动态封面** - 播放时封面旋转动画效果
- 🔄 **自动播放** - 当前歌曲结束后自动播放下一首
- 🖱️ **交互友好** - 悬浮提示、平滑过渡动画
- 🌈 **动态背景** - 多款 GIF 背景切换

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式与动画效果
- **JavaScript (ES6+)** - 核心功能实现
- **Web Audio API** - 音频播放控制

## 📁 项目结构

```
tt/
├── assets/
│   ├── background/    # 背景图片
│   ├── img/          # 歌曲封面
│   └── music/        # 音频文件
├── css/
│   ├── base.css      # 基础样式
│   └── style.css     # 组件样式
├── js/
│   ├── config.js     # 配置文件（歌曲列表）
│   ├── index.js      # 入口文件
│   ├── playlist.js   # 播放器核心逻辑
│   └── background.js # 背景切换逻辑
└── index.html        # 主页面
```

## 🚀 如何使用

### 本地运行

1. 克隆或下载项目

```bash
git clone https://github.com/Netsysn/MAO-DIE-Player.git
cd tt
```

2. 直接用浏览器打开 `index.html` 文件

或使用本地服务器（推荐）：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (http-server)
npx http-server
```

3. 访问 `http://localhost:8000`

### 添加歌曲

编辑 `js/config.js` 文件，在 `music` 数组中添加新的歌曲：

```javascript
music: [
  {
    name: "歌曲名称",
    image: "../assets/img/cover.jpg",
    url: "../assets/music/song.mp3",
  },
  // ...更多歌曲
];
```

### 切换背景

编辑 `js/config.js` 文件，在 `backgroundList` 数组中添加新的背景：

```javascript
backgroundList: [
  {
    name: "背景名称",
    url: "../assets/background/bg.gif",
  },
];
```

## 🎵 歌曲列表

1. 孤独的哈基米
2. 哈基宝贝
3. 哈基米运动会
4. 哈气一下马上回来
5. 基米基米基米基米
6. 曼波曼波有时哈基米
7. 曼波偷西瓜
8. 猛毒基米
9. 咪咪实验室核弹头
10. 丝之歌哈基米
11. 太空曼波
12. 泰曼波
13. 我爱你哈基米
14. 众神眷念的哈基乡
15. DJ 蟹哈基米
16. free 基米

## 🎯 核心功能说明

### 播放器控制

- **播放/暂停按钮** - 中央切换播放状态
- **上一首/下一首** - 切换歌曲
- **进度条** -
  - 悬停显示时间提示
  - 点击跳转到指定位置
  - 拖拽调整播放进度
- **时间显示** - 当前时间 / 总时长

### 播放列表

- 点击列表项直接切换歌曲
- 当前播放歌曲高亮显示
- 列表滚动支持（悬停时）

## 📝 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari

需要支持 ES6 模块的现代浏览器。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

Made with ❤️
