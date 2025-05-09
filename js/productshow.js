const productshow=function(users,num){
    console.log(num)

     for (let i = 0; i <= num; i++) {
      let divcon = document.createElement("div");
      divcon.classList.add("product-card");

      let divim = document.createElement("div");
      divim.classList.add("product-image");
      divcon.appendChild(divim);

      let img = document.createElement("img");
      img.src = `${users[i].imageUrl}`;
      img.alt = "product5";
      divim.appendChild(img);

      let headp = document.createElement("h3");
      let text = document.createTextNode(users[i].name);
      headp.appendChild(text);

      divcon.appendChild(headp);

      let par = document.createElement("p");
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

let productgrid = document.getElementById("product-grid"); 


productgrid.addEventListener("click",function(e){

 let check = e.target;
 if(check.classList.contains("add-to-cart")){

  let data=JSON.parse(sessionStorage.getItem("loginCustomerUsername"))
 
  let parentElem = check.parentElement;
  let children = parentElem.children; 


  obj={
    customer_email:data.Email,
    customer_user_name:data.Username,
    product_name:children[4].textContent,
    product_name:children[1].textContent,
    product_count:"1",
    total_price:children[2].textContent ,
    currency:"EGP",
    order_date:new Date(),
    shipping_address:"789 Desert Rd,Riyadh,KSA",
    payment_method:"paypal",
    order_status:"processing",
    sellerUsername:children[5].textContent 
  }

  console.log(obj)

     return fetch('http://localhost:3000/products', {
                        method: "POST",
                        body: JSON.stringify(obj)
                    });
 }
})