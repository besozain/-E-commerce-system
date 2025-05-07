//pagination

const displayPaginationProduct = function (
  ourData,
  currentPage,
  itemsPerPage,
  targetTable,
  name,
  price,
  category,
  inStock
) {
  targetTable.innerText = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let paginationArray = ourData.slice(start, end);

  for (let obj of paginationArray) {
    let createdTr = document.createElement("tr");
    // for loop to obj
    for (let k in obj) {
      if (k == name || k == price || k == category || k == inStock) {
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
    targetTable.appendChild(createdTr);
  }
};

//search
const searchInputFunc = function (
  searchInput,
  targetTable,
  ourData,
  name,
  price,
  category,
  inStock
) {
  let match = false;
  let noDataMatchDiv = document.querySelector(".massageNoData");
  targetTable.innerHTML = "";

  for (let data of ourData) {
    let rowString = Object.values(data).join(" ").toLowerCase();

    if (rowString.includes(searchInput.toLowerCase())) {
      let createdTr = document.createElement("tr");

      for (let k in data) {
        if (k == name || k == price || k == category || k == inStock) {
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

const products = function (fetchURL, keylocal, name, price, category, inStock) {
  let targetTable = this.document.querySelector("table tbody");
  let searchInput = this.document.querySelector("input");
  let searchBtn = this.document.querySelector(".seerchBtn");
  let moveBtn = this.document.querySelector(".buttons");
  let ourData;
  let currentPage = 1;
  let itemsPerPage = 6;

  this.fetch(fetchURL)
    .then((Response) => {
      Response.json().then((data) => {
        this.localStorage.setItem(keylocal, JSON.stringify(data));
        ourData = JSON.parse(this.localStorage.getItem(keylocal));
        console.log(ourData);
        displayPaginationProduct(
          ourData,
          currentPage,
          itemsPerPage,
          targetTable,
          name,
          price,
          category,
          inStock
        );

        //create button move
        let createdBtn = this.document.createElement("button");
        createdBtn.textContent = "<";
        moveBtn.appendChild(createdBtn);
        for (let i = 0; i < Math.ceil(ourData.length / itemsPerPage); i++) {
          createdBtn = this.document.createElement("button");
          createdBtn.textContent = i + 1;
          moveBtn.appendChild(createdBtn);
        }
        createdBtn = this.document.createElement("button");
        createdBtn.textContent = ">";
        moveBtn.appendChild(createdBtn);

        let btns = this.document.querySelectorAll(".buttons button");
        // button click functions
        for (let i = 0; i < Math.ceil(ourData.length / itemsPerPage); i++) {
          btns[i + 1].addEventListener("click", function () {
            currentPage = i + 1;
            resetBtnColor(btns);
            currentBtnColor(btns[i + 1]);
            displayPaginationProduct(
              ourData,
              currentPage,
              itemsPerPage,
              targetTable
            );
          });
        }
        btns[0].addEventListener("click", function () {
          if (currentPage == 1) return;
          currentPage -= 1;
          resetBtnColor(btns);
          currentBtnColor(btns[currentPage]);
          displayPaginationProduct(
            ourData,
            currentPage,
            itemsPerPage,
            targetTable
          );
        });
        btns[Math.ceil(ourData.length / itemsPerPage) + 1].addEventListener(
          "click",
          function () {
            if (currentPage == Math.ceil(ourData.length / itemsPerPage)) {
              return;
            }
            currentPage += 1;
            resetBtnColor(btns);
            currentBtnColor(btns[currentPage]);
            displayPaginationProduct(
              ourData,
              currentPage,
              itemsPerPage,
              targetTable
            );
          }
        );
      });
    })
    .catch((e) => console.log(e));

  // search
  searchBtn.addEventListener("click", function () {
    if (searchInput.value.trim() == "") {
      moveBtn.style.display = "block";
      displayPaginationProduct(ourData, currentPage, itemsPerPage, targetTable);
    } else {
      searchInputFunc(
        searchInput.value,
        targetTable,
        ourData,
        name,
        price,
        category,
        inStock
      );
      moveBtn.style.display = "none";
    }

    searchInput.value = "";
  });
};

///////////////////////////////////////////////////////////////////////////////////
let headerclose = document.getElementById("headerclose");
let cencelproduct = document.getElementById("cencelproduct");
let cart = document.getElementById("cart");
let addproduct = document.getElementById("addproduct");

headerclose.addEventListener("click", hideCart);
cencelproduct.addEventListener("click", hideCart);
cart.addEventListener("click", showCart);
addproduct.addEventListener("click", addProduct);

function showCart() {
  document.getElementById("cartOverlay").style.display = "block";
  document.getElementById("cartModal").style.display = "block";
}

function hideCart() {
  document.getElementById("cartOverlay").style.display = "none";
  document.getElementById("cartModal").style.display = "none";
}

function addProduct() {
  let productName = document.getElementById("productname").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("price").value;
  let image =document.getElementById("imgurl").files[0]?.name || "No file selected";

  if (productName && category && price && description && image) {
    let productData = {
      name: productName,
      description: description,
      price: price,
      currency: "EGP",
      inStock: "true",
      category: category,
      imageUrl: `../assets/images/${image}`,
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

    // console.log(productData);

    // console.log(
    //   `Product Added:\nName: ${productName}\nCategory: ${category}\nDescription: ${description}\nPrice: $${price}\nImage: ${image}`
    // );

    hideCart();
  } else {
    alert("Please fill in all required fields!");
  }
}
