
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
})


startGolden.addEventListener("click", function () {
  let checkFunc = document.getElementById("function").value;

  try {
    var parsedExpression = math.parse(checkFunc);
    console.log("Функция f(x): " + parsedExpression.toString());

    let convert = parsedExpression.toString().replace(/\^/g, '**');
    console.log(convert);

    const E = 0.001;
    const t = 0.618;

    let a = 0;
    let b = 4;
    let i = 1;

    let x1 = b - (b - a) * t;
    let x2 = a + (b - a) * t;

    // Создаем функцию внутри блока кода, где она будет использоваться
    let f = new Function('x', 'return ' + convert);

    let fx1 = f(x1);
    let fx2 = f(x2);

    let output = "";

    while (E <= Math.abs(b - a)) {
      output += "Итерация: " + i + "\n";
      output += "x1: " + x1 + "\n";
      output += "x2: " + x2 + "\n";
      output += "fx1: " + fx1 + "\n";
      output += "fx2: " + fx2 + "\n";
      output += "Интервал:\n[a;b]:  " + `[${a};${b}]\n`;

      if (fx1 < fx2) {
        b = x2;
        x2 = x1;
        x1 = a + 0.382 * (b - a);
      } else {
        a = x1;
        x1 = x2;
        x2 = a + 0.618 * (b - a);
      }

      fx1 = f(x1);
      fx2 = f(x2);

      i++;
    }

    output += "\nКонечный интервал: " + `[${a.toFixed(3)}],[${b.toFixed(3)}]\n`;
    output += "Среднее значение: " + ((a + b) / 2).toFixed(3);


    function generateUniqueFilename(extension = 'txt') {
      const timestamp = new Date().getTime();
      return `goldenOutput_${timestamp}.${extension}`;
    }
    
    // Пример использования
    const uniqueFilename = generateUniqueFilename('txt');
    console.log(uniqueFilename);

    saveToFile(output, uniqueFilename);

  } catch (error) {
    console.error("Ошибка при обработке введенной функции: " + error.message);
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

  // Назначаем обработчик события change
  input.addEventListener('change', function (event) {
    var file = event.target.files[0];

    if (file) {
      // Используем FileReader для чтения содержимого файла
      var reader = new FileReader();

      reader.onload = function (e) {
        // Получаем содержимое файла
        var fileContent = e.target.result;

        // Устанавливаем значения в соответствующие поля ввода
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
