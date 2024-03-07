// js/reports.js

const dateInput = document.getElementById("date");
const dateShowBtn = document.getElementById("dateShowBtn");
const tbodyDaily = document.getElementById("tbodyDailyId");
const tfootDaily = document.getElementById("tfootDailyId");

const monthInput = document.getElementById("month");
const monthShowBtn = document.getElementById("monthShowBtn");
const tbodyMonthly = document.getElementById("tbodyMonthlyId");
const tfootMonthly = document.getElementById("tfootMonthlyId");

const yearInput = document.getElementById("year-input");
const yearShowBtn = document.getElementById("yearShowBtn");
const tbodyYearly = document.getElementById("tbodyYearlyId");
const tfootYearly = document.getElementById("tfootYearlyId");

async function getDailyReport(e) {

    try {
      e.preventDefault();
      

      const user = JSON.parse(localStorage.getItem("user"));

      const token = user.token;

      const date = new Date(dateInput.value);

      const formattedDate = date.toISOString().split("T")[0];


  
      let totalAmount = 0;

      const res = await axios.post(
        "http://localhost:3000/reports/dailyReports",
        {
          date: formattedDate,
        },
        { headers: { Authorization: token } }
      );
  
      tbodyDaily.innerHTML = "";
      tfootDaily.innerHTML = "";

      console.log("res.data in getDailyReports fn : ",res.body,res.data);

      if (res.data.length === 0) {
        tbodyDaily.innerHTML =
          "<tr><td colspan='4'>No expenses found for this date</td></tr>";
        return;
      }

      
  
      res.data.forEach((expense) => {
        totalAmount += expense.amount;
  
        const tr = document.createElement("tr");
        tr.setAttribute("class", "trStyle");
        tbodyDaily.appendChild(tr);
  
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.appendChild(document.createTextNode(expense.date));
  
        const td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(expense.category));
  
        const td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(expense.description));
  
        const td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(expense.amount));
  
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      });
  
      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tfootDaily.appendChild(tr);
  
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
  
      td3.setAttribute("id", "dailyTotal");
      td4.setAttribute("id", "dailyTotalAmount");
      td3.appendChild(document.createTextNode("Total"));
      td4.appendChild(document.createTextNode(totalAmount));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMonthlyReport(e) {
    try {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("user"));

      const token = user.token;

      const monthInputValue = monthInput.value;

      const formattedMonth = monthInputValue.split("-")[1];
  
      let totalAmount = 0;

      const res = await axios.post(
        "http://localhost:3000/reports/monthlyReports",
        {
          month: formattedMonth,
        },
        { headers: { Authorization: token } }
      );
  
      tbodyMonthly.innerHTML = "";
      tfootMonthly.innerHTML = "";
  
      // Check if res.data is an array before using forEach
      if (Array.isArray(res.data)) {
        res.data.forEach((expense) => {
          totalAmount += expense.amount;
  
          const tr = document.createElement("tr");
          tr.setAttribute("class", "trStyle");
          tbodyMonthly.appendChild(tr);
  
          const th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.appendChild(document.createTextNode(expense.date));
  
          const td1 = document.createElement("td");
          td1.appendChild(document.createTextNode(expense.category));
  
          const td2 = document.createElement("td");
          td2.appendChild(document.createTextNode(expense.description));
  
          const td3 = document.createElement("td");
          td3.appendChild(document.createTextNode(expense.amount));
  
          tr.appendChild(th);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
        });
      } else {
        console.log("Invalid data format received from the server");
      }
  
      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tfootMonthly.appendChild(tr);
  
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
  
      td3.setAttribute("id", "monthlyTotal");
      td4.setAttribute("id", "monthlyTotalAmount");
      td3.appendChild(document.createTextNode("Total"));
      td4.appendChild(document.createTextNode(totalAmount));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    } catch (error) {
      console.log(error);
    }
  }


  async function getYearlyReport(e) {
    try {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("user"));

      const token = user.token;

      const yearInputValue = yearInput.value;

      //const formattedMonth = yearInputValue.split("-")[1];
  
      let totalAmount = 0;

      const res = await axios.post(
        "http://localhost:3000/reports/yearlyReports",
        {
          year: yearInputValue,
        },
        { headers: { Authorization: token } }
      );
  
      tbodyYearly.innerHTML = "";
      tfootYearly.innerHTML = "";
  
      // Check if res.data is an array before using forEach
      if (Array.isArray(res.data)) {
        res.data.forEach((expense) => {
          totalAmount += expense.amount;
  
          const tr = document.createElement("tr");
          tr.setAttribute("class", "trStyle");
          tbodyYearly.appendChild(tr);
  
          const th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.appendChild(document.createTextNode(expense.date));
  
          const td1 = document.createElement("td");
          td1.appendChild(document.createTextNode(expense.category));
  
          const td2 = document.createElement("td");
          td2.appendChild(document.createTextNode(expense.description));
  
          const td3 = document.createElement("td");
          td3.appendChild(document.createTextNode(expense.amount));
  
          tr.appendChild(th);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
        });
      } else {
        console.log("Invalid data format received from the server");
      }
  
      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tfootYearly.appendChild(tr);
  
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
  
      td3.setAttribute("id", "yearlyTotal");
      td4.setAttribute("id", "yearlyTotalAmount");
      td3.appendChild(document.createTextNode("Total"));
      td4.appendChild(document.createTextNode(totalAmount));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    } catch (error) {
      console.log(error);
    }
  }

  


  dateShowBtn.addEventListener("click", getDailyReport);
  monthShowBtn.addEventListener("click", getMonthlyReport);
  yearShowBtn.addEventListener("click", getYearlyReport);
  