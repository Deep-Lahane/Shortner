function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // To chage color and background of "Copy" button for 2sec
    const copyBtn = document.getElementById("copy_btn");
    function changeColorAndBg() {
        return new Promise(function (resolve, reject) {
            copyBtn.innerText = "Copied!";
            copyBtn.style.backgroundColor = "#01796F";
            copyBtn.style.color = "#fff";
            setTimeout(resolve, 2000);
        }).then(function () {
            copyBtn.innerText = "Copy";
            copyBtn.style.backgroundColor = "#d8dff5";
            copyBtn.style.color = "#274caa";
        });
    }
    changeColorAndBg();
}

const  hamburger = document.getElementById('toggle');
const navLeft = document.querySelector('header nav .left');
const navRight = document.querySelector('header nav .right');
const header = document.querySelector('header')

hamburger.addEventListener('click', (e) => {
    hamburger.classList.toggle('active')
    if(hamburger.classList.contains('active')){
        navLeft.style.display = navRight.style.display = 'block';
        header.style.height = '100vh';
        console.log("SUCCESS");
    }else{
        navLeft.style.display = navRight.style.display = 'none';
        header.style.height = '4rem'
        console.log("FAILED");
    }
})

const loginBtn = document.querySelector('#login_signup .login button')
const signBtn = document.querySelector('#login_signup .signup button')
loginBtn.addEventListener('click',(e)=>{
    signBtn.classList.remove('active')
    loginBtn.classList.add('active')
    signBtn.style.color='black';
    loginBtn.style.color='white';
})
signBtn.addEventListener('click',(e)=>{
    loginBtn.classList.remove('active')
    signBtn.classList.add('active');
    loginBtn.style.color='black';
    signBtn.style.color='white';
})


