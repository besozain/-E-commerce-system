//pagination
const pagination = function() {}

const displayPaginationProduct = function (
  ourData,
  currentPage,
  itemsPerPage,
  targetTable
) {
  targetTable.innerText = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let paginationArray = ourData.slice(start, end);

  for (let obj of paginationArray) {
    let createdTr = document.createElement("tr");
    // for loop to obj
    for (let k in obj) {
      if (k == "name" || k == "price" || k == "category" || k == "inStock") {
        let createdTd = document.createElement("td");
        createdTd.innerText = obj[k];
        createdTr.appendChild(createdTd);
      } else if (k == "id") {
        let id = document.createElement("td");
        id.setAttribute("class", "id");
        id.innerHTML = obj[k];
        createdTr.appendChild(id);
      }
    }
    let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
  }
};
const displayPaginationOrder = function (
  ourData,
  currentPage,
  itemsPerPage,
  targetTable
) {
  targetTable.innerText = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let paginationArray = ourData.slice(start, end);

  for (let obj of paginationArray) {
    let createdTr = document.createElement("tr");
    // for loop to obj
    for (let k in obj) {
      if (k == "product_id"|| k == "customer_email" || k == "product_count" || k == "total_price") {
        let createdTd = document.createElement("td");
        createdTd.innerText = obj[k];
        createdTr.appendChild(createdTd);
      } else if (k == "id") {
        let id = document.createElement("td");
        id.setAttribute("class", "id");
        id.innerHTML = obj[k];
        createdTr.appendChild(id);
      }
    }
    let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
  }
};
const displayPaginationUser = function (
  ourData,
  currentPage,
  itemsPerPage,
  targetTable
) {
  targetTable.innerText = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let paginationArray = ourData.slice(start, end);

  for (let obj of paginationArray) {
    let createdTr = document.createElement("tr");
    // for loop to obj
    for (let k in obj) {
      if (k == "name"|| k == "Email" || k == "role" ) {
        let createdTd = document.createElement("td");
        createdTd.innerText = obj[k];
        createdTr.appendChild(createdTd);
      } else if (k == "id") {
        let id = document.createElement("td");
        id.setAttribute("class", "id");
        id.innerHTML = obj[k];
        createdTr.appendChild(id);
      }
    }
    let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
  }
};











