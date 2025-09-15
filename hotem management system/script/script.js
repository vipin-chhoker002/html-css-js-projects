let allUserInfo = [];
let regForm = document.querySelector('.reg-form');
let loginForm = document.querySelector('.login-form');
let allInput = regForm.querySelectorAll('input');
let allLoginInput = loginForm.querySelectorAll('input');

let regBtn = regForm.querySelector('button');
let loginBtn = loginForm.querySelector('button');

if (localStorage.getItem("allUserInfo") != null) {
    allUserInfo = JSON.parse(localStorage.getItem('allUserInfo'));

}
console.log(allUserInfo)

regForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = allUserInfo.find((data) => {
        console.log(data.mobile == allInput[2])
        return data.email == allInput[4].value;

    })
    if (checkEmail == undefined) {// this is the only program for this allINput method
        let data = {}
        allInput.forEach((el) => {
            let key = el.name;
            data[key] = el.value;
        })
        regBtn.innerText = "Processing....";
        setTimeout(() => {
            regBtn.innerText = "Register....";
            allUserInfo.push(data);
            localStorage.setItem("allUserInfo", JSON.stringify(allUserInfo))
            regForm.reset("");
            swal("Good job!", "Registration sucess", "success");

        }, 2000);

    } else {
        swal('Failed !', 'Registration Faild', 'failed')
    }
};

loginForm.onsubmit = (e) => {
    e.preventDefault();
    if (allLoginInput[0].value != "") {
        if (allLoginInput[1].value != "") {

            let checkEmail = allUserInfo.find((data) => {
                return data.email == allLoginInput[0].value;

            });

            if (checkEmail != undefined) {
                let checkPassword = checkEmail.password;
                if (checkPassword == allLoginInput[1].value) {
                    loginBtn.innerText = "processing...."
                    setTimeout(() => {
                        loginBtn.innerText = "login";
                        swal("login", "Thanku for login", 'success');
                        sessionStorage.setItem("__au__", JSON.stringify(checkEmail));
                        window.location = 'profile/profile.html';
                    }, 2000)
                } else {
                    swal("warning", "Password not match", 'warning')

                }

            } else {
                swal("warning", "email not found", 'warning')

            };

        } else {
            alert("pass not found")

        }
    } else {
        swal("warning", "please enter email", 'warning')
    }
}


