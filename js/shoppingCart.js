window.addEventListener("load", function () {
  this.fetch("http://localhost:3000/orders").then((response) => {
    response.json().then((data) => {
      let cartContainer = document.querySelector(".cart-container");
      let itemsContainer = document.querySelector(".cart-items");
      let empty = document.querySelector(".empty-cart");
      let totalPrice = 0;

      let customer =  JSON.parse(this.sessionStorage.getItem('loginCustomerUsername')).Username;
      console.log()
      let result = [];

      result = data.filter((item) => item.customer_user_name === customer);

      if (result.length == 0) {
        empty.style.display = "block";
        return;
      }
      for (let i of result) {
        // main container for each oeder
        let createdContanier = document.createElement("div");
        createdContanier.setAttribute("class", "cart-item");
        //image
        let img = document.createElement("img");
        img.setAttribute("src", "");
        img.setAttribute("alt", "Product");
        img.setAttribute("class", "item-img");
        createdContanier.appendChild(img);
        //item details
        let itemDetails = document.createElement("div");
        itemDetails.setAttribute("class", "item-details");
        //name
        let itemName = document.createElement("div");
        itemName.setAttribute("class", "item-name");
        itemName.textContent = i.product_name;
        itemDetails.appendChild(itemName);
        //price
        let itemPrice = document.createElement("div");
        itemPrice.setAttribute("class", "item-price");
        itemPrice.textContent = `$${i.total_price}`;

        totalPrice += Number(i.total_price);

        itemDetails.appendChild(itemPrice);
        //quantity

        let itemQuantity = document.createElement("div");
        itemQuantity.setAttribute("class", "item-quantity");
        //-button
        let btnMinus = document.createElement("button");
        btnMinus.setAttribute("class", "quantity-btn");
        btnMinus.textContent = "-";
        itemQuantity.appendChild(btnMinus);
        //quantity num
        let quantitySpan = document.createElement("span");
        quantitySpan.setAttribute("class", "quantity");
        quantitySpan.textContent = i.product_count;
        itemQuantity.appendChild(quantitySpan);
        //+button
        let btnPlus = document.createElement("button");
        btnPlus.setAttribute("class", "quantity-btn");
        btnPlus.textContent = "+";
        itemQuantity.appendChild(btnPlus);

        itemDetails.appendChild(itemQuantity);
        createdContanier.appendChild(itemDetails);

        //remove btn
        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "remove-btn");

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash-alt");
        removeBtn.appendChild(icon);

        createdContanier.appendChild(removeBtn);

        itemsContainer.appendChild(createdContanier);

        // plus function
        btnPlus.addEventListener("click", function () {
          let currentCount = Number(quantitySpan.textContent);
          currentCount++;
          quantitySpan.textContent = currentCount;

          totalPrice = result.reduce(
            (sum, i) =>
              sum +
              i.unit_price * (i.id === i.id ? currentCount : i.product_count),
            0
          );

          subtotalValue.textContent = totalPrice.toFixed(2);
          shippingValue.textContent = (totalPrice / 10).toFixed(2);
          totalValue.textContent = (totalPrice + totalPrice / 10).toFixed(2);

          fetch(`http://localhost:3000/orders/${i.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_count: currentCount,
              total_price: String(Number(i.unit_price) * currentCount),
            }),
          }).then((response) => {
            response.json().then((data) => {
              console.log(data);
            });
          });
        });

        btnMinus.addEventListener("click", function () {
          let currentCount = Number(quantitySpan.textContent);
          if (currentCount == 1) {
            return;
          }
          currentCount--;
          quantitySpan.textContent = currentCount;

          totalPrice = result.reduce(
            (sum, i) =>
              sum +
              i.unit_price * (i.id === i.id ? currentCount : i.product_count),
            0
          );

          subtotalValue.textContent = totalPrice.toFixed(2);
          shippingValue.textContent = (totalPrice / 10).toFixed(2);
          totalValue.textContent = (totalPrice + totalPrice / 10).toFixed(2);

          fetch(`http://localhost:3000/orders/${i.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_count: currentCount,
              total_price: String(Number(i.unit_price) * currentCount),
            }),
          }).then((response) => {
            response.json().then((data) => {
              console.log(data);
            });
          });
        });

        icon.addEventListener("click", function () {
          document.querySelector(".cartOverlay").style.display = "block";
          document.querySelector(".cartModal").style.display = "block";
          let deleteorder = document.querySelector(".deleteorder");
          let cencel = document.querySelector(".cencel");
          cencel.addEventListener("click", function () {
            document.querySelector(".cartOverlay").style.display = "none";
            document.querySelector(".cartModal").style.display = "none";
          });
          deleteorder.addEventListener("click", function () {
            fetch(`http://localhost:3000/orders/${i.id}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  createdContanier.remove();

                  totalPrice -= i.total_price;
                  subtotalValue.textContent = totalPrice.toFixed(2);
                  shippingValue.textContent = (totalPrice / 10).toFixed(2);
                  totalValue.textContent = (
                    totalPrice +
                    totalPrice / 10
                  ).toFixed(2);

                  document.querySelector(".cartOverlay").style.display = "none";
                  document.querySelector(".cartModal").style.display = "none";
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
        });

        let payment = this.document.querySelector('.payment')
        payment.addEventListener('click', function() {
          document.querySelector('.customAlert').style.display = "block"
          let confirmBtn = document.querySelector('.confirmBtn')
          let cancelBtn = document.querySelector('.cancelBtn')
          confirmBtn.addEventListener('click' ,function() {
            icon.remove()
            itemQuantity.remove()
            
          })

        })
      }

      // create price section
      let summaryContainer = document.createElement("div");
      summaryContainer.setAttribute("class", "cart-summary");
      //total
      let subtotalRow = document.createElement("div");
      subtotalRow.setAttribute("class", "summary-row");

      let subtotalLabel = document.createElement("span");
      subtotalLabel.textContent = "Subtotal:";

      let subtotalValue = document.createElement("span");
      subtotalValue.textContent = Number(totalPrice).toFixed(2);

      subtotalRow.appendChild(subtotalLabel);
      subtotalRow.appendChild(subtotalValue);

      //shiping
      let shippingRow = document.createElement("div");
      shippingRow.setAttribute("class", "summary-row");

      let shippingLabel = document.createElement("span");
      shippingLabel.textContent = "Shipping:";

      let shippingValue = document.createElement("span");
      shippingValue.textContent = (totalPrice / 10).toFixed(2);

      shippingRow.appendChild(shippingLabel);
      shippingRow.appendChild(shippingValue);

      //final price
      let totalRow = document.createElement("div");
      totalRow.setAttribute("class", "summary-row total");

      let totalLabel = document.createElement("span");
      totalLabel.textContent = "Total:";

      let totalValue = document.createElement("span");
      totalValue.textContent = (
        Number(totalPrice) +
        Number(totalPrice) / 10
      ).toFixed(2);

      totalRow.appendChild(totalLabel);
      totalRow.appendChild(totalValue);

      summaryContainer.appendChild(subtotalRow);
      summaryContainer.appendChild(shippingRow);
      summaryContainer.appendChild(totalRow);

      let checkoutBtn = document.querySelector(".checkout-btn");
      cartContainer.insertBefore(summaryContainer, checkoutBtn);
    });
  });
});
