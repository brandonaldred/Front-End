/* Code to handle mobile menu*/
const hamburger = document.querySelector('.closed');
hamburger.addEventListener('click', (e) => { openMenu(e); });

function openMenu(e) {
    e.target.removeEventListener('click', openMenu);
    const header = document.getElementsByTagName('HEADER');
    header[0].insertAdjacentHTML('afterbegin', '<div id="menu-open"></div>');
    const nav = document.getElementsByTagName('NAV');
    nav[0].className = 'mobile-menu';
    hamburger.src ="images/icon-close.svg";
    hamburger.className ="open";
    hamburger.addEventListener('click', () => { closeMenu(); });
}

function closeMenu() {
    e.target.removeEventListener('click', closeMenu);
    const bg = document.getElementById('menu-open');
    const nav = document.getElementsByTagName('NAV');
    nav[0].className = '';
    document.querySelector('.open').src ="images/icon-menu.svg";
    hamburger.addEventListener('click', (e) => { openMenu(e); });
}











/* Code to handle cart pop up */
const cartButton = document.querySelector('.shopping-cart');
const cartContents = document.getElementById('cart-contents');

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
    //If not, add cart-item
    if (!exists) {
        document.querySelector('.cart-items').appendChild(buildCartItem(product,title,qty,price));
    } else {
       const cartItems = document.querySelectorAll('.cart-item');
       for (item of cartItems) {
            if (item.dataset.product == product){ 
                let itemTitle = document.querySelector('P');
                let oldQuantity = item.dataset.qty;
                qty = parseInt(qty) + parseInt(oldQuantity);
                itemTitle.innerHTML = title + '</br>$' + price + ' x ' + qty + '<b> $' + (parseInt(qty) * parseInt(price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); + '</b>';
                item.dataset.qty = qty;
             }
        }
    }
    document.querySelector('.shopping-cart').dataset.items = qty;
    cartContents.className = 'cart-contents';
    setTimeout(() => { 
        cartContents.className = 'hide ' }, '1800');

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
    itemTitle.innerHTML = title + '</br>$' + price + ' x ' + qty + '<b> $' + (parseInt(qty) * parseInt(price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); + '</b>';

    let removeItem = document.createElement('IMG');
    removeItem.src = 'images/icon-delete.svg';
    removeItem.className = 'cart-remove';
    removeItem.setAttribute('alt', `Remove ${title} from cart`);

    cartItem.appendChild(itemImg);
    cartItem.appendChild(itemTitle);
    cartItem.appendChild(removeItem);
    
    return cartItem;

}

/* E/O Code to handle cart pop up */


//Photo Scrolling Selecting All Elements
const productImages = document.querySelector('.product-thumbnails').querySelectorAll('IMG');
const changeImg = document.querySelector('.photo-scroll').querySelectorAll('BUTTON');
const mainPhoto = document.querySelector('.main-photo');
const addToCart = document.querySelector('.add-to-cart')



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

addToCart.addEventListener('click', () => {
    const content = document.querySelector('.content');
    const qty = document.querySelector('.qty').innerText;
    addCartItem(content.dataset.sku, content.dataset.title, qty, content.dataset.price);
});


//adjust product qty
const decreaseQty = document.querySelector('.sub-qty');
const increaseQty = document.querySelector('.add-qty');

decreaseQty.addEventListener('click', () => {
    const qty = document.querySelector('.qty').querySelector('.number');
    let number = parseInt(qty.innerText)
    if(number > 1) { qty.innerText = number - 1;  }
});

increaseQty.addEventListener('click', () => {
    const qty = document.querySelector('.qty').querySelector('.number');
    let number = parseInt(qty.innerText)
    if(number <= 9) { qty.innerText = number + 1;  }
});
