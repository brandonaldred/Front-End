//Photo Scrolling Selecting All Elements
const productImages = document.querySelector('.product-thumbnails').querySelectorAll('IMG');
const changeImg = document.querySelector('.photo-scroll').querySelectorAll('BUTTON');
const mainPhoto = document.querySelector('.main-photo');
const cartButton = document.querySelector('.shopping-cart');
const cartContents = document.getElementById('cart-contents');



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
lightboxClose.addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
    lightboxPhotoContainer.innerHTML = '';

});

mainPhoto.addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'flex';
    const photoContainer = document.querySelector('.photo-container');
    lightboxPhotoContainer.appendChild(photoContainer.cloneNode(true));
});


//Hide or Show Shopping Cart
cartButton.addEventListener('click', () => {
    cartContents.className == 'hide' ? cartContents.className = 'cart-contents' : cartContents.className = 'hide';
})

//Add Items to Shopping Cart (product, qty, img, price)
function addCartItem(product, title, qty, price) {
    //Is cart empty? If so, remove empty-cart-text & add cart-item
    let exists = false;
    if (cartContents.querySelector('.empty-cart-text')) {
        cartContents.querySelector('.empty-cart-text').remove()
    }
    //If cart is not empty, Check current cart items, does what we're adding exist?
    if (cartContents.querySelector('.cart-item')) {
        let cart = cartContents.querySelectorAll('.cart-item');
        for (item of cart) {
            product == item.dataset.product ? exists = true : exists = false
        }
    }
    //If it does, update qty & price
    console.log(exists);
    //If not, add cart-item
    if (!exists) { document.querySelector('.cart-items').appendChild(buildCartItem(product,title,qty,price)); }

}

function buildCartItem (product, title, qty, price) {
    let cartItem = document.createElement('DIV');
    cartItem.className = 'cart-item';
    cartItem.dataset.product = product;
    cartItem.dataset.qty = qty;
    cartItem.dataset.price = price;

    let itemImg = document.createElement('IMG');
    itemImg.className = 'cart-thumbnail';
    itemImg.src = `images/image-${product}-thumbnail.jpg`;
    itemImg.setAttribute('alt', title);

    let itemTitle = document.createElement('P');
    itemTitle.innerHTML = title + '</br>$' + price + ' x ' + qty + '<b> $' + (qty * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); + '</b>';

    let removeItem = document.createElement('IMG');
    removeItem.src = 'images/icon-delete.svg';
    removeItem.className = 'cart-remove';
    removeItem.setAttribute('alt', `Remove ${title} from cart`);

    cartItem.appendChild(itemImg);
    cartItem.appendChild(itemTitle);
    cartItem.appendChild(removeItem);
    return cartItem;

}
addCartItem('product-1', 'sneakers', 8, 150);
addCartItem('product-8', 'shirts', 1, 15);
