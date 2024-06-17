document.addEventListener('DOMContentLoaded', function() {
    function loadGallery(galleryId, photoPrefix, photoCount, galleryTitle) {
        const gallery = document.getElementById(galleryId);
        const photoExtension = '.jpg';
        const images = [];

        for (let i = 1; i <= photoCount; i++) {
            const img = document.createElement('img');
            img.src = `${photoPrefix}${i}${photoExtension}`;
            img.alt = `${galleryTitle} ${i}`;
            img.classList.add('zoomable'); // Add zoomable class to each image
            gallery.appendChild(img);
            images.push(img);
        }

        // Modal functionality
        let currentIndex = 0;
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        function showImage(index) {
            if (index >= 0 && index < images.length) {
                currentIndex = index;
                modalImg.src = images[currentIndex].src;
                modal.style.display = 'block';
            }
        }

        gallery.addEventListener('click', function(event) {
            if (event.target.tagName === 'IMG') {
                const index = images.indexOf(event.target);
                showImage(index);
            }
        });

        closeModal.addEventListener('click', function() { 
            modal.style.display = 'none';
        });

        prev.addEventListener('click', function() {
            showImage(currentIndex - 1);
        });

        next.addEventListener('click', function() {
            showImage(currentIndex + 1);
        });

        // Close the modal when the user clicks anywhere outside of the modal content
        modal.addEventListener('click', function(event) {
            if (event.target === modal || event.target === closeModal) {
                modal.style.display = 'none';
            }
        });

        // Add event listener for keydown to navigate images with arrow keys
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    showImage(currentIndex - 1);
                } else if (event.key === 'ArrowRight') {
                    showImage(currentIndex + 1);
                } else if (event.key === 'Escape') {
                    modal.style.display = 'none';
                }
            }
        });
    }

    // Load the side alleys gallery if the corresponding div is found
    if (document.getElementById('photo-gallery')) {
        loadGallery('photo-gallery', 'images/side-alleys/side_alleys_TO_May_6_2023-', 26, 'Side Alley');
    }

    // Load the trees of Toronto gallery if the corresponding div is found
    if (document.getElementById('photo-gallery-trees')) {
        loadGallery('photo-gallery-trees', 'images/trees/ToT-', 9, 'Trees of Toronto');
    }

    // Load the photos of the paramo gallery if the corresponding div is found
    if (document.getElementById('photo-gallery-paramo')) {
        loadGallery('photo-gallery-paramo', 'images/paramo/paramo-', 18, 'Paramo');
    }

    // Load the photos of the santa marta gallery if the corresponding div is found
    if (document.getElementById('photo-gallery-marta')) {
        loadGallery('photo-gallery-marta', 'images/santa-marta/mar-', 6, 'Santa-Marta');
    }
});
