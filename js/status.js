window.addEventListener('load' , function() {
    let productCount = this.document.querySelectorAll('.stat-card p')[0]
    let userCount = this.document.querySelectorAll('.stat-card p')[1]
    let orderCount = this.document.querySelectorAll('.stat-card p')[2]

    this.fetch('http://localhost:3000/orders').then((response)=> {
        response.json().then((data) => {
            this.localStorage.setItem('orders', JSON.stringify(data))
            let orderInLocal = JSON.parse(this.localStorage.getItem('orders'))
            orderCount.textContent = orderInLocal.length
        })
    }).catch(e => console.log(e))
    this.fetch('http://localhost:3000/products').then((response)=> {
        response.json().then((data) => {
            this.localStorage.setItem('products', JSON.stringify(data))
            let productInLocal = JSON.parse(this.localStorage.getItem('products'))
            productCount.textContent = productInLocal.length
        })
    }).catch(e => console.log(e))
    this.fetch('http://localhost:3000/users').then((response)=> {
        response.json().then((data) => {
            this.localStorage.setItem('users', JSON.stringify(data))
            let userInLocal = JSON.parse(this.localStorage.getItem('users'))
            userCount.textContent = userInLocal.length
        })
    }).catch(e => console.log(e))

     
})