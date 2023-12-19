let aInput = document.getElementById("a");
let bInput = document.getElementById("b");
let functionInput = document.getElementById("function");
let saveValuesButton = document.getElementById("saveValues");
let loadValuesButton = document.getElementById("loadValues");
let saveFunctionButton = document.getElementById("saveFunction");
let insertTestFunctionButton = document.getElementById("insertTestFunction");

let startGolden = document.getElementById("startGolden");

let exitMain = document.getElementById("exit");

exitMain.addEventListener("click", () => {
  document.location.replace("/");
});

startGolden.addEventListener("click", function () {
  let checkFunc = document.getElementById("function").value;

  try {
    let parsedExpression = math.parse(checkFunc);

    let convert = parsedExpression.toString().replace(/\^/g, "**");
    console.log(convert);

    let targetFunction = new Function("x", "return " + convert);

 

    let a = Number(aInput.value);
    let b = Number(bInput.value);


    let n = 10; // Задаем кол-во итераций



    function fibonacci (n){
      let ph1 = (1 + Math.sqrt(5) ) / 2  
    
      let ph2 = (1 - Math.sqrt(5) ) / 2 

      return Math.round((ph1 ** n - ph2 ** n) / Math.sqrt(5));
      
    }
    
    
    let count = 1;

    let output = "";

    function fibonacciSearch (a,b,n) {

      const epsilon = 0.001;

      const fibNums = Array.from({length: n + 1}, (_, i) => fibonacci(i));

      let L = a + (b - a) * (fibNums[n - 2] / fibNums[n]);
      let R = a + (b - a) * (fibNums[n - 1] / fibNums[n]);

      while (Math.abs(b - a) > epsilon){
        output += `Шаг: ${count},\n L = ${L};\n R = ${R};\n`;
        output += "Интервал:\n[a;b]:  " + `[${a};${b}]\n`;

        if (targetFunction(L) < targetFunction(R)) {
          b = R;
          R = L;
          L = a + (b - a) * (fibNums[n - 2] / fibNums[n]);
      } else {
          a = L;
          L = R;
          R = a + (b - a) * (fibNums[n - 1] / fibNums[n]);
      }

      count++;
      }

      const result = (a + b) / 2;
      return result;

    }
    

    const result = fibonacciSearch(a, b, n);
    output += "\n/////////////////////////";
    output += "Точка минимума: " + result + "\n";

    function generateUniqueFilename(extension = 'txt') {
      const timestamp = new Date().getTime();
      return `fibonacciOutput_${timestamp}.${extension}`;
    }
    
    // Пример использования
    const uniqueFilename = generateUniqueFilename('txt');
    console.log(uniqueFilename);
    

  
    saveToFile(output, uniqueFilename);
    

  
  console.log("Значение функции в точке экстремума:", targetFunction(result));



  } catch (error) {
    console.error("Ошибка при обработке введенной функции: " + error.message);
    alert("Ошибка при обработке введенной функции: " + error.message);
  }
});


// Сохранение 

saveValuesButton.addEventListener("click", function () {
    
     
  let values = `Значение переменной A: ${aInput.value}\nЗначение переменной B: ${bInput.value}\nИскомая функция: ${functionInput.value}`;
  saveToFile(values, "values.txt");


});



// Загрузка файла
loadValuesButton.addEventListener("click", function () {
  // Создаем input элемент для выбора файла
  var input = document.createElement('input');
  input.type = 'file';

 
  input.addEventListener('change', function (event) {
    var file = event.target.files[0];

    if (file) {
      // Используем FileReader для чтения содержимого файла
      var reader = new FileReader();

      reader.onload = function (e) {
        // Получаем содержимое файла
        var fileContent = e.target.result;

   
        var valuesArray = fileContent.split('\n');
        aInput.value = valuesArray[0].split(': ')[1];
        bInput.value = valuesArray[1].split(': ')[1];
        functionInput.value = valuesArray[2].split(': ')[1];
      };

      // Читаем содержимое файла как текст
      reader.readAsText(file);
    }
  });

  // Симулируем клик по input для вызова окна выбора файла
  input.click();
});





function saveToFile(data, filename) {
  let blob = new Blob([data], { type: 'text/plain' });
  

  saveAs(blob, filename);
}  