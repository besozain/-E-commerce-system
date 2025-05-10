window.addEventListener("load", function () {
  let targetTable = this.document.querySelector("table tbody");
  let searchInput = this.document.querySelector("input");
  let searchBtn = this.document.querySelector(".seerchBtn");
  let moveBtn = this.document.querySelector(".buttons");
  let ourData;
  let currentPage = 1;
  let itemsPerPage = 6;

  this.fetch("http://localhost:3000/users").then((response) => {
    response.json().then((ourData) => {
      displayPagination(ourData, currentPage, itemsPerPage, targetTable, [
        "name",
        "Email",
        "role",
      ]);
      //call create bottons func

      creationBtns(moveBtn, ourData, itemsPerPage);

      let btns = this.document.querySelectorAll(".buttons button");
      // button click functions

      validationOfBtns(btns, ourData, itemsPerPage, targetTable, [
        "name",
        "Email",
        "role",
      ]);

      // search
      searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
          moveBtn.style.display = "block";
          displayPagination(ourData, currentPage, itemsPerPage, targetTable, [
            "name",
            "Email",
            "role",
          ]);
        } else {
          searchInputFunc(searchInput.value, targetTable, ourData, [
            "name",
            "Email",
            "role",
          ]);
          moveBtn.style.display = "none";
        }

        searchInput.value = "";
      });
    });
  });
});

/////////////////////////////////////////////////////////////

//show cart

let addu = document.getElementById("addu");
addu.addEventListener("click", function () {
  showCart("cartOverlay", "cartModal");
});

//cencel and colse cart
let headerclose = document.getElementById("headerclose");
headerclose.addEventListener("click", function () {
  hideCart("cartOverlay", "cartModal");
});

let cencelproduct = document.getElementById("cencelproduct");
cencelproduct.addEventListener("click", function () {
  hideCart("cartOverlay", "cartModal");
});

///add user

let adduser = document.getElementById("adduser");

adduser.addEventListener("click", function () {
  event.preventDefault();

  let allValid = true;

  checkField(name, errorname, /^[A-Za-z\s]{3,}$/);
  checkField(
    email,
    erroremail,
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  checkField(username, errorusername, /^[A-Za-z\s]{3,}$/);
  checkField(
    password,
    errorpassword,
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  checkField(phone, errorphone, /^(?:\+20|0)(10|11|12|15)[0-9]{8}$/);

  if (password.value === "" || password.value !== confirmpass.value.trim()) {
    confirmpass.style.border = "3px solid red";
    errorconfirm.style.visibility = "visible";
    allValid = false;
  } else {
    confirmpass.style.border = "3px solid green";
    errorconfirm.style.visibility = "hidden";
  }

  let role = document.getElementById("role");

  if (allValid) {
    let obj = {
      name: name.value,
      Email: email.value,
      Username: username.value,
      Password: password.value,
      Phone: phone.value,
      role: role.value,
    };

    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        const userExists = users.some(
          (user) => user.Email === obj.Email || user.Username === obj.Username
        );
        const emailcheck = users.some((user) => user.Email == obj.Email);
        const usernamecheck = users.some(
          (user) => user.Username == obj.Username
        );
        if (emailcheck) {
          erroremail.style.visibility = "visible";
          email.style.border = "3px solid red";
          email.value = "";
        }

        if (usernamecheck) {
          errorusername.style.visibility = "visible";
          username.style.border = "3px solid red";
          username.value = "";
        }

        if (!userExists) {
          hideCart("cartOverlay", "cartModal");
          return fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(obj),
          });
        } else {
          console.log("User already exists!");
        }
      })
      .then((response) => {
        if (response) console.log("add the user....");
      })
      .catch((error) => console.error("An error occurred:", error));
  }
});
////////////////////////////////////////////////////////////////////////////////////
//delete

// let cencelproductdelete=document.getElementById("cencelproductdelete")

// cencelproductdelete.addEventListener("click", function () {
//     hideCart("cartOverlaydelete", "cartModaldelete");
//   });

//////////////////////////////////////////////////////////////////////////////////
//update

