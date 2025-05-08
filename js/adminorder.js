window.addEventListener('load', function () {
    let targetTable = this.document.querySelector("table tbody");
    let searchInput = this.document.querySelector("input");
    let searchBtn = this.document.querySelector(".seerchBtn");
    let moveBtn = this.document.querySelector(".buttons");
    let ourData;
    let currentPage = 1;
    let itemsPerPage = 6;

    this.fetch('http://localhost:3000/orders').then((response)=> {
        response.json().then((ourData) => {

            displayPagination(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        ["product_id","customer_email" ,"product_count", "total_price"]
    );

       creationBtns (moveBtn, ourData, itemsPerPage)  


    let btns = this.document.querySelectorAll(".buttons button");
    // button click functions

      validationOfBtns (btns, ourData, itemsPerPage)

    // search
    searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
            moveBtn.style.display = "block";
            displayPagination(ourData, currentPage, itemsPerPage, targetTable,["product_id","customer_email" ,"product_count", "total_price"]);
        } else {
            searchInputFunc(
                searchInput.value,
                targetTable,
                ourData,["product_id","customer_email" ,"product_count", "total_price"]
            );
            moveBtn.style.display = "none";
        }

        searchInput.value = "";
    });

});
})
})



