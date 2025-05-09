let productgrid = document.getElementById("product-grid"); 

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((users) => {
    // console.log(users);
    
    productshow(users,7)
   


  });
