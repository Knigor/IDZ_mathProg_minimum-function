
let start = document.getElementById("button1");

let someMethod = document.querySelector('input[name="method"]:checked').value;

function getMethod() {
    let someMethod = document.querySelector('input[name="method"]:checked').value;

    if (someMethod == 'golden'){
        document.location.replace("/goldenMethod/goldenMethod.html");
    } else if (someMethod == 'bisection'){
        document.location.replace("/bisectionMethod/bisection.html");
    } else if (someMethod == 'dichotomy'){
        document.location.replace("/dichotomyMethod/dichotomyMethod.html"); 
    } else if (someMethod == 'fibonacci'){
        document.location.replace("/fibonacciMethod/fibonacciMethod.html"); 
    }

    console.log("Выбран метод: ",someMethod);

}

start.addEventListener('click', function (){
    getMethod()
})


