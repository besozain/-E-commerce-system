let productgrid = document.getElementById("product-grid");

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
    
productshow(users,users.length)
   


  });

// let productgrid = document.getElementById("product-grid");
// const showproduct=function(num){

// }
// fetch("http://localhost:3000/products")
//   .then((response) => response.json())
//   .then((users) => {
//     // console.log(users[0]);

//     for (let i = 0; i <= users.length; i++) {
//       let divcon = document.createElement("div");
//       divcon.classList.add("product-card");

//       let divim = document.createElement("div");
//       divim.classList.add("product-image");
//       divcon.appendChild(divim);

//       let img = document.createElement("img");
//       img.src = `${users[i].imageUrl}`;
//       img.alt = "product5";
//       divim.appendChild(img);

//       let headp = document.createElement("h3");
//       let text = document.createTextNode(users[i].name);
//       headp.appendChild(text);

//       divcon.appendChild(headp);

//       let par = document.createElement("p");
//       let textp = document.createTextNode(users[i].price);
//       par.appendChild(textp);

//       divcon.appendChild(par);

//       let btn = document.createElement("button");
//       btn.classList.add("add-to-cart");

//       btn.textContent = "Add to Cart";
//       divcon.appendChild(btn);

//       let span=document.createElement("p")
//       span.setAttribute("id","id")
//       let textspan= document.createTextNode(users[i].id);

//       span.appendChild(textspan)
//       divcon.appendChild(span);


//       productgrid.appendChild(divcon);

//     }


//   });

////////////////////////////////////////////////////////////////

// for(let i=0;i<=7;i++){

//     let divcon=document.createElement("div")
//     divcon.classList.add("product-card")

//     let divim=document.createElement("div")
//     divim.classList.add("product-image")
//     divcon.appendChild(divim)

//     let img=document.createElement("img")
//     img.src="product5.jpg"
//     img.alt="product5"
//     divim.appendChild(img)

//     let headp=document.createElement("h3")
//     let text =document.createTextNode("Product 5")
//     headp.appendChild(text)

//     divcon.appendChild(headp)

//     let par=document.createElement("p")
//     let textp=document.createTextNode("$199.99")
//     par.appendChild(textp)

//     divcon.appendChild(par)

//     let btn=document.createElement("button")
//     btn.classList.add("add-to-cart")

//     btn.textContent="Add to Cart"
//     divcon.appendChild(btn)

//     productgrid.appendChild(divcon)

// }
