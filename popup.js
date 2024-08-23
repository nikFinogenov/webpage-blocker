document.addEventListener('DOMContentLoaded', function () {
  const linkInput = document.getElementById('linkInput');
  const saveLink = document.getElementById('saveLink');
  const deleteLast = document.getElementById('deleteLast');
  const deleteAll = document.getElementById('deleteAll');
  

  saveLink.addEventListener('click', function () {
    const link = linkInput.value;
    if (link) {
      chrome.storage.local.get(['links'], function(result) {
        const links = result.links || [];
        if(!links.includes(trimLink(link))) {
          links.push(trimLink(link));
          chrome.storage.local.set({ links: links }, function() {
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

    });
    this.blur();
  });
  function trimLink(link) {
    if(link.substring(0, 4) === "http") {
      link = link.split("/")[2];
    }
    if(link.split(".").length > 2) {
      let arr = link.split(".");
      arr.shift();
      arr.pop();
      link = arr.join(".");
    }
    else if(link.split(".").length === 2) {
      let arr = link.split(".");
      arr.pop();
      link = arr.join(".");
    }
    return link;
  }
});
