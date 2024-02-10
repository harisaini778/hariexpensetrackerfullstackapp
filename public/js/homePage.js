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


async function addExpense() {
    try{
        const category = document.getElementById("categoryBtn");;
        const description = document.getElementById("descriptionValue");
        
    }
}
