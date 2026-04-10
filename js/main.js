
$(document).ready(function(){
    $('.slider').slick({
    //   setting-name: setting-value
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:'.slide_to_left',
    nextArrow:'.slide_to_right',
    autoplay:true,
    autoplayspeed:3000,
    responsive: [
      {
        breakpoint:1024,
        settings:{
          slidesToShow: 2,
          slidesToScroll: 1,
          prevArrow:false,
          nextArrow:false
        }
      },
      {
        breakpoint:768,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:false,
          nextArrow:false,
        }
      }
    ]
    });
  });

  let toTop = document.querySelector(".scroll_to_top")
  
  window.onscroll=function(){
    if(window.scrollY > 800){
      toTop.style.display="flex";
    }else{
    toTop.style.display="none";
    }
  }

  toTop.addEventListener("click" , x=>{
    window.scrollTo({
    top:0 ,
    behavior:'smooth'
  })
})

let icon_toggler = document.querySelector(".fa-bars")
let menu_toggle = document.querySelector('nav .down_nav ul')
let openCart=document.querySelector(".fa-cart-shopping")
let closeCart=document.querySelector(".fa-circle-xmark")
let shoppingCart=document.querySelector(".cart")

icon_toggler.addEventListener('click' , function(){
  this.classList.toggle('open')
  menu_toggle.classList.toggle('open')
})

openCart.addEventListener('click' ,function(){
  shoppingCart.classList.add('open')

})
closeCart.addEventListener('click' ,function(){
  shoppingCart.classList.remove('open')

})

// Render Products in HTML
let container = document.querySelector(".top_products .container");
let cart_container = document.querySelector('.cart .container')
let cartLength =document.querySelector('.cartLength')
let totallPrice=document.querySelector(".totallprice")
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


let cart // indefined
if(localStorage.getItem('cart') ==null ){
    cart = [] //empty []
}else{
    cart = JSON.parse(localStorage.getItem('cart')) //[{values}]
}
//  in addtocart i ==number
function addToCart(number){
    //to add object in array 
    cart.push(products[number])
    localStorage.setItem('cart', JSON.stringify(cart))
    displayProducts()
}

function displayProducts(){
    var item =''
    let totall = 0
    //aminimus funcation
    cart.map((val ,index )=>{
        totall +=val.price
        item+=` 
        <div class="card">
            <img src=" ${val.img}" alt="">
            <div>
                <b> ${val.name}</b>
                <p> $${val.price}</p>
            </div>
            <div>
                <button>+</button>
                <span>0</span>
                <button>-</button>
            </div>
            <i onclick='deleteProduct(${index})' class="fa-solid fa-trash"></i>
        </div>
            `
    })
    cartLength.innerHTML= cart.length
    totallPrice.innerHTML=`$${totall.toFixed(3)}`

    if(cart.length > 0){
        cart_container.innerHTML =item
        cartLength.style.color = 'var(--main--color)'
    }else{
        cart_container.innerHTML='Your Cart Is Empthy'
        cart_container.style.textAlign='center'
        cartLength.style.color = 'red'
    }
}
displayProducts()

function deleteProduct(number){
    cart.splice(number ,1)
    localStorage.setItem('cart', JSON.stringify(cart))
    displayProducts()
}