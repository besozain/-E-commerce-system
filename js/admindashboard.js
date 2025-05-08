window.addEventListener('load', function () {
    let targetTable = this.document.querySelector("table tbody");
    let searchInput = this.document.querySelector("input");
    let searchBtn = this.document.querySelector(".seerchBtn");
    let moveBtn = this.document.querySelector(".buttons");
    let ourData;
    let currentPage = 1;
    let itemsPerPage = 6;

    ourData = JSON.parse(this.localStorage.getItem('products'));
    console.log(ourData);
    displayPaginationProduct(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        
    );
    //call create bottons func

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
      

    // search
    searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
            moveBtn.style.display = "block";
            displayPaginationProduct(ourData, currentPage, itemsPerPage, targetTable);
        } else {
            searchInputFuncForProbuct(
                searchInput.value,
                targetTable,
                ourData,
            );
            moveBtn.style.display = "none";
        }

        searchInput.value = "";
    });

});



