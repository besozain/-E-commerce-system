let name =document.getElementById("name")
let errorname=document.getElementById("errorname")

let email =document.getElementById("email")
let erroremail=document.getElementById("erroremail")

let username =document.getElementById("username")
let errorusername=document.getElementById("errorusername")

let password =document.getElementById("password")
let errorpassword=document.getElementById("errorpassword")

let confirmpass =document.getElementById("confirm")
let errorconfirm=document.getElementById("errorconfirm")

let phone =document.getElementById("phone")
let errorphone=document.getElementById("errorphone")

let submit =document.getElementById("submit")

let signIn=document.getElementById("sign-in")




name.addEventListener("blur",function(){
    const pattern = /^[A-Za-z\s]{3,}$/;
    validateInput(this,errorname,pattern);
});




email.addEventListener("blur",function(){
    const pattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    validateInput(this,erroremail,pattern);
});



username.addEventListener("blur",function(){
    const pattern =  /^[A-Za-z\s]{3,}$/;
    validateInput(this,errorusername,pattern);
});



password.addEventListener("blur",function(){
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    validateInput(this,errorpassword,pattern);
});

confirmpass.addEventListener("blur", function () {
    if(password.value=="" || password.value !=confirmpass.value ){
        this.style.border = "3px solid red";
        this.value = "";
        errorconfirm.style.visibility = "visible";
        // this.focus();
    }else{
        this.style.border = "3px solid green";
        errorconfirm.style.visibility = "hidden";
    }
  
});

phone.addEventListener("blur",function(){
    const pattern = /^(?:\+20|0)(10|11|12|15)[0-9]{8}$/;
    validateInput(this,errorphone,pattern);
});





submit.addEventListener("click", function () {
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

    let rules=document.getElementById('rules')




    if (allValid) {
    
        let obj = {
            "name": name.value,
            "Email": email.value,
            "Username": username.value,
            "Password": password.value,
            "Phone": phone.value,
            "rules":rules.value
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
                    if(rules.value=="seller"){
                        window.location.href = "sellerDashboard.html";

                    }else if (rules.value=="customer"){
                        window.location.href = "home.html";
                    }

                    return fetch('http://localhost:3000/users', {
                        method: "POST",
                        body: JSON.stringify(obj)
                    });

                    
                } else {
                    console.log("User already exists!");
                    // alert("User already exists in the database.");    
                    // name.value=""
                    // email.value=""
                    // username.value=""
                    // password.value=""
                    // phone.value=""
                    // confirmpass.value=""

                            }
            })
            .then(response => {
                if (response) console.log("add the user....");
            })
            .catch(error => console.error("An error occurred:", error));

    }
});




signIn.addEventListener('click',function(){
    window.location.href = "login.html";

})