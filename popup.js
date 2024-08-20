document.addEventListener('DOMContentLoaded', function () {
  const linkInput = document.getElementById('linkInput');
  const saveLink = document.getElementById('saveLink');
  const deleteLast = document.getElementById('deleteLast');
  const deleteAll = document.getElementById('deleteAll');
  const linkList = document.getElementById('linkList');
  

  saveLink.addEventListener('click', function () {
    const link = linkInput.value;
    if (link) {
      chrome.storage.local.get(['links'], function(result) {
        const links = result.links || [];
        if(!links.includes(trimLink(link))) {
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
  // https://www.google.com/intl/ru/gmail/about/
  // https://mail.google.com/mail/u/0/#inbox
  // https://www.google.com/search?client=safari&rls=en&q=it&ie=UTF-8&oe=UTF-8
  // http://www.vsemba.sk/Portals/0/Subory/ERASMUS/IS_BE.pdf?ver=2023-11-20-144223-543
  // http://3porno365.biz/
  // http://mob.porno365.bond/
  // https://y.hentaichan.live/user/N1kasik/
  // https://lms.khpi.ucode-connect.study/
  // https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0
  function trimLink(link) {
    if(link.substring(0, 4) === "http") {
      return link.split("/")[1];
    }
    else return link;
  }

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
