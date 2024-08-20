document.addEventListener('DOMContentLoaded', function () {
  const linkInput = document.getElementById('linkInput');
  const saveLink = document.getElementById('saveLink');
  const deleteLast = document.getElementById('deleteLast');
  const deleteAll = document.getElementById('deleteAll');
  const linkList = document.getElementById('linkList');

  chrome.storage.local.get(['links'], function(result) {
    // const links = result.links || [];
    // links.forEach(link => addLinkToList(link));
  });

  saveLink.addEventListener('click', function () {
    const link = linkInput.value;
    if (link) {
      chrome.storage.local.get(['links'], function(result) {
        const links = result.links || [];
        if(!links.includes(link)) {
          links.push(link);
          chrome.storage.local.set({ links: links }, function() {
            // addLinkToList(link);
          });
          linkInput.value = '';
        }
        else {
          alert("already in list")
        }
      });
    }
   this.blur();
  });

  deleteLast.addEventListener('click', function () {
    chrome.storage.local.get(['links'], function(result) {
      const links = result.links || [];
      if (links.length > 0) {
        links.pop();
        chrome.storage.local.set({ links: links }, function() {
          // refreshLinkList(links);
        });
      }
    });
    this.blur();
  });

  deleteAll.addEventListener('click', function () {
    chrome.storage.local.set({ links: [] }, function() {
      // const links = result.links || [];
      // refreshLinkList(links);
    });
    this.blur();
  });

  // function addLinkToList(link) {

  //   const li = document.createElement('li');
  //   li.textContent = link;
  //   linkList.appendChild(li);
  // }

  // function refreshLinkList(links) {
  //   linkList.innerHTML = '';
  //   links.forEach(link => addLinkToList(link));
  // }
});
