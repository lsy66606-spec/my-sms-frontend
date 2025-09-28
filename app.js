// 定时刷新（5秒一次）
setInterval(fetchAndDisplaySms, 5000);
fetchAndDisplaySms();

async function fetchAndDisplaySms() {
  const container = document.getElementById('sms-container');
  try {
    // 替换为你的Worker /get-sms URL
    const res = await fetch('https://my-sms-worker.lsy66606.workers.dev/get-sms');
    if (!res.ok) throw new Error('接口请求失败');
    const messages = await res.json();
    container.innerHTML = '';

    if (messages.length === 0) {
      container.innerHTML = '<p>暂无短信</p>';
      return;
    }

    messages.forEach(sms => {
      const item = document.createElement('div');
      item.className = 'sms-item';
      const localTime = new Date(sms.timestamp).toLocaleString();
      item.innerHTML = `
        <div><span class="sms-from">${sms.from}</span><span class="sms-time">${localTime}</span></div>
        <div class="sms-body">${sms.body}</div>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    container.innerHTML = `<p>加载失败：${err.message}</p>`;
  }
}
