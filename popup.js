document.getElementById('save-url').addEventListener('click', async () => {
  const tab = await new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => resolve(tab));
  });
  const urlList = JSON.parse(localStorage.getItem('urlList') || '[]');
  urlList.push(tab.url);
  localStorage.setItem('urlList', JSON.stringify(urlList));
  updateUrlList();
});

document.getElementById('download-pdf').addEventListener('click', async () => {
  const urlList = JSON.parse(localStorage.getItem('urlList') || '[]');
  updateUrlList();
  const pdfContent = urlList.join('\n');
    const pdf = new window.jspdf.jsPDF();
    pdf.text(pdfContent, 10, 10);
    pdf.save('url-list.pdf');
});


function updateUrlList() {
  const urlList = JSON.parse(localStorage.getItem('urlList') || '[]');
  const listElement = document.getElementById('url-list');
  listElement.innerHTML = '';

  urlList.forEach((url) => {
    const listItem = document.createElement('li');
    const urlLink = document.createElement('a');
    urlLink.href = url;
    urlLink.target = "_blank";
    urlLink.textContent = url;
    listItem.appendChild(urlLink)
    listElement.appendChild(listItem);
  });

  const deleteBtn = document.querySelector("#delete")
  deleteBtn.addEventListener("click", function() {
    listElement.innerHTML = ""
    localStorage.clear();
  }) ;
  

}

updateUrlList()
