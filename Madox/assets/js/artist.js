document.getElementById('artistForm').addEventListener('submit', async e => {
  e.preventDefault(); const artist = document.getElementById('artist').value; const gallery = document.getElementById('gallery'); gallery.innerHTML = '';
  const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artist}&limit=9`); const data = await res.json();
  for (let item of data.data) {
    const detailRes = await fetch(`https://api.artic.edu/api/v1/artworks/${item.id}?fields=id,title,image_id,artist_title`); const detail = await detailRes.json();
    if (detail.data.image_id) {
      const imgUrl = `https://www.artic.edu/iiif/2/${detail.data.image_id}/full/400,/0/default.jpg`;
      const card = document.createElement('div'); card.className = 'card'; card.innerHTML = `<img src="${imgUrl}" alt="${item.title}"><h3>${detail.data.title}<br>by ${detail.data.artist_title}</h3>`; gallery.appendChild(card);
    }
  }
});