window.addEventListener('load', function () {
    let form = this.document.querySelector('.logIn form')
    let userEmail = this.document.querySelector('#email')
    let password = this.document.querySelector('#password')

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch("../index.json").then((res) => {
            res.json().then((user) => {
                console.log(user)
                for (let k in user) {
                    console.log(k)
                    

                }
                // if (found) {
                //     console.log("FOUND")
                // } else {
                //     console.log("NOT FOUND")
                // }
            })
        }).catch(e => console.log("erroe"))
    })

})