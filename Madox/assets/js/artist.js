document.addEventListener('DOMContentLoaded', function() {
  const artistForm = document.getElementById('artistForm');
  if (!artistForm) {
    console.error('Artist form not found');
    return;
  }
  
  artistForm.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const artist = document.getElementById('artist').value;
      const gallery = document.getElementById('gallery');
      if (!gallery) {
        console.error('Gallery element not found');
        return;
      }
      gallery.innerHTML = '<p>Searching...</p>';
      const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(artist)}&limit=9`);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      gallery.innerHTML = '';
      if (data.data && data.data.length > 0) {
        for (let item of data.data) {
          try {
            const detailRes = await fetch(`https://api.artic.edu/api/v1/artworks/${item.id}?fields=id,title,image_id,artist_title`);
            if (detailRes.ok) {
              const detail = await detailRes.json();
              if (detail.data && detail.data.image_id) {
                const imgUrl = `https://www.artic.edu/iiif/2/${detail.data.image_id}/full/400,/0/default.jpg`;
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<img src="${imgUrl}" alt="${detail.data.title || 'Artwork'}"><h3>${detail.data.title || 'Untitled'}<br>by ${detail.data.artist_title || 'Unknown Artist'}</h3>`;
                gallery.appendChild(card);
              }
            }
          } catch (err) {
            console.error('Error fetching artwork details:', err);
          }
        }
        if (gallery.innerHTML === '') {
          gallery.innerHTML = '<p>No artworks found for this artist.</p>';
        }
      } else {
        gallery.innerHTML = '<p>No artworks found for this artist.</p>';
      }
    } catch (error) {
      console.error('Error searching for artist:', error);
      const gallery = document.getElementById('gallery');
      if (gallery) {
        gallery.innerHTML = '<p>Error searching. Please try again.</p>';
      }
    }
  });
});