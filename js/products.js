// Scroll to Top Button
let toTop = document.querySelector(".scroll_to_top");
if (toTop) {
    window.onscroll = function () {
        if (window.scrollY > 800) {
            toTop.style.display = "flex";
        } else {
            toTop.style.display = "none";
        }
    };

    toTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Menu Toggle
let icon_toggler = document.querySelector(".fa-bars");
let menu_toggle = document.querySelector("nav .down_nav ul");
// Shopping Cart Toggle
let openCart = document.querySelector(".fa-cart-shopping");
let closeCart = document.querySelector(".fa-circle-xmark");
let shoppingCart = document.querySelector(".cart");
// Render Products in HTML
let container = document.querySelector(".top_products .container");
let cart_container = document.querySelector('.cart .container')
let cartLength = document.querySelector('.cartLength')
let totallPrice = document.querySelector(".totallprice")

if (icon_toggler && menu_toggle) {
    icon_toggler.addEventListener("click", function () {
        this.classList.toggle("open");
        menu_toggle.classList.toggle("open");
    });
}

if (openCart && shoppingCart) {
    openCart.addEventListener("click", function () {
        shoppingCart.classList.add("open");
    });
}

if (closeCart && shoppingCart) {
    closeCart.addEventListener("click", function () {
        shoppingCart.classList.remove("open");
    });
}

// Products Data
let products = [
    { id: 1, img: "img/icone.png", name: "Product One", price: 30 },
    { id: 2, img: "img/plate-1.png", name: "Product Two", price: 45 },
    { id: 3, img: "img/plate-2.png", name: "Product Three", price: 28 },
    { id: 4, img: "img/plate-3.png", name: "Product Four", price: 28 },
    { id: 5, img: "img/food-table.jpg", name: "Product Five", price: 35 },
    { id: 6, img: "img/jars.jpg", name: "Product Six", price: 40 },
    { id: 7, img: "img/cupcake.png", name: "Product Seven", price: 45 },
    { id: 8, img: "img/donut-transparent.png", name: "Product Eight", price: 50 },
    { id: 9, img: "img/food-table.jpg", name: "Product Nine", price: 55 },
    { id: 10, img: "img/coffee.jpg", name: "Product Ten", price: 60 },
];

function setItemsOnHtml() {
    if (!container) {
        console.error("Container not found!");
        return;
    }

    let items = "";
    for (let i = 0; i < products.length; i++) {
        items += `
        <div class="card">
            <div>
                <img src="${products[i].img}" alt="${products[i].name}">
            </div>
            <div class="card_details">
                <b>${products[i].name}</b>
                <p>$${products[i].price}.00</p>
                <button onclick='addToCart(${i})'>Add To Cart</button>
            </div>
        </div>
        `;
    }
    container.innerHTML = items;
}
setItemsOnHtml();

let cart
if (localStorage.getItem('cart') == null) {
    cart = []
} else {
    cart = JSON.parse(localStorage.getItem('cart'))
    displayProducts()
}

function addToCart(number) {
    let existingProduct = cart.find(item => item.id === products[number].id);
    if (existingProduct) {
        showModal("المنتج موجود بالفعل في السلة");
    } else {
        let productToAdd = { ...products[number], quantity: 1 };
        cart.push(productToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayProducts();
        showModal("تمت إضافة المنتج للسلة", "success");
    }

}


// Display Cart
function displayProducts() {
    var item = ''
    let totall = 0
    cart.map((val, index) => {
        totall += val.price * val.quantity;
        item += `
        <div class="card">
            <img src="${val.img}" alt="">
            <div>
                <b>${val.name}</b>
                <p>$${val.price}</p>
            </div>
            <div>
                <button onclick="increaseQuantity(${index})">+</button>
                <span>${val.quantity}</span>
                <button onclick="decreaseQuantity(${index})">-</button>
            </div>
            <i onclick='deleteProduct(${index})' class="fa-solid fa-trash"></i>
        </div>
        `
    })
    cartLength.innerHTML = cart.length
    totallPrice.innerHTML = `$${totall.toFixed(3)}`

    if (cart.length > 0) {
        cart_container.innerHTML = item
        cartLength.style.color = "var(--main--color)"
    } else {
        cart_container.innerHTML = 'Your Cart Is Empty'
        cart_container.style.textAlign = 'center'
        cartLength.style.color = 'red'
    }
}
displayProducts()

// Increase Quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayProducts();
}

// Decrease Quantity
function decreaseQuantity(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayProducts();
}

// Delete Product
function deleteProduct(number) {
    cart.splice(number, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    displayProducts()
}

function showModal(message, type = "") {
    let modal = document.getElementById("customModal");
    let modalMessage = document.getElementById("customModalMessage");
    let modalContent = document.getElementById("customModalContent");

    modalMessage.innerHTML = message;

    // remove any previous class
    modalContent.classList.remove("success");

    if (type === "success") {
        modalContent.classList.add("success");
    }

    modal.style.display = "flex";

    setTimeout(() => {
    modal.style.display = "none";
    }, 1500);
}



