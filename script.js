/*
function check_me(e) {
//console.log('hi');
  e.preventDefault();
var xy = e.target.id;//console.log(e.target);
//console.log(e.target.id);
var xy1 = document.getElementById(xy);
var dell = document.querySelector(".cart-items");
if(xy1.innerText != "item added")
{var integer = parseInt(dell.innerText, 10);
integer++;
dell.innerText = integer.toString();
xy1.innerText = "item added";
xy1.style.backgroundColor = 'rgba(50,90,180,0.5)';
}

}*/
var mod = document.getElementById('modal');
var close1 = document.getElementById('r2');
var bt = document.getElementById('but');

bt.addEventListener('click', open);
close1.addEventListener('click', close);
function open() {
  mod.style.display = 'block';
}

function close() {
  mod.style.display = 'none';
}

let cartmain =[];
let buDOM=[];
var cartdisplay = document.querySelector(".cartdisplay");
var cancel = document.querySelector("#cut");

var cart = document.querySelector(".cart");
var main = document.querySelector(".main");

cart.addEventListener('click',show);
cancel.addEventListener('click',cut);
function show() {

cartdisplay.style.visibility = 'visible';
main.style.opacity = '0.5';
}
function cut(){
  cartdisplay.style.visibility = 'hidden';
  main.style.opacity = '1';
}
class Products{
  async getProducts(){
    try{
      let result = await fetch("products.json");
      let data = await result.json();//console.log(data);
      let products = data.items;//console.log(products);
      products = products.map(item =>{

         const title = item.title;
          const id = item.id;
           const price = item.price;
            const image = item.image;
            return {title,id,price,image};
      })
      return products;
    }
    catch(error){
      console.log(error);
    }
  }
}
class UI{
  displayproducts(products){
    console.log(products);let result="";
    products.forEach(product => {

result += `
<article class ="token">
<div class ="imagewrap">
<img src =${product.image} class="bed">
<button value="click me" class ="bag-btn" data-id =${product.id} id=${product.id}><i class="fas fa-cart-plus"></i>add to bag </button></div></article>
`;
    });
const center = document.querySelector('.product-center');
center.innerHTML = result;


  }
  getBagButtons(){
   const bgs = [...document.querySelectorAll(".bag-btn")];
   buDOM = bgs;
   bgs.forEach(bg=> {
       let id = bg.dataset.id;console.log(id);
       let inCart = cartmain.find(item => item.id === id);
       if(inCart){
         bg.innerText = 'In Cart';
         bg.disabled = true
       }
       else{
         bg.addEventListener('click',(event)=>{
           event.target.innerText = "In Cart";
           event.target.disabled ="true";
           var dell = document.querySelector(".cart-items");
           var integer = parseInt(dell.innerText, 10);
           integer++;
           dell.innerText = integer.toString();
           let car = Storage.getProduct(id);

          console.log(car);
         })
       }
   });

  }

}
class Storage{
  static saveProducts(products){
     localStorage.setItem("products",JSON.stringify(products));
  }
  static getProduct(id){
    let products=JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id===id)
  }
}
document.addEventListener("DOMContentLoaded",()=>{
  const ui = new UI();
  const products = new Products();
  products.getProducts().then(data =>{
  ui.displayproducts(data);
Storage.saveProducts(data)
}).then(()=> {
  ui.getBagButtons();
});
});
