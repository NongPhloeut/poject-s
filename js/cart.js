
const shopStorages = document.querySelector(".shop-storage");
const dom_dialog = document.querySelector("#product-dialog");
const payment_dialog = document.querySelector("#payment-dialog");

//=======================================fuction save in local stroage===================
// don't user parameters
// function saveProduct() {
    //     localStorage.setItem("carts", JSON.stringify(carts)); //save value in local
    //     // displayCart()
    //     window.location.reload();
    
    // }
let carts = [];
//=======================================fuction save in local stroage===================
function saveProduct(key,value) {
    localStorage.setItem(key, JSON.stringify(value)); //save value in local
    // window.location.reload();

}
function loadItem() {
    let listCarts = JSON.parse(localStorage.getItem("carts"));
    if (listCarts !== null) {
        carts = listCarts;
      // console.log(listOfProducts)
    }
  }
// let carts = JSON.parse(localStorage.getItem("carts")); // get value form local stroage
// console.log(carts)
      
//=======================================fuction hide=========================
function hide(element) {
    element.style.display = "none";
  }
  
  //=======================================duction show=======================
  function show(element) {
    element.style.display = "block";
  }


// //=======================================fuction get value form local storage=========================
let totalPriceRiel = 0 ;
let totalPriceUSD = 0 ;
// //=======================================fuction get value form local storage=========================
function displayCart(){
    // totalPrice = 0
    loadItem();
    for(let index = 0; index <carts.length ; index++) {
        let addToCart = carts[index];

        let cartProduct =  document.createElement("div");
        cartProduct.classList.add("card-product");
        cartProduct.dataset.index = index;
        // console.log(cartProduct);
        

        let imgProduct = document.createElement("div");
        imgProduct.classList.add("img-product");

        let img = document.createElement("img");
        img.src = addToCart.img

        imgProduct.appendChild(img);

        // describe
        let describe = document.createElement("h4");
        describe.textContent = addToCart.describe;
        // console.log(describe)
    

        let productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        
        let h1 = document.createElement("h3");
        let h2 = document.createElement("h3");
        h1.textContent = addToCart.name;
        h2.textContent = addToCart.price;
  
        let currency = addToCart.currency;
        // console.log(addToCart)
        if(currency !== "៛"){
            h2.textContent = currency + addToCart.usd;
            // console.log(h2)
        }
        else{
            h2.textContent = addToCart.riel + currency;
            // console.log(h2)
        }
     

        productPrice.appendChild(h1);
        productPrice.appendChild(h2);
        productPrice.appendChild(describe);

        // qty of product
        let input = document.createElement("input");
        input.type = "number";
        input.value = "qty";
        input.id = "input-qty";
        input.placeholder = "Qty";
        productPrice.appendChild(input);

        let checkButton = document.createElement("div");
        checkButton.classList.add("check-cancel");

        let buttonCancle = document.createElement("button");
        buttonCancle.id = "remove";
        buttonCancle.textContent = "Remove";

        buttonCancle.addEventListener("click", removeProduct);
        checkButton.appendChild(buttonCancle);


        cartProduct.appendChild(imgProduct);
        cartProduct.appendChild(productPrice);
        cartProduct.appendChild(checkButton);
        
        shopStorages.appendChild(cartProduct);
        
        hr = document.createElement("hr")

        shopStorages.appendChild(hr);


        // get key value for currency riel
        totalPriceRiel += parseInt(addToCart.riel);// form riel currency
        totalPriceUSD += parseInt(addToCart.usd);// form riel currency
    }  
     let total = document.getElementById("total-usd");
    total.textContent = "$"+totalPriceUSD ;
    let totalRiel = document.getElementById("total-riel");
    totalRiel.textContent =  totalPriceRiel + "៛";
}

//=======================================fuction remove=========================

// function removeProduct(event){

//     //  Get index
//     let index = event.target.parentElement.parentElement.dataset.index;
//     console.log(index);
//     // Remove product
//     carts.splice(index, 1);
//     // console.log(carts)
  
//     // Save to local storage
//     saveProduct("carts",carts);
//     //don't use parameters
//     // saveProduct();

//     // Update the view
//     displayCart()

// }
   
function removeAll() {
    // console.log(index)
    // let carts = JSON.parse(localStorage.getItem("carts")); 
    // JSON.parse(localStorage.clear("carts"));
}

//=======================================checkout=========================
function checkout() {
    show(dom_dialog);
}
function paymenet() {
    hide(dom_dialog);
    show(payment_dialog);
    
}
function pay() {

    Swal.fire(
        'Success!',
        'You clicked the button!',
        'success'
        )
        
    hide(payment_dialog);
    // removeAll();
}


let btnOder = document.querySelector("#check-add");

//=======================================fuction get value form local storage=========================
function removeProduct(event){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {

            let index = event.target.parentElement.parentElement.dataset.index;
            console.log(index);
            // Remove product
            carts.splice(index, 1);
            console.log(carts)
            // Save to local storage
            saveProduct("carts",carts);
            //don't use parameters
            // Update the view
            displayCart();
            
           

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
  }
//=======================================fuction get value form local storage=========================

displayCart();

loadItem();