//search
const searchInputFuncForProbuct = function (
  searchInput,
  targetTable,
  ourData
) {
  let match = false;
  let noDataMatchDiv = document.querySelector(".massageNoData");
  targetTable.innerHTML = "";

  for (let data of ourData) {
    let rowString = Object.values(data).join(" ").toLowerCase();

    if (rowString.includes(searchInput.toLowerCase())) {
      let createdTr = document.createElement("tr");

      for (let k in data) {
        if (k == "name" || k == "price" || k == "category" || k == "inStock") {
          let createdTd = document.createElement("td");
          createdTd.innerText = data[k];
          createdTr.appendChild(createdTd);
        } else if (k == "id") {
          let id = document.createElement("td");
          id.setAttribute("class", "id");
          id.innerHTML = data[k];
          createdTr.appendChild(id);
        }
      }
      let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
      targetTable.appendChild(createdTr);
      match = true;
    }
  }

  if (!match) {
    targetTable.style.display = "none";
    noDataMatchDiv.style.display = "block";
  } else {
    noDataMatchDiv.style.display = "none";
  }
};
const searchInputFuncForOrder = function (
  searchInput,
  targetTable,
  ourData
) {
  let match = false;
  let noDataMatchDiv = document.querySelector(".massageNoData");
  targetTable.innerHTML = "";

  for (let data of ourData) {
    let rowString = Object.values(data).join(" ").toLowerCase();

    if (rowString.includes(searchInput.toLowerCase())) {
      let createdTr = document.createElement("tr");

      for (let k in data) {
        if (k == "product_id"|| k == "customer_email" || k == "product_count" || k == "total_price") {
          let createdTd = document.createElement("td");
          createdTd.innerText = data[k];
          createdTr.appendChild(createdTd);
        } else if (k == "id") {
          let id = document.createElement("td");
          id.setAttribute("class", "id");
          id.innerHTML = data[k];
          createdTr.appendChild(id);
        }
      }
      let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
      targetTable.appendChild(createdTr);
      match = true;
    }
  }

  if (!match) {
    targetTable.style.display = "none";
    noDataMatchDiv.style.display = "block";
  } else {
    noDataMatchDiv.style.display = "none";
  }
};
const searchInputFuncForUser = function (
  searchInput,
  targetTable,
  ourData
) {
  let match = false;
  let noDataMatchDiv = document.querySelector(".massageNoData");
  targetTable.innerHTML = "";

  for (let data of ourData) {
    let rowString = Object.values(data).join(" ").toLowerCase();

    if (rowString.includes(searchInput.toLowerCase())) {
      let createdTr = document.createElement("tr");

      for (let k in data) {
        if (k == "name"|| k == "Email" || k == "role" ) {
          let createdTd = document.createElement("td");
          createdTd.innerText = data[k];
          createdTr.appendChild(createdTd);
        } else if (k == "id") {
          let id = document.createElement("td");
          id.setAttribute("class", "id");
          id.innerHTML = data[k];
          createdTr.appendChild(id);
        }
      }
      let action = document.createElement("td");
    action.setAttribute("class", "action");
    let iconUpdate = document.createElement("i");
    iconUpdate.setAttribute("class", "fa-solid fa-pen update");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa-solid fa-trash delete");
    action.appendChild(iconUpdate);
    action.appendChild(iconDelete);
    createdTr.appendChild(action);
    targetTable.appendChild(createdTr);
      targetTable.appendChild(createdTr);
      match = true;
    }
  }

  if (!match) {
    targetTable.style.display = "none";
    noDataMatchDiv.style.display = "block";
  } else {
    noDataMatchDiv.style.display = "none";
  }
};











// button colors
const resetBtnColor = function (btns) {
  for (let b of btns) {
    b.style.backgroundColor = "";
    b.style.color = "";
  }
};
const currentBtnColor = function (b) {
  b.style.backgroundColor = "#00443a";
  b.style.color = "white";
};
//creation of move btns


// btns validations










// /////////////////////////////////////////////////////////////////////////////////
// let headerclose = document.getElementById("headerclose");
// let cencelproduct = document.getElementById("cencelproduct");
// let cart = document.getElementById("cart");
// let addproduct = document.getElementById("addproduct");

const showCart = function (x, y) {
  //edit (x,y)
  document.getElementById(x).style.display = "block";
  document.getElementById(y).style.display = "block";
};

const hideCart = function (x, y) {
  //edit (x,y)
  document.getElementById(x).style.display = "none";
  document.getElementById(y).style.display = "none";
};

// headerclose.addEventListener("click", function () {
//   hideCart("cartOverlay", "cartModal");
// });
// cencelproduct.addEventListener("click", function () {
//   hideCart("cartOverlay", "cartModal");
// });
// addproduct.addEventListener("click", addProduct);

// cart.addEventListener("click", function () {
//   showCart("cartOverlay", "cartModal");
// });

// // function hideCart() {
// //   document.getElementById("cartOverlay").style.display = "none";
// //   document.getElementById("cartModal").style.display = "none";
// // }

// function addProduct() {
//   let productName = document.getElementById("productname").value;
//   let category = document.getElementById("category").value;
//   let description = document.getElementById("description").value;
//   let price = document.getElementById("price").value;
//   let image =
//     document.getElementById("imgurl").files[0]?.name || "No file selected";

//   if (productName && category && price && description && image) {
//     let productData = {
//       name: productName,
//       description: description,
//       price: price,
//       currency: "EGP",
//       inStock: "true",
//       category: category,
//       imageUrl: `../assets/images/${image}`,
//     };
//     // console.log(productData["name"])
//     // console.log(productData["filedata"])

//     fetch("http://localhost:3000/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(productData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Product Added:", data))
//       .catch((error) => console.error("Error:", error));

