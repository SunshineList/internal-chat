# 🚀 发个东西

> 一个现代化的局域网P2P聊天和文件传输工具

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-16.20.2+-green.svg)](https://nodejs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P-orange.svg)](https://webrtc.org/)

## ✨ 特色功能

- 🎨 **现代化UI** - 全新设计的聊天界面，支持明暗主题
- 💬 **实时聊天** - 基于WebRTC的P2P实时通信
- 📁 **文件传输** - 支持任意格式文件的快速传输
- 🔒 **隐私保护** - 无痕聊天，所有数据仅在当前会话有效
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 😊 **表情支持** - 内置丰富的表情选择器
- 🌓 **主题切换** - 支持明亮/深色两种主题模式

## 🎯 核心优势

✅ **零安装** - 打开浏览器即可使用，无需下载任何软件  
✅ **零注册** - 无需登录或提供个人信息  
✅ **零存储** - 所有消息仅在当前会话有效，关闭即清除  
✅ **零中转** - 文件直接在设备间传输，不经过服务器  
✅ **跨平台** - 支持Windows、macOS、Linux、Android、iOS  

## 🖼️ 界面预览

**现代化聊天界面**
- 消息气泡设计，清晰区分发送者和接收者
- 文本💬、文件📁、图片🖼️、系统⚙️消息类型标识
- 流畅的动画效果和交互反馈

**功能丰富**
- 拖拽文件即可发送
- 图片实时预览和全屏查看
- 实时显示传输进度和速度
- 一键复制消息内容

## 🚀 快速开始

### 方式一：源码部署

```bash
# 1. 克隆项目
git clone https://github.com/your-repo/internal-chat.git
cd internal-chat

# 2. 安装依赖
npm install

# 3. 启动服务
npm run start 8081
```

### 方式二：二进制部署

1. 下载对应平台的可执行文件
2. 直接运行：`./internal-chat-linux 8081`
3. 打开浏览器访问：`http://localhost:8081`

## ⚙️ 配置说明

### 房间配置
创建 `room_pwd.json` 文件来配置私有房间：

```json
{
  "room1": {
    "password": "your_password",
    "turns": [
      {
        "urls": "turn:your-turn-server.com:3478",
        "username": "username",
        "credential": "password"
      }
    ]
  }
}
```

### Nginx代理配置

```nginx
server {
    server_name your-domain.com;
    listen 80;

    location / {
        proxy_pass http://127.0.0.1:8081/;
    }

    location /ws/ {
        proxy_pass http://127.0.0.1:8081/ws/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🔧 技术架构

- **前端**: 原生JavaScript + CSS3 + HTML5
- **后端**: Node.js + WebSocket
- **通信**: WebRTC P2P连接
- **文件传输**: DataChannel + Blob API
- **主题**: CSS变量 + 本地存储

## 📱 使用场景

- 🖥️ 新装系统时快速传输软件和文件
- 📋 团队内部快速分享文档和截图  
- 💼 会议中实时传输演示文件
- 🏠 家庭设备间的文件共享
- 🔐 需要隐私保护的临时文件传输

## ❓ 常见问题

### Q: 看到对方在线但无法连接？
**A:** 可能的原因：
1. 浏览器不支持WebRTC（请使用Chrome、Firefox、Safari等现代浏览器）
2. 网络环境限制P2P连接（需要配置TURN服务器）

### Q: 支持多大的文件传输？
**A:** 理论上无限制，但受限于设备内存。建议单文件不超过几百MB。

### Q: 数据安全吗？
**A:** 完全安全。所有数据都是P2P直连传输，不经过任何服务器，且不保存任何记录。

## 📝 更新日志

### v1.0.0
- 🎨 全新UI设计，现代化聊天界面
- 💬 消息气泡和类型标识
- 🌓 明暗主题切换
- 📱 响应式设计优化
- 😊 表情选择器
- 🔒 隐私保护增强
- ✨ 交互体验优化

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源协议。

## ⚠️ 免责声明

本项目仅用于学习交流，请勿用于非法用途，否则后果自负。

## 🙏 致谢

感谢 GitHub 作者 [sunzsh](https://github.com/sunzsh) 的开源与贡献。

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

</div>
