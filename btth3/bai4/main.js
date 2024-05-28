
const btnWelcome = document.getElementById('btnWelcome');


btnWelcome.addEventListener('click',() => {
    var msg = document.getElementsByName("msg")[0].value;
    alert(msg);

})