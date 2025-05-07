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
                if(matchingUser.role=='customer'){
                    window.location.href = "home.html";
                }else if(matchingUser.role=='seller'){
                    window.location.href = "sellerDashboard.html";
                }else if(matchingUser.role=='admin'){
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