let targetTable = document.getElementById("targetTable");
let updateuser = document.getElementById("updateuser");

// let headercloseupdate = document.getElementById("headercloseupdate");
// let cencelproductupdate = document.getElementById("cencelproductupdate");

// let productnameupdate = document.getElementById("productnameupdate");
// let categoryupdate = document.getElementById("categoryupdate");
// let descriptionupdate = document.getElementById("descriptionupdate");
// let priceupdate = document.getElementById("priceupdate");
// let imgurlupdate = document.getElementById("imgurlupdate");
// let productupdate = document.getElementById("productupdate");
// let productdelete = document.getElementById("productdelete");

targetTable.addEventListener("click", function (e) {
  let check = e.target;
  if (
    check.classList.contains("update") ||
    check.classList.contains("delete")
  ) {
    let parentTr = check.closest("tr");
    // console.log(parentTr)

    let idtarget = parentTr.querySelector("td");
    let tdtotaltarget = parentTr.querySelectorAll("td");

    // console.log(idtarget)
    // console.log(tdtotaltarget)
    let valuetarget = idtarget.textContent;
    if (check.classList.contains("update")) {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((user) => {
          const matchingUser = user.find((u) => u.id === valuetarget);
          console.log(matchingUser);
          updatename.value = matchingUser.name;
          updateemail.value = matchingUser.Email;
          updateusername.value = matchingUser.Username;
          updatepassword.value = matchingUser.Password;
          updateconfirm.value = matchingUser.Password;
          updatephone.value = matchingUser.Phone;
          updaterole.value = matchingUser.role;
          showCart("updatecartOverlay", "updatecartModal");

          updateuser.addEventListener("click", function () {
            event.preventDefault();

            let allValid = true;

            checkField(updatename, updateerrorname, /^[A-Za-z\s]{3,}$/);
            checkField(
              updateemail,
              updateerroremail,
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            );
            checkField(updateusername, updateerrorusername, /^[A-Za-z\s]{3,}$/);
            checkField(
              updatepassword,
              updateerrorpassword,
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            );
            checkField(
              updatephone,
              updateerrorphone,
              /^(?:\+20|0)(10|11|12|15)[0-9]{8}$/
            );

            if (
              updatepassword.value === "" ||
              updatepassword.value !== updateconfirm.value.trim()
            ) {
              confirmpass.style.border = "3px solid red";
              errorconfirm.style.visibility = "visible";
              allValid = false;
            } else {
              confirmpass.style.border = "3px solid green";
              errorconfirm.style.visibility = "hidden";
            }

            if (allValid) {
              let userdata = {
                name: updatename.value,
                Email: updateemail.value,
                Username: updateusername.value,
                Password: updatepassword.value,
                Phone: updatephone.value,
                role: updaterole.value,
              };
              console.log(userdata);

              fetch(`http://localhost:3000/users/${valuetarget}`, {
                method: "PATCH",
                body: JSON.stringify(userdata),
              })
                // .then(response => response.json())
                .then((data) => console.log("modify successfilly....", data))
                .catch((error) => console.error("modify not complete", error));
            }


          });
        });
    } else {




             showCart("cartOverlaydelete", "cartModaldelete");
      userdelete.addEventListener("click", function () {
        fetch(`http://localhost:3000/users/${valuetarget}`, {
          method: "DELETE",
          
        })
          
          .then((data) => console.log("delete successfilly....", data))
          .catch((error) => console.error("delete not complete", error));
          

      });

      
    }
  }
});

cenceluser.addEventListener("click",function(){
    hideCart("cartOverlaydelete", "cartModaldelete");
})

cencel.addEventListener("click", function () {
  hideCart("updatecartOverlay", "updatecartModal");
});

updateclose.addEventListener("click", function () {
  hideCart("updatecartOverlay", "updatecartModal");
});


///////////////////////
//LOG OUT 
window.addEventListener('load' , function() {
  let logOutBtn = this.document.querySelector('.logOut')
  console.log(logOutBtn)
  logOutBtn.addEventListener("click", function(){
    sessionStorage.removeItem("loginAdminUsername")
    window.location.href = "../index.html";
  })

})