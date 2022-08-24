//Photo Scrolling Selecting All Elements
const productImages = document.querySelector('.product-thumbnails').querySelectorAll('IMG');
const changeImg = document.querySelector('.photo-scroll').querySelectorAll('BUTTON');
const mainPhoto = document.querySelector('.main-photo');


//Desktop Photo Selection
for (image of productImages) {
    image.addEventListener('click', (e) => {
        mainPhoto.src = `images/image-${e.target.dataset.product}.jpg`;
        for (image of productImages) {
            image.classList.remove('thumbnail-selected');
        }
        e.target.classList.add('thumbnail-selected');
    });

}

//Mobile Photo Scrolling
for (let i = 0; i < changeImg.length; i++) {
    changeImg[i].addEventListener('click', () => {
        if (changeImg[i].dataset.next == 'true') {
            if (parseInt(mainPhoto.dataset.photo) < productImages.length) {
                mainPhoto.dataset.photo = parseInt(mainPhoto.dataset.photo) + 1;
                mainPhoto.src = `images/image-product-${mainPhoto.dataset.photo}.jpg`;
                
            }
        } else {
            if (parseInt(mainPhoto.dataset.photo) > 1) {
                mainPhoto.dataset.photo = parseInt(mainPhoto.dataset.photo) - 1;
                mainPhoto.src = `images/image-product-${mainPhoto.dataset.photo}.jpg`;
            }
        }
    })
}


//Lightbox Elements
const lightboxClose = document.querySelector('.close-lightbox');
const lightboxPhotoContainer = document.getElementById('lightbox-photo-container');
lightboxClose.addEventListener('click',() => {
    document.getElementById('lightbox').style.display = 'none';
    lightboxPhotoContainer.innerHTML = '';

});

mainPhoto.addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'flex';
    const photoContainer = document.querySelector('.photo-container');
    lightboxPhotoContainer.appendChild(photoContainer.cloneNode(true));
});
