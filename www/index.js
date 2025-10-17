// 开发模式开关 - 设置为false可关闭所有调试日志
const DEV_MODE = false;

// 调试日志函数
const debug = {
  log: (...args) => DEV_MODE && console.log(...args),
  warn: (...args) => DEV_MODE && console.warn(...args),
  error: (...args) => console.error(...args), // 错误始终显示
};

const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const wsUrl = `${wsProtocol}://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/ws`;

var users = [];
var me = new XChatUser();

// 添加当前传输用户的引用
let currentTransferUser = null;
let currentNickname = '';
let roomPassword = ''; // 存储房间密码
let signalingServer = null;

var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}


// 初始化页面
function initPage() {
  // 初始化主题
  initTheme();
  
  // 初始化设置
  initSettings();
  
  // 检测WebRTC支持
  if (!window.RTCPeerConnection && !window.webkitRTCPeerConnection) {
    addChatItem('system', '您的浏览器不支持WebRTC，请使用Chrome、Firefox、Safari等现代浏览器访问。');
    return;
  }

  const roomId = window.location.pathname.split('/')[1];
  if (roomId) {
    // 如果有roomId，显示密码输入框并隐藏主界面
    document.querySelector('.left').style.display = 'none';
    document.querySelector('.right').style.display = 'none';
    document.getElementById('passwordModal').style.display = 'block';
    
    // 添加回车事件监听
    const passwordInput = document.getElementById('roomPasswordInput');
    passwordInput.onkeydown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitRoomPassword();
      }
    };
    // 自动聚焦密码输入框 
    // 判断是否非移动端
    if (!navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPad/i) && !navigator.userAgent.match(/iPod/i)) {
      setTimeout(() => passwordInput.focus(), 0);
    }
  } else {
    // 没有roomId，显示主界面
    document.querySelector('.left').style.display = 'flex';
    document.querySelector('.right').style.display = 'block';
    document.getElementById('passwordModal').style.display = 'none';
    // 连接WebSocket
    connectWebSocket();
  }
}

// 提交房间密码
function submitRoomPassword() {
  const passwordInput = document.getElementById('roomPasswordInput');
  roomPassword = passwordInput.value;
  
  if (!roomPassword) {
    alert('请输入密码');
    return;
  } else {
    roomPassword = MD5(roomPassword);
  }
  
  // 隐藏密码输入框，显示主界面
  document.getElementById('passwordModal').style.display = 'none';
  document.querySelector('.left').style.display = 'flex';
  document.querySelector('.right').style.display = 'block';
  
  // 连接WebSocket
  connectWebSocket();
}

// 连接WebSocket
function connectWebSocket() {
  const roomId = window.location.pathname.split('/')[1];
  const wsUrlWithPassword = wsUrl.replace(/\/$/g, '') + '/' + roomId + (roomPassword ? '/' + roomPassword : '');
  signalingServer = new WebSocket(wsUrlWithPassword);
  
  signalingServer.onopen = () => {
    debug.log('✓ 已连接到信令服务器');
    
    // 读取保存的昵称
    const match = document.cookie.match(/nickname=([^;]+)/);
    if (match) {
      currentNickname = decodeURIComponent(match[1]);
    }
    
    setInterval(() => {
      signalingServer.send(JSON.stringify({type: '9999'}));
    }, 1000 * 10);
  }

  signalingServer.onmessage = ({ data: responseStr }) => {
    const response = JSON.parse(responseStr);
    const { type, data } = response;

    if (type === '1001') {
      me.id = data.id;
      me.roomId = data.roomId;
      if (roomId && me.roomId !== roomId) {
        addChatItem('system', '房间密码错误，已切换至内网频道');
        return;
      }
      if (data.turns && data.turns.length > 0) {
        window.fgdx_configuration.iceServers.push(...data.turns)
      }
      // 如果有保存的昵称，发送给服务器
      if (currentNickname) {
        signalingServer.send(JSON.stringify({
          uid: me.id,
          targetId: me.id,
          type: '9004',
          data: { nickname: currentNickname }
        }));
      }
      return;
    }
    if (type === '1002') {
      refreshUsers(data);
      return;
    }
    if (type === '1003') {
      joinedRoom()
      return;
    }
    if (type === '1004') {
      addCandidate(data);
      return;
    }
    if (type === '1005') {
      joinConnection(data);
      return;
    }
    if (type === '1006') {
      joinedConnection(data);
      return;
    }
    if (type === '1007') {
      const user = users.find(u => u.id === data.id);
      if (user) {
        user.nickname = data.nickname;
        refreshUsersHTML();
      }
      return;
    }
  }

  signalingServer.onerror = (error) => {
    debug.error('❌ WebSocket错误:', error);
    if (error.target.readyState === WebSocket.CLOSED) {
      alert('密码错误或连接失败');
      // 显示密码输入框，隐藏主界面
      document.querySelector('.left').style.display = 'none';
      document.querySelector('.right').style.display = 'none';
      document.getElementById('passwordModal').style.display = 'block';
      document.getElementById('roomPasswordInput').value = '';
      document.getElementById('roomPasswordInput').focus();
    }
  };
}

