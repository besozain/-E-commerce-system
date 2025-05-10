

window.addEventListener('load',function(){
  let createdImg;
  let logOut = this.document.querySelector('.logOut')
  if(sessionStorage.getItem('loginCustomerUsername') || sessionStorage.getItem('loginSellerUsername') || sessionStorage.getItem('loginAdminUsername')) {
    let li = this.document.querySelector('#header li:last-of-type')
    let nav = this.document.querySelector('nav')

    nav.classList.add("targetLI")
    console.log(nav)
    createdImg = this.document.createElement('img')
    createdImg.setAttribute('src', "../assets/images/user.png")
    console.log(createdImg)
    li.innerHTML = ''
    console.log(li)
    li.appendChild(createdImg)
  }
  
  logOut.addEventListener('click' ,function() {
    sessionStorage.clear()
    window.location.href = "../index.html";
  })
})