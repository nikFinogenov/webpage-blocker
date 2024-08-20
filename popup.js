document.addEventListener('DOMContentLoaded', function () {
    const linkInput = document.getElementById('linkInput');
    const saveLink = document.getElementById('saveLink');
    const linkList = document.getElementById('linkList');
  
    chrome.storage.sync.get(['links'], function(result) {
      const links = result.links || [];
      links.forEach(link => addLinkToList(link));
    });
  
    saveLink.addEventListener('click', function () {
      const link = linkInput.value;
      if (link) {
        chrome.storage.sync.get(['links'], function(result) {
          const links = result.links || [];
          links.push(link);
          chrome.storage.sync.set({ links: links }, function() {
            addLinkToList(link);
            linkInput.value = '';
          });
        });
      }
    });
  
    function addLinkToList(link) {
      const li = document.createElement('li');
      li.textContent = link;
      linkList.appendChild(li);
    }
  });
  