// 表情符号数据
const emojiData = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
  people: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  nature: ['🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌾', '🌿', '🍀', '🍃', '🌱', '🌲', '🌳', '🌴', '🌵', '🌶️', '🍄', '🌰', '🌼', '🌻', '🌺', '🌸', '🌷', '🌹', '🥀', '🌾', '🌿', '🍀', '🍃', '🌱'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛺', '🚁', '🛸', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🛰️', '🚢'],
  objects: ['💡', '🔦', '🏮', '🪔', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐']
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);

function setRemote() {
  me.setRemoteSdp(remoteSDP.value);
}

async function copy(e, msg) {
  const currentTarget = e.currentTarget
  function copySuccess() {
    currentTarget.innerHTML = `
      <svg viewBox="0 0 1024 1024" width="20" height="21"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" fill="currentColor"></path></svg>
    `
    const timer = setTimeout(() => {
      currentTarget.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"></path></svg>
      `
      clearTimeout(timer)
    }, 1000);
  }
  function fallbackCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = msg;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copySuccess()
  }
  try {
    await navigator.clipboard.writeText(msg);
    copySuccess()
  } catch (error) {
    fallbackCopy()
  }
}

function addLinkItem(uid, file) {
  const chatBox = document.querySelector('.chat-wrapper');
  const chatItem = document.createElement('div');
  
  // 检查是否是图片文件
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
  const isMyMessage = uid === me.id;
  
  let messageTypeClass = isMyMessage ? 'my-message' : 'other-message';
  messageTypeClass += isImage ? ' image-message' : ' file-message';
  
  chatItem.className = `chat-item ${messageTypeClass}`;
  
  const user = users.find(u => u.id === uid);
  const displayName = user?.nickname || uid;
  
  const messageTypeIcon = isImage ? '🖼️' : '📁';
  
  let contentHtml = '';
  if (isImage) {
    contentHtml = `
      <div class="image-preview">
        <img src="${file.url}" alt="${file.name}" style="max-width: 200px; max-height: 200px; border-radius: 8px;" />
      </div>
      <div style="margin-top: 8px; font-size: 13px; color: #6b7280;">${file.name}</div>
    `;
  } else {
    contentHtml = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="background: #f3f4f6; padding: 8px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          <span>${file.name}</span>
        </div>
      </div>
    `;
  }
  
  const timeString = new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  chatItem.innerHTML = `
    <div class="chat-username">
      <span class="message-type-icon ${isImage ? 'image' : 'file'}">${messageTypeIcon}</span>
      ${displayName}
    </div>
    <div class="chat-bubble">
      <div class="chat-content">${contentHtml}</div>
      <div class="chat-time">${timeString}</div>
      <a href="${file.url}" download="${file.name}" style="display: none;"></a>
    </div>
  `;
  
  // 如果是图片，添加点击事件和加载完成后的滚动
  if (isImage) {
    const img = chatItem.querySelector('img');
    img.onclick = function() {
      // 创建一个新的图片元素来预览
      const previewImg = new Image();
      previewImg.src = this.src;
      
      // 等待图片加载完成
      previewImg.onload = function() {
        // 创建一个新的窗口
        const previewWindow = window.open('', '_blank');
        if (previewWindow) {
          // 设置预览窗口的内容
          previewWindow.document.write(`
            <html>
              <head>
                <title>${file.name}</title>
                <style>
                  body {
                    margin: 0;
                    padding: 20px;
                    background: #1a1a1a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                  }
                  img {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${previewImg.src}" alt="${file.name}" />
              </body>
            </html>
          `);
          previewWindow.document.close();
        }
      };
    };

    // 等待图片加载完成后再滚动
    img.onload = function() {
      chatBox.scrollTop = chatBox.scrollHeight;
    };
  } else {
    // 为文件添加点击下载事件
    const fileDiv = chatItem.querySelector('.chat-content > div');
    fileDiv.style.cursor = 'pointer';
    fileDiv.onclick = function() {
      chatItem.querySelector('a').click();
    };
  }
  
  chatBox.appendChild(chatItem);
  
  // 移除欢迎消息（如果存在）
  const welcomeMsg = chatBox.querySelector('.chat-welcome');
  if (welcomeMsg) {
    welcomeMsg.remove();
  }
  
  // 不再保存聊天记录到本地存储（出于安全考虑）
  
  // 如果不是图片，立即滚动
  if (!isImage) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function addChatItem(uid, message) {
  // 如果是系统控制消息（以##开头），不显示在聊天记录中
  try {
    if (typeof message === 'string' && message.startsWith('##')) {
      return;
    }
    const parsed = JSON.parse(message);
    if (parsed.type && parsed.type.startsWith('##')) {
      return;
    }
  } catch {
    // 不是JSON消息，继续正常处理
  }

  const chatBox = document.querySelector('.chat-wrapper');
  const chatItem = document.createElement('div');
  
  const copyText = message;
  let msg = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // 判断是否url，兼容端口号和带参数的网址
  if (/(http|https):\/\/[^\s<>"']+/g.test(msg)) {
    msg = msg.replace(/(http|https):\/\/[^\s<>"']+/g, (url) => {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
  }

  const user = users.find(u => u.id === uid);
  const displayName = uid === 'system' ? '系统' : (user?.nickname || uid);
  const isSystem = uid === 'system';
  const isMyMessage = uid === me.id && !isSystem;

  // 设置消息类型的CSS类
  let messageTypeClass = 'other-message';
  let messageTypeIcon = '💬';
  
  if (isSystem) {
    messageTypeClass = 'system-message';
    messageTypeIcon = '⚙️';
  } else if (isMyMessage) {
    messageTypeClass = 'my-message';
    messageTypeIcon = '💬';
  }

  chatItem.className = `chat-item ${messageTypeClass}`;

  const copyButton = document.createElement('button')
  copyButton.className = 'copy-btn'
  copyButton.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"></path></svg>'
  copyButton.onclick = function () {
    copy(event,copyText)
  }

  const timeString = new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  chatItem.innerHTML = `
    ${!isSystem ? `<div class="chat-username">
      <span class="message-type-icon text">${messageTypeIcon}</span>
      ${displayName}
    </div>` : ''}
    <div class="chat-bubble">
      <div class="chat-content">${msg}</div>
      <div class="chat-time">${timeString}</div>
    </div>
  `;
  
  if (!isSystem) {
    chatItem.querySelector('.chat-bubble').appendChild(copyButton);
  }
  
  chatBox.appendChild(chatItem);
  
  // 移除欢迎消息（如果存在）
  const welcomeMsg = chatBox.querySelector('.chat-welcome');
  if (welcomeMsg) {
    welcomeMsg.remove();
  }
  
  // 自动滚动（如果启用）
  if (appSettings.autoScroll) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // 不再保存聊天记录到本地存储（出于安全考虑）
  
  // 如果不是自己发送的消息且不是系统消息，触发通知
  if (uid !== me.id && uid !== 'system') {
    playNotificationSound();
    
    const user = users.find(u => u.id === uid);
    const displayName = user?.nickname || uid;
    showDesktopNotification(`${displayName} 发来新消息`, message.substring(0, 50) + (message.length > 50 ? '...' : ''));
  }
}
function sendMessage(msg) {
  const message = msg ?? messageInput.value;
  addChatItem(me.id, message);
  users.forEach(u => {
    if (u.isMe) {
      return;
    }
    u.sendMessage(message);
  });
  messageInput.value = '';
}

async function sendFile(file) {
  pendingFile = file;
  
  const otherUsers = users.filter(u => !u.isMe);
  
  if (otherUsers.length === 1) {
    const modal = document.getElementById('userSelectModal');
    const progressContainer = modal.querySelector('.progress-container');
    const progressBar = modal.querySelector('.progress-bar-inner');
    const progressText = modal.querySelector('.progress-text');
    
    try {
      const user = otherUsers[0];
      currentTransferUser = user;
      const fileInfo = { name: file.name, size: file.size };
      
      // 显示进度条
      modal.style.display = 'block';
      document.getElementById('userSelectList').style.display = 'none';
      modal.querySelector('.modal-footer').style.display = 'block';
      modal.querySelector('.modal-footer button:last-child').style.display = 'none';
      progressContainer.style.display = 'block';
      
      // 创建进度回调
      const onProgress = (sent, total) => {
        const progress = (sent / total) * 100;
        progressBar.style.width = progress + '%';
        // 计算传输速度
        const speed = sent / (Date.now() - startTime) * 1000; // 字节/秒
        const speedText = speed > 1024 * 1024 
          ? `${(speed / (1024 * 1024)).toFixed(2)} MB/s`
          : `${(speed / 1024).toFixed(2)} KB/s`;
        const displayName = user.nickname || user.id;
        progressText.textContent = `正在发送给 ${displayName}... ${speedText}`;
      };
      
      const startTime = Date.now();
      await user.sendFile(fileInfo, file, onProgress);
      const displayName = user.nickname || user.id;
      
      // 创建文件URL供自己下载
      const fileUrl = URL.createObjectURL(file);
      const fileObj = { name: file.name, url: fileUrl };
      addLinkItem(me.id, fileObj);
      
      addChatItem(me.id, `✓ 文件已发送给 ${displayName}`);
    } catch (error) {
      debug.error('❌ 发送文件失败:', error);
      alert('发送文件失败，请重试');
    } finally {
      currentTransferUser = null;
      // 恢复界面状态
      modal.style.display = 'none';
      document.getElementById('userSelectList').style.display = 'block';
      modal.querySelector('.modal-footer').style.display = 'block';
      modal.querySelector('.modal-footer button:last-child').style.display = 'inline-block';
      progressContainer.style.display = 'none';
      progressBar.style.width = '0%';
    }
    
    pendingFile = null;
    return;
  }
  
  showUserSelectModal();
}
function registCandidate() {
  for (const ca of JSON.parse(candidate.value)) {
    me.addIceCandidate(ca);
  }
}


function connectAllOther() {
  if (users.length <= 1) {
    return;
  }
  const targets = users.filter(u => u.id !== me.id);
  for (const target of targets) {
    target.onicecandidate = (candidate) => {
      signalingServer.send(JSON.stringify({uid: me.id, targetId: target.id, type: '9001', data: { candidate }}));
    }
    target.createConnection().then(() => {
      signalingServer.send(JSON.stringify({uid: me.id, targetId: target.id, type: '9002', data: { targetAddr: target.connAddressMe }}));
    })
  }
}


function refreshUsers(data) {
  resUsers = data.map(
    u => {
      let uOld = users.find(uOld => uOld.id === u.id)
      if (uOld) {
        // 保持原有昵称
        u.nickname = u.nickname || uOld.nickname;
        return uOld;
      }
      let xchatUser = new XChatUser();
      xchatUser.id = u.id;
      xchatUser.isMe = u.id === me.id;
      xchatUser.nickname = u.nickname; // 设置昵称
      
      xchatUser.onConnectionStateChange = (state) => {
        debug.log(`🔗 用户 ${xchatUser.id} 连接状态: ${state}`);
        refreshUsersHTML();
      };
      
      return xchatUser;
    }
  );

  // 找出删除的用户
  const delUsers = users.filter(u => !resUsers.find(u2 => u2.id === u.id));
  delUsers.forEach(u => {
    u.closeConnection();
  });

  users = resUsers;
  for (const u of users) {
    u.onmessage = (msg) => {
      addChatItem(u.id, msg);
    }
    u.onReviceFile = (file) => {
      addLinkItem(u.id, file);
    }
  }
  refreshUsersHTML();
}

function joinedRoom() {
  connectAllOther();
}

function addCandidate(data) {
  const user = users.find(u => u.id === data.targetId);
  if (user && user.rtcConn) {
    debug.log(`📡 添加ICE候选: ${data.targetId}`);
    try {
      user.addIceCandidate(data.candidate);
    } catch (error) {
      debug.error('❌ ICE候选添加失败:', error);
    }
  } else {
    debug.warn(`⚠️ 用户 ${data.targetId} 未找到或无RTC连接`);
  }
}
async function joinConnection(data) {
  const user = users.find(u => u.id === data.targetId)
  if (!user) {
    return;
  }
  user.onicecandidate = (candidate) => {
    signalingServer.send(JSON.stringify({uid: me.id, targetId: user.id, type: '9001', data: { candidate }}));
  }
  await user.connectTarget(data.offer.sdp)
  signalingServer.send(JSON.stringify({uid: me.id, targetId: user.id, type: '9003', data: { targetAddr: user.connAddressMe }}));
}

async function joinedConnection(data) {
  const target = users.find(u => u.id === data.targetId)
  if (!target) {
    return;
  }
  await target.setRemoteSdp(data.answer.sdp);
  refreshUsersHTML();
}

function refreshUsersHTML() {
  const hasConnectedUsers = users.some(u => !u.isMe && u.isConnected());
  
  // 如果有连接的用户，隐藏欢迎页面，显示聊天界面
  if (hasConnectedUsers) {
    const welcomeSection = document.getElementById('welcomeSection');
    const chatWrapper = document.getElementById('chatWrapper');
    
    if (welcomeSection) {
      welcomeSection.style.display = 'none';
      welcomeSection.style.setProperty('display', 'none', 'important');
    }
    if (chatWrapper) {
      chatWrapper.style.display = 'flex';
      chatWrapper.style.setProperty('display', 'flex', 'important');
    }
    
    // 更新连接状态指示器
    const statusIndicator = document.querySelector('.connection-status-indicator span');
    const pulseDot = document.querySelector('.pulse-dot');
    if (statusIndicator && pulseDot) {
      statusIndicator.textContent = '已连接';
      pulseDot.classList.add('connected');
    }
    
    // 如果聊天区域是空的，添加欢迎消息
    if (chatWrapper && chatWrapper.children.length === 0) {
      showChatWelcomeMessage();
    }
  } else {
    // 没有连接的用户，显示欢迎页面
    const welcomeSection = document.getElementById('welcomeSection');
    const chatWrapper = document.getElementById('chatWrapper');
    
    if (welcomeSection) {
      welcomeSection.style.display = 'flex';
      welcomeSection.style.setProperty('display', 'flex', 'important');
    }
    if (chatWrapper) {
      chatWrapper.style.display = 'none';
      chatWrapper.style.setProperty('display', 'none', 'important');
    }
  }
  
  // 更新在线用户数量
  const onlineCount = users.filter(u => !u.isMe && u.isConnected()).length;
  const onlineCountElem = document.getElementById('onlineCount');
  if (onlineCountElem) {
    onlineCountElem.textContent = onlineCount;
    onlineCountElem.style.display = onlineCount > 0 ? 'block' : 'none';
  }
  
  document.querySelector('#users').innerHTML = users.map(u => {
    const isConnected = u.isMe || u.isConnected();
    debug.log('连接状态:', isConnected);
    const statusClass = isConnected ? 'connected' : 'disconnected';
    const statusIcon = isConnected ? 
      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>` : 
      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.43-.98 2.63-2.31 2.98l1.46 1.46C20.88 15.61 22 13.95 22 12c0-2.76-2.24-5-5-5zm-1 4h-2.19l2 2H16zM2 4.27l3.11 3.11C3.29 8.12 2 9.91 2 12c0 2.76 2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1 0-1.59 1.21-2.9 2.76-3.07L8.73 11H8v2h2.73L13 15.27V17h1.73l4.01 4L20 19.74 3.27 3 2 4.27z"/></svg>`;
    
    const displayName = u.nickname || u.id;
    
    return `
      <li>
        <span class="connection-status ${statusClass}">
          ${statusIcon}
        </span>
        ${displayName}${u.isMe?'（我）':''}
      </li>
    `;
  }).join('');
}

// 显示聊天欢迎消息
function showChatWelcomeMessage() {
  const chatWrapper = document.getElementById('chatWrapper');
  
  // 创建欢迎消息容器
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'chat-welcome';
  welcomeDiv.innerHTML = `
    <div class="chat-welcome-content">
      <div class="welcome-icon">🎉</div>
      <h3>连接成功！</h3>
      <p>您现在可以开始聊天和传输文件了</p>
      <div class="welcome-tips">
        <div class="tip-item">
          <span class="tip-icon">💬</span>
          <span>输入消息按 Enter 发送</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📁</span>
          <span>拖拽文件到窗口即可发送</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">😊</span>
          <span>点击表情按钮添加表情</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔒</span>
          <span>所有消息仅当前会话有效，保护您的隐私</span>
        </div>
      </div>
    </div>
  `;
  
  chatWrapper.appendChild(welcomeDiv);
  
  // 不再加载历史消息（已移除历史记录功能）
  
  // 3秒后自动隐藏欢迎消息（如果没有其他消息）
  setTimeout(() => {
    if (chatWrapper.children.length === 1) {
      // 如果只有欢迎消息，添加一个提示
      addChatItem('system', '开始您的第一条消息吧！输入文字或拖拽文件到窗口。');
      addChatItem('system', '🔒 提示：为了保护隐私，所有消息仅在当前会话有效，关闭页面后不会保留。');
    }
  }, 3000);
}

function enterTxt(event) {
  if (event.keyCode === 13) {
    if (event.shiftKey || event.ctrlKey) {
      // Shift+Enter 或 Ctrl+Enter 换行，允许默认行为
      return;
    } else {
      // 单独 Enter 发送消息
      sendMessage();
      event.preventDefault();
    }
  }
}


function showUserSelectModal() {
  const modal = document.getElementById('userSelectModal');
  const userList = document.getElementById('userSelectList');
  
  // 清空之前的列表
  userList.innerHTML = '';
  
  // 添加用户选项
  users.forEach(user => {
    if (!user.isMe) {
      const item = document.createElement('div');
      item.className = 'user-select-item';
      const displayName = user.nickname || user.id;
      
      item.innerHTML = `
        <label>
          <input type="checkbox" value="${user.id}">
          <span>${displayName}</span>
        </label>
      `;
      
      // 点击整行时切换复选框状态
      item.addEventListener('click', (e) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (e.target === checkbox) return;
        checkbox.checked = !checkbox.checked;
        e.preventDefault();
      });
      
      userList.appendChild(item);
    }
  });
  
  modal.style.display = 'block';
}

function cancelSendFile() {
  if (currentTransferUser) {
    currentTransferUser.cancelTransfer();
  }
  const modal = document.getElementById('userSelectModal');
  modal.style.display = 'none';
  pendingFile = null;
  currentTransferUser = null;
}

async function confirmSendFile() {
  const modal = document.getElementById('userSelectModal');
  const sendButton = modal.querySelector('.modal-footer button:last-child');
  const progressContainer = modal.querySelector('.progress-container');
  const progressBar = modal.querySelector('.progress-bar-inner');
  const progressText = modal.querySelector('.progress-text');
  const userList = document.getElementById('userSelectList');
  const selectedUsers = Array.from(document.querySelectorAll('#userSelectList input[type="checkbox"]:checked'))
    .map(checkbox => users.find(u => u.id === checkbox.value));
  
  if (selectedUsers.length > 0 && pendingFile) {
    sendButton.disabled = true;
    sendButton.textContent = '发送中...';
    userList.style.display = 'none';
    progressContainer.style.display = 'block';
    
    try {
      const fileInfo = { name: pendingFile.name, size: pendingFile.size };
      const totalUsers = selectedUsers.length;
      const startTime = Date.now();
      
      for (let i = 0; i < selectedUsers.length; i++) {
        const user = selectedUsers[i];
        const displayName = user.nickname || user.id;
        progressText.textContent = `正在发送给 ${displayName}... (${i + 1}/${totalUsers})`;
        
        const onProgress = (sent, total) => {
          const userProgress = (sent / total) * 100;
          const totalProgress = ((i * 100) + userProgress) / totalUsers;
          progressBar.style.width = totalProgress + '%';
          // 计算传输速度
          const speed = sent / (Date.now() - startTime) * 1000; // 字节/秒
          const speedText = speed > 1024 * 1024 
            ? `${(speed / (1024 * 1024)).toFixed(2)} MB/s`
            : `${(speed / 1024).toFixed(2)} KB/s`;
          progressText.textContent = `正在发送给 ${displayName}... (${i + 1}/${totalUsers}) ${speedText}`;
        };
        
        await user.sendFile(fileInfo, pendingFile, onProgress);
      }
      
      // 创建文件URL供自己下载
      const fileUrl = URL.createObjectURL(pendingFile);
      const fileObj = { name: pendingFile.name, url: fileUrl };
      addLinkItem(me.id, fileObj);
      
      // 使用昵称显示在聊天记录中
      const displayNames = selectedUsers.map(u => u.nickname || u.id).join(', ');
      addChatItem(me.id, `✓ 文件已发送给 ${displayNames}`);
    } catch (error) {
      debug.error('❌ 发送文件失败:', error);
      alert('发送文件失败，请重试');
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = '发送';
      userList.style.display = 'block';
      progressContainer.style.display = 'none';
      progressBar.style.width = '0%';
    }
  }
  
  modal.style.display = 'none';
  pendingFile = null;
}


let droptarget = document.body;
    
async function handleEvent(event) {
  event.preventDefault();
  if (event.type === 'drop') {
    droptarget.classList.remove('dragover');
    if (event.dataTransfer.files.length > 0) {
      await sendFile(event.dataTransfer.files[0]);
    }
  } else if (event.type === 'dragleave') {
    droptarget.classList.remove('dragover');
  } else {
    droptarget.classList.add('dragover');
  }
}

droptarget.addEventListener("dragenter", handleEvent);
droptarget.addEventListener("dragover", handleEvent);
droptarget.addEventListener("drop", handleEvent);
droptarget.addEventListener("dragleave", handleEvent);

document.querySelector('.file-btn').addEventListener('click', async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async (e) => {
    if (e.target.files.length > 0) {
      await sendFile(e.target.files[0]);
    }
  };
  input.click();
});

document.querySelector('.send-btn').addEventListener('click', () => {
  if (messageInput.value.trim()) {  // 只有当消息不为空时才发送
    sendMessage();
  }
});

function showNicknameModal() {
  const modal = document.getElementById('nicknameModal');
  const input = document.getElementById('nicknameInput');
  input.value = currentNickname.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  modal.style.display = 'block';
  
  // 自动获取焦点
  setTimeout(() => input.focus(), 0);
  
  // 添加回车事件监听
  input.onkeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 阻止默认的回车行为
      saveNickname();
    }
  };
}

function closeNicknameModal() {
  const modal = document.getElementById('nicknameModal');
  const input = document.getElementById('nicknameInput');
  modal.style.display = 'none';
  
  // 清除回车事件监听
  input.onkeydown = null;
}

function saveNickname() {
  const input = document.getElementById('nicknameInput');
  let nickname = input.value.trim();
  
  if (nickname) {
    nickname = nickname.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    currentNickname = nickname;
    document.cookie = `nickname=${encodeURIComponent(nickname)}; path=/; max-age=31536000`; // 保存一年
    
    // 更新本地显示
    const user = users.find(u => u.id === me.id);
    if (user) {
      user.nickname = nickname;
      refreshUsersHTML();
    }
    
    // 发送到服务器
    signalingServer.send(JSON.stringify({
      uid: me.id,
      targetId: me.id,
      type: '9004',
      data: { nickname }
    }));
  }
  
  closeNicknameModal();
}

// 表情符号选择器功能
function showEmojiModal() {
  const modal = document.getElementById('emojiModal');
  modal.style.display = 'block';
  loadEmojiCategory('smileys');
}

function closeEmojiModal() {
  const modal = document.getElementById('emojiModal');
  modal.style.display = 'none';
}

function loadEmojiCategory(category) {
  const grid = document.getElementById('emojiGrid');
  const emojis = emojiData[category] || [];
  
  grid.innerHTML = emojis.map(emoji => 
    `<button class="emoji-item" onclick="insertEmoji('${emoji}')">${emoji}</button>`
  ).join('');
  
  // 更新分类按钮状态
  document.querySelectorAll('.emoji-category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
}

function insertEmoji(emoji) {
  const messageInput = document.getElementById('messageInput');
  const cursorPos = messageInput.selectionStart;
  const textBefore = messageInput.value.substring(0, cursorPos);
  const textAfter = messageInput.value.substring(messageInput.selectionEnd);
  
  messageInput.value = textBefore + emoji + textAfter;
  messageInput.selectionStart = messageInput.selectionEnd = cursorPos + emoji.length;
  messageInput.focus();
  
  closeEmojiModal();
}

// 为消息添加时间戳
function addMessageTimestamp() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `<span class="message-timestamp">${timeString}</span>`;
}

// 历史记录功能已移除（出于隐私和安全考虑）
// 所有消息仅在当前会话中有效

// ... 添加昵称按钮事件监听
document.querySelector('.nickname-btn').addEventListener('click', showNicknameModal);

// 添加表情符号按钮事件监听
document.querySelector('.emoji-btn').addEventListener('click', showEmojiModal);

// 主题切换功能
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark-theme');
  
  if (isDark) {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
  }
}

// 主题切换按钮事件监听在 DOMContentLoaded 中处理

// 设置功能
let appSettings = {
  soundNotification: true,
  desktopNotification: false,
  autoScroll: true
};

// 声音通知
function playNotificationSound() {
  if (!appSettings.soundNotification) return;
  
  // 创建音频上下文和音频
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
}

// 桌面通知
function showDesktopNotification(title, body) {
  if (!appSettings.desktopNotification) return;
  
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibG9nb0dyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N2VlYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQ1IiBmaWxsPSJ1cmwoI2xvZ29HcmFkaWVudCkiIG9wYWNpdHk9IjAuMiIvPgogIDxwYXRoIGQ9Ik0yNSAzNSBMNzUgMzUgUTgwIDM1IDgwIDQwIEw4MCA2MCBRODAgNjUgNzUgNjUgTDM1IDY1IEwyNSA3NSBMMjUgNDAgUTI1IDM1IDMwIDM1IFoiIGZpbGw9InVybCgjbG9nb0dyYWRpZW50KSIvPgogIDxjaXJjbGUgY3g9IjQwIiBjeT0iNTAiIHI9IjMiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMyIgZmlsbD0id2hpdGUiLz4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjUwIiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4='
    });
  }
}