//     // console.log(productData);

//     // console.log(
//     //   `Product Added:\nName: ${productName}\nCategory: ${category}\nDescription: ${description}\nPrice: $${price}\nImage: ${image}`
//     // );

//     hideCart();
//   } else {
//     alert("Please fill in all required fields!");
//   }
// }

// ///////////////////////////////////////////////////////////////////////////
// //update and delete the product

// let targetTable = document.getElementById("targetTable");

// let headercloseupdate = document.getElementById("headercloseupdate");
// let cencelproductupdate = document.getElementById("cencelproductupdate");

// let productnameupdate = document.getElementById("productnameupdate");
// let categoryupdate = document.getElementById("categoryupdate");
// let descriptionupdate = document.getElementById("descriptionupdate");
// let priceupdate = document.getElementById("priceupdate");
// let imgurlupdate = document.getElementById("imgurlupdate");
// let productupdate = document.getElementById("productupdate");
// let productdelete = document.getElementById("productdelete");

// let cencelproductdelete = document.getElementById("cencelproductdelete");

// targetTable.addEventListener("click", function (e) {
//   // console.log(this)
//   // console.log(e.target)
//   let check = e.target;

//   if (
//     check.classList.contains("update") ||
//     check.classList.contains("delete")
//   ) {
//     let parentTr = check.closest("tr");
//     // console.log(parentTr)
//     let idtarget = parentTr.querySelector("td");
//     console.log(idtarget);

//     console.log(idtarget.textContent);
//     let valuetarget = idtarget.textContent;

//     if (check.classList.contains("update")) {
//       fetch("http://localhost:3000/products")
//         .then((response) => response.json())
//         .then((user) => {
//           const matchingUser = user.find((u) => u.id === valuetarget);

//           console.log(matchingUser);

//           productnameupdate.value = matchingUser.name;
//           priceupdate.value = Number(matchingUser.price);

//           // window.addEventListener("DomContentLoad",function(){        //////////edit
//           //   console.log(matchingUser.category)
//           //   categoryupdate.value=matchingUser.category
//           // })

//           descriptionupdate.value = matchingUser.description;
//           imgurlupdate = matchingUser.imageUrl; ///edit

//           console.log(productnameupdate);
//           showCart("cartOverlayupdate", "cartModalupdate");

         

//           productupdate.addEventListener("click", function () {

//             let productData = {
//               name: productnameupdate.value,
//               description: descriptionupdate.value,
//               price: priceupdate.value,
//               currency: "EGP",
//               inStock: "true",
//               category: categoryupdate.value,
//               imageUrl: `../assets/images/${imgurlupdate}`,
//             };
//             console.log("por",productData)


//             fetch(`http://localhost:3000/products/${valuetarget}`, {
//               method: "PATCH",
//               body: JSON.stringify(productData),
//             })
//               .then(response => response.json())
//               .then((data) => console.log("modify successfilly....", data))
//               .catch((error) => console.error("modify not complete", error));
//           });
//         })
//         .then((response) => {
//           if (response) console.log("add the user....");
//         })
//         .catch((error) => console.error("An error occurred:", error));
//     } else {
//       showCart("cartOverlaydelete", "cartModaldelete");
//       productdelete.addEventListener("click", function () {
//         fetch(`http://localhost:3000/products/${valuetarget}`, {
//           method: "DELETE",
          
//         })
          
//           .then((data) => console.log("delete successfilly....", data))
//           .catch((error) => console.error("delete not complete", error));
//           parentTr.remove();

//       });

     
//     }
//   }
// });

// headercloseupdate.addEventListener("click", function () {
//   hideCart("cartOverlayupdate", "cartModalupdate");
// });
// cencelproductupdate.addEventListener("click", function () {
//   hideCart("cartOverlayupdate", "cartModalupdate");
// });
// cencelproductdelete.addEventListener("click", function () {
//   hideCart("cartOverlaydelete", "cartModaldelete");
// });

// // // //delete
// // // let userId = 5; // ID of the user to modify
