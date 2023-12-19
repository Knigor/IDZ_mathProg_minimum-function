


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



startGolden.addEventListener("click",function(){

    let checkFunc = document.getElementById("function").value;

    try {

        let parsedExpression = math.parse(checkFunc);
        console.log("Функция f(x): " + parsedExpression.toString());
    
        let convert = parsedExpression.toString().replace(/\^/g, '**');
        console.log(convert);

        let f = new Function('x', 'return ' + convert);

        const E = 0.001;

        let a = Number(aInput.value);
        let b = Number(bInput.value);

        

        let L = b - a;

        let xmin = (a + b) / 2;
        let i = 1;

        let output = "";
        
        while (Math.abs(b - a) > E) {

            

            L = b - a;
            let x1 = a + (L / 4);
            let x2 = b - (L / 4);
            let fx1 = f(x1);
            let fx2 = f(x2);
            output += "/////////////////////////////////////////\n";
            output += "Шаг: " + i + "\n";
            output += "Интервал:\n[a;b]:  " + `[${a};${b}]\n`;
        
            if (fx1 > f(xmin)) {
                a = x1;
            }
        
            if (fx2 > f(xmin)) {
                b = x2;
            }
        
            xmin = (a + b) / 2;
        
            
            
            output += "L: " + L + "\n";
            
            output +="Значение x1: " + x1 + "\n";
            output +="Значение x2: " + x2 + "\n";
            output +="Значение xmin: " + xmin + "\n";
            output +="Значение fx1: " + fx1 + "\n";
            output +="Значение fx2: " + fx2 + "\n";
            output +="Значение fx3: " + f(xmin) + "\n";
        
            i++;

            

            if (i == 100){
            let message = confirm("Вы достигли 100 итераций, продолжить?")
                if (message == false){
                    break;
                } else if (i == 300){
                    break;
                }
            }

        }

        output += "/////////////////////////////////////////\n";
        output += "Минимум функции равен: " + xmin.toFixed(3);

        function generateUniqueFilename(extension = 'txt') {
            const timestamp = new Date().getTime();
            return `bisectionOutput_${timestamp}.${extension}`;
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