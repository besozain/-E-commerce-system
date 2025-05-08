window.addEventListener('load' , function() {
    let productCount = this.document.querySelectorAll('.stat-card p')[0]
    let userCount = this.document.querySelectorAll('.stat-card p')[1]
    let orderCount = this.document.querySelectorAll('.stat-card p')[2]

    this.fetch('http://localhost:3000/orders').then((response)=> {
        response.json().then((data) => {
            orderCount.textContent = data.length
        })
    }).catch(e => console.log(e))
    this.fetch('http://localhost:3000/products').then((response)=> {
        response.json().then((data) => {
            productCount.textContent = data.length
        })
    }).catch(e => console.log(e))
    this.fetch('http://localhost:3000/users').then((response)=> {
        response.json().then((data) => {
            userCount.textContent = data.length
        })
    }).catch(e => console.log(e))

     
})