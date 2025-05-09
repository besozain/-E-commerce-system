window.addEventListener("load", function () {
  let targetTable = this.document.querySelector("table tbody");
  let searchInput = this.document.querySelector("input");
  let searchBtn = this.document.querySelector(".seerchBtn");
  let moveBtn = this.document.querySelector(".buttons");
  let currentPage = 1;
  let itemsPerPage = 6;

  let ourData = [];
 
  this.fetch("http://localhost:3000/products").then((response) => {
    response.json().then((data) => {
      console.log(data);
      let target = JSON.parse(this.sessionStorage.getItem('loginSellerUsername')).Username;
      console.log(target)
      for (let i of data) {
        for (let k in i) {
          if (k == "sellerUsername") {
            if (i[k] == target) {
              ourData.push(i);
            }
          }
        }
      }
      displayPagination(ourData, currentPage, itemsPerPage, targetTable, [
        "name",
        "price",
        "category",
        "inStock",
      ]);

      creationBtns(moveBtn, ourData, itemsPerPage);

      let btns = this.document.querySelectorAll(".buttons button");
      // button click functions

      validationOfBtns(btns, ourData, itemsPerPage,targetTable,["name", "price", "category", "inStock"]);

      searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
          moveBtn.style.display = "block";
          displayPagination(ourData, currentPage, itemsPerPage, targetTable, [
            "name",
            "price",
            "category",
            "inStock",
          ]);
        } else {
          searchInputFunc(searchInput.value, targetTable, ourData, [
            "name",
            "price",
            "category",
            "inStock",
          ]);
          moveBtn.style.display = "none";
        }

        searchInput.value = "";
      });
    });
  });

  statusOfSeller()
});

