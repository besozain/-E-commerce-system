window.addEventListener("load", function () {
  this.fetch("http://localhost:3000/orders").then((response) => {
    response.json().then((data) => {
      let customer = JSON.parse(
        this.sessionStorage.getItem("loginCustomerUsername")
      ).Username;
      let result = [];
      result = data.filter((item) => item.customer_user_name === customer && item.order_status.trim() != "");
      
      // for every order create container
      for (let i of result) {
        //main container static
        let container = document.createElement("div");
        container.setAttribute("class", "container");

        let title = document.createElement("h1");
        title.textContent = "Track Your Order";
        container.appendChild(title);

        let trackingInfo = document.createElement("div");
        trackingInfo.setAttribute("class", "tracking-info");

        //status
        let statusHeading = document.createElement("h2");
        statusHeading.textContent = `Order Status ${i.order_status}`;
        trackingInfo.appendChild(statusHeading);

        let statusBar = document.createElement("div");
        statusBar.setAttribute("class", "status-bar");

        let progress = document.createElement("div");
        progress.setAttribute("class", "progress");
        statusBar.appendChild(progress);
        trackingInfo.appendChild(statusBar);

        let steps = document.createElement("div");
        steps.setAttribute("class", "steps");

        let stepsData = [
          { num: "1", label: "Order Placed", class: "step" },
          { num: "2", label: "Processing", class: "step " },
          { num: "3", label: "Shipped", class: "step" },
          { num: "4", label: "Delivered", class: "step" },
        ];
         if(i.order_status == "inplace"){
            progress.style.width = "25%";
            stepsData[0].class = "step active"
        }else if (i.order_status == "processing"){
            progress.style.width = "50%";
            stepsData[0].class = "step completed"
            stepsData[1].class = "step active"
        }else if(i.order_status == "shipped") {
            progress.style.width = "75%";
            stepsData[0].class = "step completed"
            stepsData[1].class = "step completed"
            stepsData[2].class = "step active"
        }else if (i.order_status == "delivered"){
            progress.style.width = "100%";
            stepsData[0].class = "step completed"
            stepsData[1].class = "step completed"
            stepsData[2].class = "step completed"
            stepsData[3].class = "step active"
        }


        stepsData.forEach((stepData) => {
          let step = document.createElement("div");
          step.setAttribute("class", stepData.class);

          let icon = document.createElement("div");
          icon.setAttribute("class", "icon");
          icon.textContent = stepData.num;

          let label = document.createElement("div");
          label.textContent = stepData.label;

          step.appendChild(icon);
          step.appendChild(label);
          steps.appendChild(step);
        });
        

        trackingInfo.appendChild(steps);

        let details = document.createElement("div");
        details.setAttribute("class", "details");

        let detailsHeading = document.createElement("h3");
        detailsHeading.textContent = "Order Details";
        details.appendChild(detailsHeading);
/////////////////////////////////////
        let detailsData = [
          { label: "Tracking Number:", value: i.id },
          { label: "Order Date:", value: i.order_date},
          { label: "Estimated Delivery:", value: i.order_date },
          {
            label: "Shipping Address:",
            value: i.shipping_address,
          },
        ];

        detailsData.forEach((item) => {
          let row = document.createElement("div");
          row.setAttribute("class", "detail-row");

          let detailLabel = document.createElement("div");
          detailLabel.setAttribute("class", "detail-label");
          detailLabel.textContent = item.label;

          let detailValue = document.createElement("div");
          detailValue.setAttribute("class", "detail-value");
          detailValue.textContent = item.value;

          row.appendChild(detailLabel);
          row.appendChild(detailValue);
          details.appendChild(row);
        });

        trackingInfo.appendChild(details);

        container.appendChild(trackingInfo);

        document.body.appendChild(container);
      }
    });
  });
});
