// let adcart="add-to-cart"
   let productgrid = document.getElementById("product-grid"); 
const productshow=function(users,num){
    // console.log(num)

     for (let i = 0; i <= num; i++) {
      let divcon = document.createElement("div");
      divcon.classList.add("product-card");

      let divim = document.createElement("div");
      divim.classList.add("product-image","show");
      divcon.appendChild(divim);

      let img = document.createElement("img");
      img.classList.add("show")
      img.src = `${users[i].imageUrl}`;
      img.alt = "product5";
      divim.appendChild(img);

      let headp = document.createElement("h3");
       headp.classList.add("show")
      let text = document.createTextNode(users[i].name);
      headp.appendChild(text);

      divcon.appendChild(headp);

      let par = document.createElement("p");
      par.classList.add("show")
      let textp = document.createTextNode(users[i].price);
      par.appendChild(textp);

      divcon.appendChild(par);

      let btn = document.createElement("button");
      btn.classList.add("add-to-cart");

      btn.textContent = "Add to Cart";
      divcon.appendChild(btn);

      let span=document.createElement("p")
      span.setAttribute("id","id")
      let textspan= document.createTextNode(users[i].id);
      span.appendChild(textspan)
      divcon.appendChild(span);

      let span2=document.createElement("p")
      span2.setAttribute("id","d")
      let textspan2= document.createTextNode(users[i].sellerUsername);
      span2.appendChild(textspan2)
       divcon.appendChild(span2);




      productgrid.appendChild(divcon);

    }

 




}

productgrid.addEventListener("click",function(e){

 let check = e.target;
let parentElem = check.parentElement;
  let children = parentElem.children; 


 if(check.classList.contains("add-to-cart")){

  // console.log(check.textContent)


  // if(check.textContent== "Add to Cart"){
  //   console.log("good")
  //   check.textContent="Added"
  //   check.style.backgroundColor="#5ad8c5"
  // }else{
  //   console.log("bad")
  // }


  if(sessionStorage.getItem("loginCustomerUsername")!=null){
    
    
  let data=JSON.parse(sessionStorage.getItem("loginCustomerUsername"))
 
  

  fetch("http://localhost:3000/orders")
  .then((response) => response.json())
  .then((user) => {

    const orderExistsr = user.some(u => u.customer_user_name === data.Username && u.product_id === children[4].textContent);
    if(orderExistsr){
      console.log("good")
    }else{
      console.log("bad")


      obj={
    customer_email:data.Email,
    customer_user_name:data.Username,
    product_id:children[4].textContent,
    product_name:children[1].textContent,
    product_count:"1",
    unit_price:children[2].textContent ,
    total_price:children[2].textContent ,
    currency:"EGP",
    order_date:new Date(),
    shipping_address:"789 Desert Rd,Riyadh,KSA",
    payment_method:"paypal",
    order_status:"",
    sellerUsername:children[5].textContent 
  }

  console.log(obj)

     return fetch('http://localhost:3000/orders', {
                        method: "POST",
                        body: JSON.stringify(obj)
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







    // console.log("you should be login")

  }


 }
 else if(check.classList.contains("show")){
  // window.location.href="../html/cart.html"
  console.log(children[4].textContent)

  fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((user) => {

    const productmatch = user.find(u=>u.id ===children[4].textContent);
    console.log(productmatch)

  })


  // let product_title=document.getElementById("product-title")
  // console.log(product_title)
  // product_title.textContent="hager"
 }
})

