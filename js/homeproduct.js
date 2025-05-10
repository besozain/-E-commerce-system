// let productgrid = document.getElementById("product-grid"); 
let users=[]
fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    users=data.filter(ele=>ele.approve=="true")
    console.log(users);
    if(users.length>7){
      productshow(users,users.length)


    }else{
      productshow(users,users.length)

    }
    

  });

   ////////////////////////////////
// productgrid.addEventListener("click",function(e){

//  let check = e.target;
//  if(check.classList.contains("add-to-cart")){

//   let data=JSON.parse(sessionStorage.getItem("loginCustomerUsername"))
 
//   let parentElem = check.parentElement;
//   let children = parentElem.children; 


//   obj={
//     customer_email:data.Email,
//     customer_user_name:data.Username,
//     product_name:children[4].textContent,
//     product_name:children[1].textContent,
//     product_count:"1",
//     total_price:children[2].textContent ,
//     currency:"EGP",
//     order_date:new Date(),
//     shipping_address:"789 Desert Rd,Riyadh,KSA",
//     payment_method:"paypal",
//     order_status:"processing",
//     sellerUsername:children[5].textContent 
//   }

//   console.log(obj)

//      return fetch('http://localhost:3000/products', {
//                         method: "POST",
//                         body: JSON.stringify(obj)
//                     });
//  }
// })
   
// ////////////////////////////////
// productgrid.addEventListener("click",function(e){
// // console.log(e.target)
//  let check = e.target;
//  if(check.classList.contains("add-to-cart")){
//   console.log("good")
//   let data=JSON.parse(sessionStorage.getItem("loginCustomerUsername"))
//   // console.log(data.Email)
//   // console.log(data.Username)
//   console.log(data)
//   let parentElem = check.parentElement;
//   let children = parentElem.children; 
//   console.log(children)
//   console.log(children[1].textContent   )
//   console.log(children[2].textContent   )

//   console.log(children[4].textContent )
//   let currentDate = new Date();
// console.log(currentDate)
// console.log(data.sellerUsername)

// // data.
// // sellerUsername

//   obj={
//     customer_email:data.Email,
//     customer_user_name:data.Username,
//     product_name:children[4].textContent,
//     product_name:children[1].textContent,
//     product_count:"1",
//     total_price:children[2].textContent ,
//     currency:"EGP",
//     order_date:new Date(),
//     shipping_address:"789 Desert Rd,Riyadh,KSA",
//     payment_method:"paypal",
//     order_status:"processing",
//     sellerUsername:data.sellerUsername


//   }
//   console.log(obj)
//  }
// })