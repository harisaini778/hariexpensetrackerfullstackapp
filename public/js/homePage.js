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


       let tr = document.createElement("tr");
       tr.className = "trStyle";
       table.appendChild(tr);

       let idValue = document.createElement("th");
       idValue.setAttribute('scope','row');
       idValue.setAttribute('style','display:none');

       let th = document.createElement("th");
       th.setAttribute("scope","row");

       tr.appendChild(idValue);
       tr.appendChild(th);

       idValue.appendChild(document.createTextNode(id));
       th.appendChild(document.createTextNode(date));

       let td1 = document.createElement( 'td' );
       td1.appendChild( document.createTextNode( categoryValue ) );

       let td2 = document.createElement("td");
       td2.appendChild(document.createTextNode(descriptionValue)) ;

       let td3 = document.createElement("td");
       td3.appendChild(document.createTextNode(amountValue)) ;

       let td4 = document.createElement("td");

       let deleteBtn = document.createElement("button");
       deleteBtn.className = "editDelete btn btn-danger delete";
       deleteBtn.appendChild(document.createTextNode("Delete"));

       let  editBtn = document.createElement("button");
       editBtn.className = "editDelete btn btn-success edit";

       td4.appendChild(deleteBtn);
       td4.appendChild(editBtn);


       tr.appendChild(td1);
       tr.appendChild(td2);
       tr.appendChild(td3);
       tr.appendChild(td4);

     });
    }catch {
    (err)=>console.log(err);
    }
}


// delete expenses logic

//------------------------------------------------------------------------------------------------------------------------------

async function deleteExpense(e) {

    try{
    
        if(e.target.classList.contains("delete")){
            let tr = e.target.parentElement.parentElement;
            let id = tr.children[0].textContent;
            const res = await axios.get(``);
            window.location.reload();
        }


    }
    catch {

    (err) => console.log(err);

    }
}


// edit expenses 

//-------------------------------------------------------------------------------------------------------------------------------------

