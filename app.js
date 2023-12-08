
let start = document.getElementById("button1");

let someMethod = document.querySelector('input[name="method"]:checked').value;

function getMethod() {
    let someMethod = document.querySelector('input[name="method"]:checked').value;

    if (someMethod == 'golden'){
        document.location.replace("/goldenMethod/goldenMethod.html");
    }

    console.log("Выбран метод: ",someMethod);

}

start.addEventListener('click', function (){
    getMethod()
})


