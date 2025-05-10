console.log(sessionStorage.getItem("product"));
let obj = JSON.parse(sessionStorage.getItem("product"));
console.log(obj);

let product_title = document.getElementById("product-title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let img = document.getElementById("img");
let btnPlus=document.getElementById("btnPlus")
let btnMinus=document.getElementById("btnMinus")
let quantitySpan=document.getElementById("quantitySpan")


product_title.textContent = obj.name;
price.textContent = obj.price;
description.textContent = obj.description;
img.src = obj.imageUrl;

btnPlus.addEventListener("click", function () {
  let currentCount = Number(quantitySpan.textContent);
  currentCount++;
  quantitySpan.textContent = currentCount;

});

btnMinus.addEventListener("click", function () {
  let currentCount = Number(quantitySpan.textContent);
  if (currentCount == 1) {
    return;
  }
  currentCount--;
  quantitySpan.textContent = currentCount;

}
);

////////////////////////////////////////////////////////////////

let product_details=document.getElementById("product-details")

product_details.addEventListener("click",function(e){

 let check = e.target;
let parentElem = check.parentElement;
  let children = parentElem.children; 


 if(check.classList.contains("add-to-cart")){




  if(sessionStorage.getItem("loginCustomerUsername")!=null){
    
    
  let data=JSON.parse(sessionStorage.getItem("loginCustomerUsername"))
 
  

  fetch("http://localhost:3000/orders")
  .then((response) => response.json())
  .then((user) => {

    const orderExistsr = user.some(u => u.customer_user_name === data.Username && u.product_id === obj.id);

    if(orderExistsr){



        
      console.log("good")
    }else{
      console.log("bad")


      orderpush={
    customer_email:data.Email,
    customer_user_name:data.Username,
    product_id:obj.id,
    product_name:obj.name,
    product_count:quantitySpan.textContent,
    unit_price:obj.price ,
    total_price: String(Number(obj.price) * quantitySpan.textContent) ,
    currency:"EGP",
    order_date:new Date(),
    shipping_address:"789 Desert Rd,Riyadh,KSA",
    payment_method:"paypal",
    order_status:"",
    sellerUsername:obj.sellerUsername

  }

  console.log(orderpush)

     return fetch('http://localhost:3000/orders', {
                        method: "POST",
                        body: JSON.stringify(orderpush)
                    });
      


    }

  })


  
  }else{

   
    let body=document.body

      let cartover=document.createElement("div")
      cartover.setAttribute("id","cartover")
      cartover.classList.add("cartOverlay")

      body.appendChild(cartover)

      let carmodel=document.createElement("div")
      carmodel.setAttribute("id","carmodel")
      carmodel.classList.add("cartModal")
      
      let header=document.createElement("header")
      header.classList.add("header")

      let head=document.createElement("h1")
      let texthead=document.createTextNode("You should be login")
      head.appendChild(texthead)
      header.appendChild(head)
      // carmodel.appendChild(head)


      let btnx=document.createElement("button")
      btnx.setAttribute("id","buttoncencel")
      btnx.classList.add("headerclose")
      let btnxcontaint=document.createElement("i")
      btnxcontaint.classList.add("fa-solid","fa-xmark")

      btnx.appendChild(btnxcontaint)
      // let icon
      // carmodel.appendChild(btnx)

      header.appendChild(btnx)

      carmodel.appendChild(header)

      let footer=document.createElement("footer")
       let btnlogin=document.createElement("button")
      btnlogin.setAttribute("id","buttonlogin")
      btnlogin.classList.add("addproduct")

      let text_btnlogin= document.createTextNode("Log in")
      btnlogin.appendChild(text_btnlogin)
      footer.appendChild(btnlogin)

       carmodel.appendChild(footer)

      body.appendChild(carmodel)

      /// fun to cencel
      let btnc=document.getElementById("buttoncencel")
      btnc.addEventListener("click",function(){
        let overlay=document.getElementById("cartover")
        let model=document.getElementById("carmodel")
        overlay.remove()
        model.remove()
      })

      ///fun to go to login
      let btnlog=document.getElementById("buttonlogin")
      btnlog.addEventListener("click",function(){
        window.location.href="../html/login.html"
      })




  }


 }

})






