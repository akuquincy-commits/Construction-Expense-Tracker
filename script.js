const searchBar = document.getElementById("searchBar")
const expenseName = document.getElementById("expenseName")
const expenseCategory = document.getElementById("expenseCategory")
const expensePrice = document.getElementById("expensePrice")
const expenseDate = document.getElementById("expenseDate")
const addBtn = document.getElementById("addBtn")
const displayItems = document.getElementById("displayItems")
const saveBtn = document.getElementById("saveBtn")
const totalAmount = document.getElementById("totalAmount")
const highestExpense = document.getElementById("highestExpense")
const lowestExpense = document.getElementById("lowestExpense")
const numberOfExpenses = document.getElementById("numberOfExpenses")
const spendingInDate = document.getElementById("spendingInDate")
const dateValue = document.getElementById("dateValue") 
const inputForm = document.getElementsByClassName("inputForm")
const addItemInactive = document.getElementById("addItemInactive")

 const today = new Date() 


const expenses = JSON.parse(localStorage.getItem("expenses")) || []
refreshUI(expenses)
dateSpending()


let editingIndex = null

saveBtn.style.display = "none"

addBtn.addEventListener("click", addExpense)

function addExpense(){
   const expenseNameValue = expenseName.value
   const expenseCategoryValue = expenseCategory.value
   const expensePriceValue = Number(expensePrice.value)
   const expenseDateValue = expenseDate.value
   

   if(expenseNameValue === "" || expenseCategoryValue === "" || expensePriceValue <= 0 || expenseDateValue === ""){
    alert("Please Fill The Form Completely")
    return
   }

   expenses.unshift({
    name: expenseNameValue,
    category: expenseCategoryValue,
    price: expensePriceValue,
    date: expenseDateValue,
    id:Date.now()
   })

   localStorage.setItem("expenses", JSON.stringify(expenses))

refreshUI(expenses)
dateSpending()
closeForm()


   expenseName.value = ""
   expenseCategory.value = ""
   expensePrice.value = ""
   expenseDate.value = ""

   
}

function displayExpense(someArray){
    displayItems.innerHTML = "<p> </p>"
    if(someArray.length === 0){
        displayItems.classList = "noItems"
        displayItems.innerHTML = `<p style="font-size: 24px; color: black;"> No Expenses TO Show</p>`
        return 
   }else if(someArray.length > 0){
        someArray.forEach( (expense, index) => {
         displayItems.classList.add("yesItems")   
        displayItems.innerHTML += `<p class="item"><span  class="expenseTitles">${expense.name}</span><span class="expenseTitles">${expense.category}</span><span class="expenseTitles">${expense.price}$</span><span class="expenseTitles">${expense.date}</span><span class="optionsDisplay" class="expenseTitles"><button class="delBtn" onclick="delExpense(${index})">Del</button><button class="editBtn" onclick="editExpense(${index})">Edit</button></span></p>`
    });
   
   }
    
}

function delExpense(index){

    expenses.splice(index, 1)
     
    localStorage.setItem("expenses", JSON.stringify(expenses))

    refreshUI(expenses)
     dateSpending()
    
}

function editExpense(index){

    addBtn.style.display = "none"
    saveBtn.style.display = ""

    editingIndex = index

   expenseName.value = expenses[editingIndex].name
   expenseCategory.value = expenses[editingIndex].category
   expensePrice.value = expenses[editingIndex].price
   expenseDate.value = expenses[editingIndex].date
   
   displayTotal(expenses)
   displayExtra(expenses)
    dateSpending()
    displayForm()
   
}

saveBtn.addEventListener("click", save)

function save(){
if(expenseName.value === "" || expenseCategory.value === "" || expensePrice.value <= 0 || expenseDate.value === ""){
    alert("Please Fill The Form Completely")
    return
   }else{
      expenses[editingIndex].name = expenseName.value
      expenses[editingIndex].category = expenseCategory.value
      expenses[editingIndex].price = Number(expensePrice.value)
      expenses[editingIndex].date = expenseDate.value

      localStorage.setItem("expenses", JSON.stringify(expenses))

      refreshUI(expenses)
      dateSpending()
      closeForm()

      expenseName.value = ""
      expenseCategory.value = ""
      expensePrice.value = ""
      expenseDate.value = ""

      saveBtn.style.display = "none"
      addBtn.style.display = ""

      editingIndex = null

      
      
      
   }


}

function displayTotal(someArray){
   const totalValue =  someArray.reduce((acc, expense) => {
        return acc + Number(expense.price)
    }, 0)
    totalAmount.innerText = totalValue
}

function filterExpense(){
    const filteredExpenses = expenses.filter(expense => {
       return expense.name.toLowerCase().includes(searchBar.value.toLowerCase().trim())
    })

    

    refreshUI(filteredExpenses)
}

   searchBar.addEventListener("input", filterExpense)

function displayExtra(someArray){
     if(someArray.length === 0){
      highestExpense.innerText = "0"
      lowestExpense.innerText = "0"
      numberOfExpenses.innerText = "0"
      return
   }
   const arrayLength = someArray.length
   numberOfExpenses.innerText = arrayLength
   
   const expensesPrices = someArray.map(expense => expense.price)
   const expenseNames = someArray.map(expense => expense.name)
    
   const highestExpenseValue = Math.max(...expensesPrices)
   const lowestExpenseValue = Math.min(...expensesPrices)

   const highestExpenseArray = someArray.find(expense => expense.price === Math.max(...expensesPrices))
   const lowestExpenseArray = someArray.find(expense => expense.price === Math.min(...expensesPrices))
 
   const highestExpenseName = highestExpenseArray.name
   const lowestExpenseName = lowestExpenseArray.name
    

   highestExpense.innerText = `${highestExpenseName} (${highestExpenseValue})`
   lowestExpense.innerText = `${lowestExpenseName} (${lowestExpenseValue})`
}

    
    
    
   
    




spendingInDate.addEventListener("change" , dateSpending)

function dateSpending(){
   const period = spendingInDate.value

   if(period === "today"){
     const currentDay = today.toISOString().slice(0,10)
    const todayExpense = expenses.filter(expense => expense.date === currentDay)
    const totalExpenseToday = todayExpense.reduce((acc, expense) => {
          return acc + expense.price
    }, 0)

    dateValue.innerText = totalExpenseToday

   }else if(period === "This Month"){
     const currentMonth = today.toISOString().slice(0,7)
    const monthExpense = expenses.filter(expense => expense.date.includes(currentMonth))
    const totalMonthExpense = monthExpense.reduce((acc, expense) => {
      return acc + expense.price
    }, 0)

    dateValue.innerText = totalMonthExpense
   }
   else{
     dateValue.innerText = "0000-00-0" 
   } 
}
 

function refreshUI(someArray){
   displayExpense(someArray)
    displayTotal(someArray)
    displayExtra(someArray)
}
function displayForm(){
   inputForm[0].classList.add("inputFormDisplay")
    document.body.classList.add("backdrop"); 
}
addItemInactive.addEventListener("click", displayForm)

function closeForm(){
    inputForm[0].classList.remove("inputFormDisplay");
    document.body.classList.remove("backdrop");
}