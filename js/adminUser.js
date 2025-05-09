window.addEventListener('load', function () {
    let targetTable = this.document.querySelector("table tbody");
    let searchInput = this.document.querySelector("input");
    let searchBtn = this.document.querySelector(".seerchBtn");
    let moveBtn = this.document.querySelector(".buttons");
    let ourData;
    let currentPage = 1;
    let itemsPerPage = 6;

    this.fetch('http://localhost:3000/users').then((response)=> {
        response.json().then((ourData) => {
            
            displayPagination(
        ourData,
        currentPage,
        itemsPerPage,
        targetTable,
        ["name", "Email" ,"role" ]
        
    );
    //call create bottons func

        creationBtns (moveBtn, ourData, itemsPerPage)  
      
      

    let btns = this.document.querySelectorAll(".buttons button");
    // button click functions

       validationOfBtns (btns, ourData, itemsPerPage,targetTable,["name", "Email" ,"role" ])
      

    // search
    searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() == "") {
            moveBtn.style.display = "block";
            displayPagination(ourData, currentPage, itemsPerPage, targetTable,["name", "Email" ,"role" ]);
        } else {
            searchInputFunc(
                searchInput.value,
                targetTable,
                ourData,["name", "Email" ,"role" ]
            );
            moveBtn.style.display = "none";
        }

        searchInput.value = "";
    });

});
})
})

/////////////////////////////////////////////////////////////

//show cart

let addu=document.getElementById("addu")
addu.addEventListener("click",function(){

    showCart("cartOverlay", "cartModal");

})

//cencel and colse cart
let headerclose=document.getElementById("headerclose")
headerclose.addEventListener("click",function(){

    hideCart("cartOverlay", "cartModal");

})

let cencelproduct=document.getElementById("cencelproduct")
cencelproduct.addEventListener("click",function(){

    hideCart("cartOverlay", "cartModal");

})



///add user

let adduser=document.getElementById("adduser")

adduser.addEventListener("click", function () {
    event.preventDefault(); 

    let allValid = true;

  

    checkField(name, errorname, /^[A-Za-z\s]{3,}$/);
    checkField(email, erroremail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    checkField(username, errorusername, /^[A-Za-z\s]{3,}$/);
    checkField(password, errorpassword, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    checkField(phone, errorphone, /^(?:\+20|0)(10|11|12|15)[0-9]{8}$/);

    if (password.value === "" || password.value !== confirmpass.value.trim()) {
        confirmpass.style.border = "3px solid red";
        errorconfirm.style.visibility = "visible";
        allValid = false;
    } else {
        confirmpass.style.border = "3px solid green";
        errorconfirm.style.visibility = "hidden";
    }

    let role=document.getElementById('role')




    if (allValid) {
    
        let obj = {
            "name": name.value,
            "Email": email.value,
            "Username": username.value,
            "Password": password.value,
            "Phone": phone.value,
            "role":role.value
        };
    
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const userExists = users.some(user => user.Email === obj.Email || user.Username === obj.Username);
                const emailcheck=users.some(user=>user.Email==obj.Email)
                const usernamecheck=users.some(user=>user.Username==obj.Username)
                if(emailcheck){
                    erroremail.style.visibility = "visible";
                    email.style.border = "3px solid red";
                    email.value = "";
                }

                if(usernamecheck){
                    errorusername.style.visibility = "visible";
                    username.style.border = "3px solid red";
                    username.value = "";
                }
    
                if (!userExists) {
                  
                    hideCart("cartOverlay", "cartModal");
                    return fetch('http://localhost:3000/users', {
                        method: "POST",
                        body: JSON.stringify(obj)
                    });
                   

                    
                } else {
                    console.log("User already exists!");
                   

                            }
            })
            .then(response => {
                if (response) console.log("add the user....");
            })
            .catch(error => console.error("An error occurred:", error));

    }
});
////////////////////////////////////////////////////////////////////////////////////
//delete


// let cencelproductdelete=document.getElementById("cencelproductdelete")

// cencelproductdelete.addEventListener("click", function () {
//     hideCart("cartOverlaydelete", "cartModaldelete");
//   });


  