// 请求桌面通知权限
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// 显示设置模态框
function showSettingsModal() {
  const modal = document.getElementById('settingsModal');
  
  // 加载当前设置
  document.getElementById('soundNotification').checked = appSettings.soundNotification;
  document.getElementById('desktopNotification').checked = appSettings.desktopNotification;
  document.getElementById('autoScroll').checked = appSettings.autoScroll;
  
  modal.style.display = 'block';
}

// 关闭设置模态框
function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  modal.style.display = 'none';
}

// 保存设置
function saveSettings() {
  appSettings.soundNotification = document.getElementById('soundNotification').checked;
  appSettings.desktopNotification = document.getElementById('desktopNotification').checked;
  appSettings.autoScroll = document.getElementById('autoScroll').checked;
  
  // 保存到本地存储
  localStorage.setItem('appSettings', JSON.stringify(appSettings));
  
  // 如果启用桌面通知，请求权限
  if (appSettings.desktopNotification) {
    requestNotificationPermission();
  }
  
  closeSettingsModal();
}

// 初始化设置
function initSettings() {
  const savedSettings = localStorage.getItem('appSettings');
  if (savedSettings) {
    appSettings = { ...appSettings, ...JSON.parse(savedSettings) };
  }
  
  // 如果启用桌面通知，请求权限
  if (appSettings.desktopNotification) {
    requestNotificationPermission();
  }
}

