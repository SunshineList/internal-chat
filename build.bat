@echo off
chcp 65001 >nul

echo 🚀 开始打包 internal-chat...

REM 检查是否安装了pkg
where pkg >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 安装 pkg 打包工具...
    npm install -g pkg
)

REM 创建dist目录
if not exist "dist" mkdir dist

REM 根据参数选择打包平台
if "%1"=="linux" (
    echo 🐧 打包 Linux 版本...
    npm run build:linux
) else if "%1"=="windows" (
    echo 🪟 打包 Windows 版本...
    npm run build:windows
) else if "%1"=="macos" (
    echo 🍎 打包 macOS 版本...
    npm run build:macos
) else if "%1"=="all" (
    echo 🌍 打包所有平台版本...
    npm run build:all
) else if "%1"=="" (
    echo 🌍 打包所有平台版本...
    npm run build:all
) else (
    echo ❌ 未知平台: %1
    echo 支持的平台: linux, windows, macos, all
    exit /b 1
)

echo ✅ 打包完成！
echo 📁 输出目录: ./dist/
dir dist

echo.
echo 🎯 使用方法:
echo   Linux:   ./dist/internal-chat-linux [port]
echo   Windows: ./dist/internal-chat-win.exe [port]
echo   macOS:   ./dist/internal-chat-macos [port]

pause
