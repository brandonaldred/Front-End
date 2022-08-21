const productImages = document.querySelector('.product-thumbnails').querySelectorAll('IMG');
const changeImg = document.querySelector('.photo-scroll').querySelectorAll('BUTTON');
const mainPhoto = document.querySelector('.main-photo');


for (image of productImages) {
    image.addEventListener('click', (e) => {
        mainPhoto.src = `images/image-${e.target.dataset.product}.jpg`;
        for (image of productImages) {
            image.classList.remove('thumbnail-selected');
        }
        e.target.classList.add('thumbnail-selected');
    });

}

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