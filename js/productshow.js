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


      productgrid.appendChild(divcon);

    }


}
