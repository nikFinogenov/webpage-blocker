chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    chrome.storage.local.get(['links'], function(result) {
        const links = result.links || [];
        let tabUrl = tab.url;
        // console.log(tab.url);
        // console.log(links);
        if(links.includes(tabUrl)) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: showModal
          });
        }
      });
  });

function showModal() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.7)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
  
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.background = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.textAlign = 'center';
    modal.style.width = '300px';
    modal.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
  
    const message = document.createElement('p');
    message.textContent = 'Are you sure?';
  
    const timerMessage = document.createElement('p');
    timerMessage.id = 'timerMessage';
    timerMessage.style.fontSize = '18px';
    timerMessage.style.marginTop = '10px';

    let timeLeft = 5;
    timerMessage.textContent = `Redirecting in ${timeLeft} seconds...`;


    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmButton';
    confirmButton.textContent = 'Skip timer';
    confirmButton.style.background = '#007bff';
    confirmButton.style.color = 'white';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.style.marginTop = '20px';
  
    confirmButton.addEventListener('click', function() {
      window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
    });
  
    modal.appendChild(message);
    modal.appendChild(timerMessage);
    modal.appendChild(confirmButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    const countdown = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        timerMessage.textContent = `Redirecting in ${timeLeft} seconds...`;
      } else {
        clearInterval(countdown);
        window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
      }
    }, 1000);
  }