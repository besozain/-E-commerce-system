window.addEventListener('load', function () {
    let targetTable = this.document.querySelector("table tbody");
    let searchInput = this.document.querySelector("input");
    let searchBtn = this.document.querySelector(".seerchBtn");
    let moveBtn = this.document.querySelector(".buttons");
    let currentPage = 1;
    let itemsPerPage = 6;

    this.fetch("http://localhost:3000/products").then((response) => {
      response.json().then((ourData) => {
    console.log(ourData);
    displayPagination(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        ["name" ,"price" , "category" , "inStock"]
        
    );
    //call create bottons func

        creationBtns (moveBtn, ourData, itemsPerPage)  
      
      

    let btns = this.document.querySelectorAll(".buttons button");
    // button click functions

        validationOfBtns (btns, ourData, itemsPerPage,targetTable,["name" ,"price" , "category" , "inStock"])
      

    // search
    searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
            moveBtn.style.display = "block";
            displayPagination(ourData, currentPage, itemsPerPage, targetTable,["name" ,"price" , "category" , "inStock"]);
        } else {
          searchInputFunc(
                searchInput.value,
                targetTable,
                ourData,["name" ,"price" , "category" , "inStock"]
            );
            moveBtn.style.display = "none";
        }

        searchInput.value = "";
    });

});
})
})
///////////////////////////////////////////////////////////////////////////////////
////cart


let headerclose = document.getElementById("headerclose");
let cencelproduct = document.getElementById("cencelproduct");
let cart = document.getElementById("cart");
let addproduct = document.getElementById("addproduct");



headerclose.addEventListener("click", function () {
  hideCart("cartOverlay", "cartModal");
});
cencelproduct.addEventListener("click", function () {
  hideCart("cartOverlay", "cartModal");
});
addproduct.addEventListener("click", addProduct);

cart.addEventListener("click", function () {
  showCart("cartOverlay", "cartModal");
});


let data=JSON.parse(sessionStorage.getItem("loginAdminUsername")).Username
console.log(data)  


function addProduct() {
  let productName = document.getElementById("productname").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("price").value;
  let image =
    document.getElementById("imgurl").files[0]?.name || "No file selected";

  if (productName && category && price && description && image != "No file selected") {
    let productData = {
      name: productName,
      description: description,
      price: price,
      currency: "EGP",
      inStock: "true",
      category: category,
      imageUrl: `../assets/images/${image}`,
       sellerUsername:data,
      approve:"true"
    };
    // console.log(productData["name"])
    // console.log(productData["filedata"])

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Product Added:", data))
      .catch((error) => console.error("Error:", error));

      location.reload()

    // console.log(productData);

    // console.log(
    //   `Product Added:\nName: ${productName}\nCategory: ${category}\nDescription: ${description}\nPrice: $${price}\nImage: ${image}`
    // );

    hideCart("cartOverlay", "cartModal");
  } else {
    alert("Please fill in all required fields!");
  }
}


// ///////////////////////////////////////////////////////////////////////////
// //update and delete the product

let targetTable = document.getElementById("targetTable");

let headercloseupdate = document.getElementById("headercloseupdate");
let cencelproductupdate = document.getElementById("cencelproductupdate");

let productnameupdate = document.getElementById("productnameupdate");
let categoryupdate = document.getElementById("categoryupdate");
let descriptionupdate = document.getElementById("descriptionupdate");
let priceupdate = document.getElementById("priceupdate");
let imgurlupdate = document.getElementById("imgurlupdate");
let productupdate = document.getElementById("productupdate");
let productdelete = document.getElementById("productdelete");

let cencelproductdelete = document.getElementById("cencelproductdelete");

targetTable.addEventListener("click", function (e) {
  // console.log(this)
  // console.log(e.target)
  let check = e.target;

  if (
    check.classList.contains("update") ||
    check.classList.contains("delete")
  ) {
    let parentTr = check.closest("tr");
    // console.log(parentTr)
    let idtarget = parentTr.querySelector("td");
    let tdtotaltarget= parentTr.querySelectorAll("td");

    // console.log(tdtotaltarget[0])
    // console.log(idtarget);

    // console.log(idtarget.textContent);
    let valuetarget = idtarget.textContent;

    if (check.classList.contains("update")) {
      fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((user) => {
          const matchingUser = user.find((u) => u.id === valuetarget);

          console.log(matchingUser);

          productnameupdate.value = matchingUser.name;
          priceupdate.value = Number(matchingUser.price);

          // window.addEventListener("DomContentLoad",function(){        //////////edit
          //   console.log(matchingUser.category)
          //   categoryupdate.value=matchingUser.category
          // })

          descriptionupdate.value = matchingUser.description;
          imgurlupdate = matchingUser.imageUrl; ///edit

          console.log(productnameupdate);
          showCart("cartOverlayupdate", "cartModalupdate");

          productupdate.addEventListener("click", function () {

            let productData = {

              name: productnameupdate.value,
              price: priceupdate.value,
              inStock: "true",
              category: categoryupdate.value,
              description: descriptionupdate.value,
              currency: "EGP",
              imageUrl: `../assets/images/${imgurlupdate}`,
            };

            for(let i=1 ;i<tdtotaltarget.length-1;i++){
                // console.log(tdtotaltarget[i])
                switch(i){
                    case 1 :tdtotaltarget[i].textContent=productData.name
                    break;
                    case 2 :tdtotaltarget[i].textContent=productData.price
                    break;
                    case 3 :tdtotaltarget[i].textContent=productData.inStock
                    break;
                    case 4 :tdtotaltarget[i].textContent=productData.category
                    break;
                   

                }

                // console.log(tdtotaltarget[i].textContent)
            }

           console.log(`productData=${productData}`)
            // let userId = 5; // ID of the user to modify

            fetch(`http://localhost:3000/products/${valuetarget}`, {
              method: "PATCH",
              body: JSON.stringify(productData),
            })
              // .then(response => response.json())
              .then((data) => console.log("modify successfilly....", data))
              .catch((error) => console.error("modify not complete", error));
          });
        })
        .then((response) => {
          if (response) console.log("add the user....");
        })
        .catch((error) => console.error("An error occurred:", error));
    } else {
      showCart("cartOverlaydelete", "cartModaldelete");
      productdelete.addEventListener("click", function () {
        fetch(`http://localhost:3000/products/${valuetarget}`, {
          method: "DELETE",
          
        })
          
          .then((data) => console.log("delete successfilly....", data))
          .catch((error) => console.error("delete not complete", error));
          parentTr.remove();

      });

     
    }
  }
});

headercloseupdate.addEventListener("click", function () {
  hideCart("cartOverlayupdate", "cartModalupdate");
});
cencelproductupdate.addEventListener("click", function () {
  hideCart("cartOverlayupdate", "cartModalupdate");
});
cencelproductdelete.addEventListener("click", function () {
  hideCart("cartOverlaydelete", "cartModaldelete");
});




/////////////////////////////////////////////////////////////////////////////




