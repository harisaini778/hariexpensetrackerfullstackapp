// /controllers/expenseController

const path = require("path");
const Expense = require("../models/expenseModel");
const database = require("../utils/database");

exports.getHomePage = (req,res,next) => {
    res.sendFile(path.join(__dirname,"../","public","views","homePage.html"));
}

exports.addExpense = (req,res,next) => {
    const date = req.body.date;
    const category  = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;


    Expense.create({
        date :  date,
        category : category,
        description :  description,
        amount : amount,
    })
    .then((result)=>{
        res.status(200);
        res.redirect("/homePage");
    })
    .catch((err)=>console.log(err));
};

exports.getAllExpenses = (req,res,next) => {
     Expense.findAll()
     .then((expenses)=>{
        res.json(expenses)
     })
     .catch((err)=>{
        console.log(err);
     })
};

exports.deleteExpenses = (req,res,next) =>{

    const id = req.params.id;
    console.log("Delete expense id : ",id);

    Expense.findByPk(id)
    .then((expense)=>{
        return expense.destroy();
    })
    .then((result)=>{
        console.log(result);
        res.redirect("/homePage");
    })
    .catch((err)=>{
        console.log(err);
    })

}


exports.editExpenses = (req,res,next) =>{
    
    const id = req.params.id;
    console.log("Edit Expense api req.body is : ",req.body);
    const category = req.body.category;
    const description = req.body.description;
    const amount =  req.body.amount;

    console.log("Category from edit API: "+category+" Description: "+description+ " Amount: "+amount);

    Expense.findByPk(id)
    .then((expense)=>{
        expense.category = category;
        expense.description = description;
        expense.amount= amount;
        
        return expense.save()
    })
    .then((result)=>{
        res.redirect("/homePage");
    })
    .catch((err)=>console.log(err));
};


