async function loadRandom() {
  try {
    const gallery = document.getElementById('gallery');
    if (!gallery) {
      console.error('Gallery element not found');
      return;
    }
    gallery.innerHTML = '<p>Loading...</p>';
    const res = await fetch('https://api.artic.edu/api/v1/artworks?limit=9&fields=id,title,image_id');
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    gallery.innerHTML = '';
    if (data.data && data.data.length > 0) {
      for (let item of data.data) {
        if (item.image_id) {
          const imgUrl = `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`;
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<img src="${imgUrl}" alt="${item.title || 'Artwork'}"><h3>${item.title || 'Untitled'}</h3>`;
          gallery.appendChild(card);
        }
      }
    } else {
      gallery.innerHTML = '<p>No artworks found.</p>';
    }
  } catch (error) {
    console.error('Error loading random artworks:', error);
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.innerHTML = '<p>Error loading artworks. Please try again.</p>';
    }
  }
}

// Load on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRandom);
} else {
  loadRandom();
}