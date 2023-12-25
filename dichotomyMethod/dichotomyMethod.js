
let aInput = document.getElementById("a");
let bInput = document.getElementById("b");
let functionInput = document.getElementById("function");
let saveValuesButton = document.getElementById("saveValues");
let loadValuesButton = document.getElementById("loadValues");
let saveFunctionButton = document.getElementById("saveFunction");
let insertTestFunctionButton = document.getElementById("insertTestFunction");


let startGolden = document.getElementById("startGolden");

let exitMain = document.getElementById("exit");

let minFx = Infinity;

exitMain.addEventListener("click", () => {
  document.location.replace("/");
})



startGolden.addEventListener("click", function(){

  let checkFunc = document.getElementById("function").value;


  try {

    let parsedExpression = math.parse(checkFunc);
    
    let convert = parsedExpression.toString().replace(/\^/g, '**');
    console.log(convert);

    let f = new Function('x', 'return ' + convert);

    const E = 0.001;

    const delta = 0.0001;

    let a = Number(aInput.value);
    let b = Number(bInput.value);

    let i = 1; // Счетчик итераций

    console.log(a);
    console.log(b);
    console.log(f(1));

    let mid = (a + b) / 2;

    let x1 = mid - delta / 2;
    let x2 = mid + delta / 2;

    let fx1 = f(x1);

    let fx2 = f(x2);


    if (fx1 < fx2){
      b = x2
    } else {
      a = x1
    }
    
    
    let output = "";

    while (Math.abs(b - a) > E){

      output += "/////////////////////////////////\n";

      output += "Шаг: " + i + "\n";
      output += "Значение x1: " + x1 + "\n";
      output += "Значение x2: " + x2 + "\n";
      output += "Значение fx1: " + fx1 + "\n";
      output += "Значение fx2: " + fx2 + "\n";
      output += "Интервал:\n[a;b] " + `[${a};${b}]` + "\n";

      mid = (a + b) / 2;
      x1 = mid - delta / 2;
      x2 = mid + delta / 2;


      fx1 = f(x1);

      fx2 = f(x2);

      if (fx1 < fx2){
        b = x2
      } else {
        a = x1
      }

      i++;

      if (i == 100) {
        let message = confirm("Вы достигли 100 итераций, продолжить?")
        if (message == false){
          break;
      } else if (i == 300){
          break;
      }

      }
      minFx = Math.min(minFx, fx1, fx2);
    }

    let result = (a + b) / 2

    output += "/////////////////////////////////////////\n";
    output += "Точка минимума функции: " + result.toFixed(3);
    output += "\nМинимальное значение функции: " + minFx.toFixed(3) + "\n";

    function generateUniqueFilename(extension = 'txt') {
      const timestamp = new Date().getTime();
      return `dichotomyOutput_${timestamp}.${extension}`;
    }


      // Пример использования
      const uniqueFilename = generateUniqueFilename('txt');
      console.log(uniqueFilename);
          

        
      saveToFile(output, uniqueFilename);
          


  } catch (error) {
    console.error("Ошибка при обработке введенной функции: " + error.message);
    alert("Ошибка при обработке введенной функции: " + error.message);

  }



})

// Сохранение

saveValuesButton.addEventListener("click", function (message) {
    
     
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