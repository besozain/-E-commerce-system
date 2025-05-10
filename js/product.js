// let productgrid = document.getElementById("product-grid");
let users=[]
fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    users=data.filter(ele=>ele.approve=="true")
    console.log(users);
    
productshow(users,users.length)
   


  });

  //////////////////////////////////////
 
