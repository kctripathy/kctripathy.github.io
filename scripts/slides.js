function runSlides() {
     const mainImage = document.getElementById('main-image');
     const caption = document.getElementById('image-caption');
     const thumbnails = document.querySelectorAll('#thumbnails img');

     let currentIndex = 0;



    // Optional autoplay
    setInterval(() => {
        thumbnails[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % thumbnails.length;
        const nextThumb = thumbnails[currentIndex];
        nextThumb.classList.add('active');
        mainImage.src = nextThumb.src;
        mainImage.alt = nextThumb.alt;
        caption.textContent = nextThumb.alt;
    }, 4000);
}

function showImage(thumb) {

    const mainImage = document.getElementById('main-image');
    const caption = document.getElementById('image-caption');
    const thumbnails = document.querySelectorAll('#thumbnails img');

    
    thumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.src;
    mainImage.alt = thumb.alt;
    caption.textContent = thumb.alt;
    currentIndex = Array.from(thumbnails).indexOf(thumb);
}