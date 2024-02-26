
// js/homePage.js

const categoryItems = document.querySelectorAll(".dropdown-item");
const categoryInput = document.querySelectorAll("#categoryInput");
const categoryBtn = document.querySelector("#categoryBtn");
const form = document.getElementById("form1");
const addExpenseBtn = document.getElementById("submitBtn");
const table = document.getElementById("tbodyId");

const buyPremiumBtn = document.getElementById("buyPremiumBtn");
const reportsLink = document.getElementById( "reportLink" );
const leaderboardLink = document.getElementById("leaderboardLink");

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

    const user = JSON.parse(localStorage.getItem("user"));

    const token = user.token;

    console.log("token is :",token);


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

       const dateStr = ` ${formattedDay}/${formattedMonth}/${year}`;


       const res = await axios.post("http://localhost:3000/expense/addExpense",{
        date: dateStr,
        category:categoryValue,
        description: descriptionValue,
        amount: parseFloat(amountValue)
       },{
        headers : {Authorization : token}
       })
       .then((res)=>{
        if(res.status==200){
            window.location.reload();
        }
       })
       .catch((err)=>{
        console.error("Server responded with an unexpected status:", res.status);

       })

    } catch (error) {
        console.error("Unable to add transaction, something went wrong!", error);
    }
}


// fetch all expenses 

//-----------------------------------------------------------------------------------------------------------------------

async function getAllExpenses(){

    const user = JSON.parse(localStorage.getItem("user"));

    const token = user.token;

    console.log("token is :",token);


    try {
        //console.log("token is :",token);
        const res = await axios.get("http://localhost:3000/expense/getAllExpenses",{headers : {Authorization : token}});
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
       editBtn.className = "editDelete btn btn-secondary edit";
       editBtn.appendChild(document.createTextNode("Edit"));

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

    const user = JSON.parse(localStorage.getItem("user"));

    const token = user.token;

    console.log("token is :",token);



    try{
    
        if(e.target.classList.contains("delete")){
            let tr = e.target.parentElement.parentElement;
            let id = tr.children[0].textContent;
            const res = await axios.get(`http://localhost:3000/expense/deleteExpense/${id}`,{headers : {Authorization : token}});
            window.location.reload();
        }


    }
    catch {

    (err) => console.log(err);

    }
}


// edit expenses 

//-------------------------------------------------------------------------------------------------------------------------------------

async function editExpense(e) {

    const user = JSON.parse(localStorage.getItem("user"));

    const token = user.token;

    console.log("token is :",token);



    try{
        const categoryValue = document.getElementById("categoryBtn");
        const descriptionValue = document.getElementById("descriptionValue");
        const amountValue = document.getElementById( "amountValue" );
        const addExpenseBtn = document.getElementById("submitBtn");

        if(e.target.classList.contains('edit')){
            let tr = e.target.parentElement.parentElement;
            let id = tr.children[0].textContent;
            const res = await axios.get("http://localhost:3000/expense/getAllExpenses",{headers : {Authorization : token}});

            res.data.forEach((expense)=>{
                 if(expense.id==id) {
                    console.log("id in res : ",expense.id);
                    categoryValue.textContent = expense.category;
                    descriptionValue.value = expense.description;
                    amountValue.value = expense.amount;
                    addExpenseBtn.textContent = "Update";
                    
                    addExpenseBtn.removeEventListener("click",addExpense);

                    addExpense.addEventListener("click",async function Update(e){
                        e.preventDefault();
                        console.log("request to backend for edit");
                        const res = await axios.post(`http://localhost:3000/expense/editExpense/${id}`,{
                            category:categoryValue.textContent.trim(),
                            description:descriptionValue.value,
                            amount:amountValue,
                        });
                        window.location.reload();
                    });

                 }
            });
    }
}catch {
 (err)=> console.log(err);
}
}


async function buyPremium(e) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    console.log("token is:", token);

    const res = await axios.get("http://localhost:3000/purchase/premiumMembership", {
        headers: { Authorization: token }
    });

    console.log(res);

    var options = {
        key: res.data.key_id,
        order_id: res.data.order.id,
        handler: async function (response) {
            if (response.error) {
                alert("Transaction Failed. Please try again or contact support.");
                console.error("Razorpay Payment Error:", response.error);
            } else {
                const updateRes = await axios.post(
                    "http://localhost:3000/purchase/updateTransactionStatus",
                    {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    },
                    { headers: { Authorization: token } }
                );

                console.log(updateRes);

                if (updateRes.data.token) {
                    alert("Welcome to our Premium Membership! You now have access to Reports and LeaderBoard.");
                    localStorage.setItem("token", updateRes.data.token);
                }
            }
        },
        // Add the payment.failed callback
        modal: {
            ondismiss: function () {
                alert("Transaction Failed. Please try again or contact support.");
            }
        }
    };

    // Check if rzp1 is already initialized and close it
    if (window.rzp1) {
        window.rzp1.close();
    }

    // Create a new instance of Razorpay
    window.rzp1 = new Razorpay(options);

    // Open the Razorpay modal
    window.rzp1.open();
    e.preventDefault();
}

async function isPremium () {

    const user = JSON.parse(localStorage.getItem("user"));

    const token = user.token;

    console.log("token is :",token);

    const res = await axios.get("http://localhost:3000/user/isPremiumUser",{
        headers : { Authorization : token }
    });
    console.log("res is isPremium function is :",res.data.isPremiumUser);

    if(res.data.isPremiumUser) {
        console.log("isPremium if condition is working fine");
        buyPremiumBtn.innerHTML = "Premium Member &#128081";
        reportsLink.removeAttribute("onclick");
        leaderboardLink.removeAttribute( "onclick" );
        buyPremiumBtn.removeEventListener('click',buyPremium);
    }
}

buyPremiumBtn.addEventListener( 'click' , buyPremium );
addExpenseBtn.addEventListener("click",addExpense);
document.addEventListener("DOMContentLoaded",isPremium);
document.addEventListener("DOMContentLoaded",getAllExpenses);

table.addEventListener("click",(e)=>{
    deleteExpense(e);
});

table.addEventListener("click",(e)=>{
    editExpense(e);
});