// 添加设置按钮事件监听
document.querySelector('.settings-btn').addEventListener('click', showSettingsModal);

// 网络质量监测
let networkQuality = 'excellent';
let pingTimes = [];

function updateNetworkQuality() {
  const qualityElement = document.getElementById('networkQuality');
  if (!qualityElement) return;
  
  // 计算平均ping时间
  const avgPing = pingTimes.length > 0 ? pingTimes.reduce((a, b) => a + b) / pingTimes.length : 0;
  
  let quality = 'excellent';
  let qualityText = '网络优秀';
  
  if (avgPing > 500) {
    quality = 'poor';
    qualityText = '网络较差';
  } else if (avgPing > 200) {
    quality = 'good';
    qualityText = '网络良好';
  }
  
  qualityElement.className = `network-quality ${quality}`;
  qualityElement.querySelector('span').textContent = qualityText;
  
  networkQuality = quality;
}

function measurePing() {
  if (!signalingServer || signalingServer.readyState !== WebSocket.OPEN) {
    return;
  }
  
  const startTime = Date.now();
  
  // 发送ping消息
  signalingServer.send(JSON.stringify({type: '9999'}));
  
  // 模拟ping响应（实际应用中需要服务器支持）
  setTimeout(() => {
    const pingTime = Date.now() - startTime;
    pingTimes.push(pingTime);
    
    // 只保留最近10次的ping时间
    if (pingTimes.length > 10) {
      pingTimes.shift();
    }
    
    updateNetworkQuality();
  }, 50);
}

// 定期测量网络质量
setInterval(measurePing, 5000);

function toggleUsersList() {
  document.body.classList.toggle('show-users');
}

// Add event listener for toggle button and overlay
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtns = document.querySelectorAll('.toggle-users-btn');
  const overlay = document.querySelector('.mobile-overlay');
  const themeBtns = document.querySelectorAll('.theme-btn');
  
  // 为所有切换按钮添加事件监听
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleUsersList);
  });
  
  overlay.addEventListener('click', toggleUsersList);
  
  // 为所有主题切换按钮添加事件监听
  themeBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Hide users list by default on mobile
  if (window.innerWidth <= 768) {
    document.body.classList.remove('show-users');
  }
  
  // 添加表情符号分类按钮事件监听
  document.querySelectorAll('.emoji-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loadEmojiCategory(btn.dataset.category);
    });
  });

  // 添加粘贴事件监听
  document.addEventListener('paste', async (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file) {
          // 创建一个新的 File 对象，确保有正确的文件名
          const imageFile = new File([file], `pasted-image-${Date.now()}.png`, {
            type: 'image/png'
          });
          await sendFile(imageFile);
        }
        break;
      }
    }
  });
});