let email =document.getElementById("email")
let erroremail=document.getElementById("erroremail")

let password =document.getElementById("password")
let errorpassword=document.getElementById("errorpassword")

let submit =document.getElementById("submit")

let signUp=document.getElementById('sign-up')

email.addEventListener("blur",function(){
    const pattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    validateInput(this,erroremail,pattern);
});

password.addEventListener("blur",function(){
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    validateInput(this,errorpassword,pattern);
});

submit.addEventListener('click',function(){
    event.preventDefault(); 

    let allValid = true;

    checkField(email, erroremail, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    checkField(password, errorpassword, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    
    if (allValid) {

        let obj = {
            
            "Email": email.value,
            "Password": password.value,
        };

        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(user=>{
            const userExists = user.some(user => user.Email === obj.Email || user.Password === obj.Password);
            const emailcheck=user.some(user=>user.Email==obj.Email)
            const passwordcheck=user.some(user=>user.Password === obj.Password)
            const matchingUser = user.find(u => u.Email === obj.Email && u.Password === obj.Password);


            if(!emailcheck){
                erroremail.style.visibility = "visible";
                email.style.border = "3px solid red";
                email.value = "";
            }
            if(!passwordcheck){
                errorpassword.style.visibility = "visible";
                password.style.border = "3px solid red";
                password.value = "";
            }

            if (userExists) {

                // window.location.href = "sellerDashboard.html";
                if(matchingUser.rules=='customer'){
                    window.location.href = "home.html";
                }else if(matchingUser.rules=='seller'){
                    window.location.href = "sellerDashboard.html";
                }else if(matchingUser.rules=='admin'){
                    window.location.href = "adminDashboard.html";
                }
               
            }
           



        }

        )
        .then(response => {
            if (response) console.log("add the user....");
        })
        .catch(error => console.error("An error occurred:", error));


    }
})

signUp.addEventListener('click',function(){
    window.location.href = "register.html";

})



// window.addEventListener('load', function () {
//     let form = this.document.querySelector('.logIn form')
//     let userEmail = this.document.querySelector('#email')
//     let password = this.document.querySelector('#password')

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         fetch("../index.json").then((res) => {
//             res.json().then((user) => {
//                 console.log(user)
//                 for (let k in user) {
//                     console.log(k)
                    

//                 }
//                 // if (found) {
//                 //     console.log("FOUND")
//                 // } else {
//                 //     console.log("NOT FOUND")
//                 // }
//             })
//         }).catch(e => console.log("erroe"))
//     })

// })