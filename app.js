//  desktop work controller
var uiController = (function () {

    var DOMstrings = {
        inputType : ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList : ".income__list",
        expensesList: ".expenses__list"
    }
    
    return {
        getInput: function (){
            return {
                type : document.querySelector(DOMstrings.inputType).value, //exp, inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value),
            };
        },
        getDOMStrings: function(){
         return DOMstrings;
        },
        clearFields: function(){
           var fields = document.querySelectorAll(
               DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //    Convert List to Array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (el, index, array){
                el.value= '';
            });

            // for(var i = 0; i < fieldsArr.length; i++){
            //     fieldsArr[i].value = "";
            // }

            fieldsArr[0].focus();
        },
        addListItem: function (item, type){
            // Income Expense elementiig aguulsan html prepare
            var html, list;
            if (type === "inc"){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCREPTION$$</div><div class="right clearfix"><div class="item__value">$$value$$</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
               
            }else{
                list = DOMstrings.expensesList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCREPTION$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div> </div>';
            }
            // Replace use change
            html = html.replace('%id%', item.id);
            html = html.replace('$$DESCREPTION$$', item.descreption);
            html = html.replace('$$value$$', item.value)
            // DOM ru oruulah
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    }
}) ();
// Sanhuu work controller
var financeController = (function () {
    var Income = function (id , descreption, value){
        this.id = id;
        this.descreption = descreption;
        this.value = value;
      
      }
      var Expense = function (id , descreption, value){
        this.id = id;
        this.descreption = descreption;
        this.value = value;
      
      }
      var data = {
        item : {
          inc: [],
          exp: [],
        },
        totals: {
          inc: 0,
          exp: 0
        }
      };
      return {
          addItem: function(type, desc, val){
              var item, id ;
              
              if (data.item[type].length === 0) id = 1; 
              else {
                 id = data.item[type][data.item[type].length - 1].id + 1;
              }
              if (type === "inc"){
                  item = new Income(id, desc, val);
              }else {
                  item = new Expense(id, desc, val)
              }

              data.item[type].push(item);

              return item;

          },
          seeData: function (){
              return data;
          },
      }

}) ();
// programm holbogch controller
var appController = (function (uiController, financeController) {

    var ctrlAddItem = function(){
        // 1. Оруулах өгөгдлийн дэлгэцээс олж авна.
         var input = uiController.getInput();
{
         if(input.description !== "" && input.value !== ""){
             // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        var item = financeController.addItem(input.type, input.description, input.value);

        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана..
        uiController.addListItem(item, input.type)
        uiController.clearFields();
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
         }
        
    }

     var setupEvenListeners = function (){
        var DOM = uiController.getDOMStrings();

        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
   
       document.addEventListener("keypress", function(event){
       if (event.keyCode === 13 || event.which === 13) {
           ctrlAddItem();
       }
       });
     };
     return {
         init: function (){
             console.log("Application started...");
             setupEvenListeners();
         }
     }

}) (uiController, financeController);
 
appController.init();