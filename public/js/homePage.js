const { default: axios } = require("axios");

const categoryItems = document.querySelectorAll(".dropdown-item");
const categoryInput = document.querySelectorAll("#categoryInput");
const categoryBtn = document.querySelector("#categoryBtn");
const form = document.getElementById("form1");
const addExpenseBtn = document.getElementById("submitBtn");
const table = document.getElementById("tbodyId");

categoryItems.forEach((item) => {

item.addEventListener("click",(e)=>{
    const selectedCategory = e.target.getAttribute("data-value");
    categoryBtn.textContent = e.target.textContent;
    categoryInput.value = selectedCategory;
});
});

// Add Expense 

//-----------------------------------------------------------------------------------------------------------------------------


async function addExpense() {
    try{
        const category = document.getElementById("categoryBtn");;
        const description = document.getElementById("descriptionValue");
        const  amount = document.getElementById("amountValue");
        const categoryValue = category.textContent.trim();
        const descriptionValue = description.value.trim();
        const amountValue = amount.value.trim();

        if(categoryValue=="Select Category"){
            alert("Add the Description!");
            window.location.href("/homePage");
        }
        if(!parseInt(amountValue)){
            alert("Please enter a valid amount");
            window.location.href("/homePage");
        }
        if(!descriptionValue){
            alert("Description can't be empty!");
            window.location.href("/homePage");
        }

        const currentDate = new Date();

        const day = currentDate.getDate();

        const month = currentDate.getMonth() + 1;

        const year = currentDate.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedMonth = month<10 ? `0${month}` : month;

       const dateStr = ` ${formattedDay}/${formattedMonth}/${year}`

       const res = await axios.post("",{
        date: dateStr,
        category:categoryValue,
        description: descriptionValue,
        amount: parseFloat(amountValue)
       })
       .then((res)=>{
        if(res.status==200){
            window.location.reload();
        }
       })
       .catch((err)=>{
        console.log(err);
       })

    } catch {
        console.error("Unable  to add transaction,something went wrong!");
    }
}


// fetch all expenses 

//-----------------------------------------------------------------------------------------------------------------------

async function getAllExpenses(){
    try {
        const res = await axios.get("");
        console.log("fetch expenses has given : ",res.data);

        res.data.forEach((expenses)=>{

       const id = expenses.id;
       const date = expenses.date;
       const categoryValue = expenses.category;
       const descriptionValue = expenses.description;
       const amountValue = expenses.amount;

        })
    }
}
