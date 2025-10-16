#!/bin/bash

# 二进制打包脚本
# 使用方法: ./build.sh [platform]
# platform: all, linux, windows, macos

echo "🚀 开始打包 internal-chat..."

# 检查是否安装了pkg
if ! command -v pkg &> /dev/null; then
    echo "📦 安装 pkg 打包工具..."
    npm install -g pkg
fi

# 创建dist目录
mkdir -p dist

# 根据参数选择打包平台
case "$1" in
    "linux")
        echo "🐧 打包 Linux 版本..."
        npm run build:linux
        ;;
    "windows")
        echo "🪟 打包 Windows 版本..."
        npm run build:windows
        ;;
    "macos")
        echo "🍎 打包 macOS 版本..."
        npm run build:macos
        ;;
    "all"|"")
        echo "🌍 打包所有平台版本..."
        npm run build:all
        ;;
    *)
        echo "❌ 未知平台: $1"
        echo "支持的平台: linux, windows, macos, all"
        exit 1
        ;;
esac

echo "✅ 打包完成！"
echo "📁 输出目录: ./dist/"
ls -la dist/

echo ""
echo "🎯 使用方法:"
echo "  Linux:   ./dist/internal-chat-linux [port]"
echo "  Windows: ./dist/internal-chat-win.exe [port]" 
echo "  macOS:   ./dist/internal-chat-macos [port]"
