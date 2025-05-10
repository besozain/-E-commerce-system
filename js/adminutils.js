//pagination

const displayPagination = function (
  ourData,
  currentPage,
  itemsPerPage,
  targetTable,
  customer = []
) {
  targetTable.innerText = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = currentPage * itemsPerPage;
  let paginationArray = ourData.slice(start, end);

  for (let obj of paginationArray) {
    let createdTr = document.createElement("tr");
    // for loop to obj
    for (let k in obj) {
      if (customer.includes(k)) {
        let createdTd = document.createElement("td");
        createdTd.innerText = obj[k];
        createdTr.appendChild(createdTd);
      }
      if (k == "id") {
        let id = document.createElement("td");
        id.setAttribute("class", "id");
        id.innerHTML = obj[k];
        createdTr.appendChild(id);
      }
      if (k == "approve") {
        let createdTd = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox"); 
        checkbox.classList.add("checkaprove")
        if(obj[k] == "true"){
          checkbox.checked = true
        }
        createdTd.appendChild(checkbox);
        createdTr.appendChild(createdTd);
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
const searchInputFunc = function (
  searchInput,
  targetTable,
  ourData,
  customer = []
) {
  let match = false;
  let noDataMatchDiv = document.querySelector(".massageNoData");
  targetTable.innerHTML = "";

  for (let data of ourData) {
    let rowString = Object.values(data).join(" ").toLowerCase();

    if (rowString.includes(searchInput.toLowerCase())) {
      let createdTr = document.createElement("tr");

      for (let k in data) {
        if (customer.includes(k)) {
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
    targetTable.style.display = "";
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
const creationBtns = function (moveBtn, ourData, itemsPerPage) {
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
};

// btns validations

const validationOfBtns = function (
  btns,
  ourData,
  itemsPerPage,
  targetTable,
  customer = []
) {
  for (let i = 0; i < Math.ceil(ourData.length / itemsPerPage); i++) {
    btns[i + 1].addEventListener("click", function () {
      currentPage = i + 1;
      resetBtnColor(btns);
      currentBtnColor(btns[i + 1]);
      displayPagination(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        customer
      );
    });
  }
  btns[0].addEventListener("click", function () {
    if (currentPage == 1) return;
    currentPage -= 1;
    resetBtnColor(btns);
    currentBtnColor(btns[currentPage]);
    displayPagination(
      ourData,
      currentPage,
      itemsPerPage,
      targetTable,
      customer
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
      displayPagination(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        customer
      );
    }
  );
};

const statusOfSeller = function () {
  this.fetch("http://localhost:3000/orders").then((response) => {
    response.json().then((data) => {
      let orderCount = this.document.querySelectorAll(".stat-card p")[1];
      let order_count_array = [];
      console.log(data);
      let target = JSON.parse(
        this.sessionStorage.getItem("loginSellerUsername")
      ).Username;
      for (let i of data) {
        for (let k in i) {
          if (k == "sellerUsername") {
            if (i[k] == target) {
              order_count_array.push(i);
            }
          }
        }
      }

      orderCount.innerHTML = order_count_array.length;
    });
  });
};

this.fetch("http://localhost:3000/products").then((response) => {
  response.json().then((data) => {
    let productCount = this.document.querySelectorAll(".stat-card p")[0];
    let product_count_array = [];
    console.log(data);
    let target = JSON.parse(
      this.sessionStorage.getItem("loginSellerUsername")
    ).Username;
    for (let i of data) {
      for (let k in i) {
        if (k == "sellerUsername") {
          if (i[k] == target) {
            product_count_array.push(i);
          }
        }
      }
    }
    productCount.innerHTML = product_count_array.length;
  });
});

// /////////////////////////////////////////////////////////////////////////////////


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

