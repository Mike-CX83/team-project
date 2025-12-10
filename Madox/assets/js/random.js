async function loadRandom() {
  const gallery = document.getElementById('gallery'); gallery.innerHTML = '';
  const res = await fetch('https://api.artic.edu/api/v1/artworks?limit=9&fields=id,title,image_id'); const data = await res.json();
  for (let item of data.data) {
    if (item.image_id) {
      const imgUrl = `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`;
      const card = document.createElement('div'); card.className = 'card'; card.innerHTML = `<img src="${imgUrl}" alt="${item.title}"><h3>${item.title}</h3>`; gallery.appendChild(card);
    }
  }
}
loadRandom();