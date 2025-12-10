document.getElementById('searchForm').addEventListener('submit', async e => {
  e.preventDefault(); const q = document.getElementById('query').value; const gallery = document.getElementById('gallery'); gallery.innerHTML = '';
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${q}&limit=9`); const data = await res.json();
  for (let item of data.data) {
    const detailRes = await fetch(`https://api.artic.edu/api/v1/artworks/${item.id}?fields=id,title,image_id`); const detail = await detailRes.json();
    if (detail.data.image_id) {
      const imgUrl = `https://www.artic.edu/iiif/2/${detail.data.image_id}/full/400,/0/default.jpg`;
      const card = document.createElement('div'); card.className = 'card'; card.innerHTML = `<img src="${imgUrl}" alt="${item.title}"><h3>${item.title}</h3><a href="${item.api_link}" target="_blank">Details</a>`; gallery.appendChild(card);
    }
  }
});