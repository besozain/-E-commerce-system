
        //+ btn func
        btnPlus.addEventListener("click", function () {
          let currentCount = Number(quantitySpan.textContent);
          currentCount++;
          quantitySpan.textContent = currentCount;

          totalPrice = result.reduce((sum, i) => sum + (i.unit_price * (i.id === i.id ? currentCount : i.product_count)), 0);

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
              total_price : String(Number(i.unit_price) *currentCount)
            }),
          }).then((response) => {
            response.json().then((data) => {
              console.log(data);
            });
          });
        });