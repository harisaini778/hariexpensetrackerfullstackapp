// /controllers/expenseController

const path = require("path");
const Expense = require("../models/expenseModel");
const database = require("../utils/database");
const User = require("../models/userModels");
const sequelize = require("../utils/database");



exports.getHomePage = (req,res,next) => {
    try {
        res.sendFile(path.join(__dirname,"../","public","views","homePage.html"));
    } catch {
        (err)=> console.log(err);
    }

}

exports.addExpense = async (req,res,next) => { 

    const t = await sequelize.transaction();

    try {
    const date = req.body.date;
    const category  = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;

    await User.update({
        totalExpenses:req.user.totalExpenses + amount,
    },{
        where : {id : req.user.id}
    }, 
    // {transaction : t }
    );

 


    Expense.create({
        date :  date,
        category : category,
        description :  description,
        amount : amount,
        userId : req.user.id,
    }, 
    // {transaction : t }
    )
    .then((result)=>{
        res.status(200);
        res.redirect("/homePage");
    })
    .catch((err)=>console.log(err));

    await t.commit();

   } catch {
    async (err) => {
        await t.rollback();
        console.log(err);
    };
   }
};

exports.getAllExpenses = async (req,res,next) => {

    try {
    const expenses = await Expense.findAll({where : {userId:req.user.id}});
    res.json(expenses);
    } catch(err) {
    console.log(err);
    }
};

exports.deleteExpenses = async (req,res,next) =>{

    const id = req.params.id;

    try {
     const  expense = await Expense.findByPk(id);
     await  User.update({
        totalExpenses : req.user.totalExpenses - expense.amount,
    },{
        where : {id : req.user.id}
    });
    await  Expense.destroy( {where : {id : id, userId : req.user.id}} );
    res.redirect("/homePage");
    } catch(err) {
    console.log(err);
    }

    console.log("this is req.body in expenseControllers : ",req.body);

}


exports.editExpenses = async (req,res,next) =>{

    try {
     
        const id = req.params.id;
        
        console.log('This is the request body',req.body);
        
        const category = req.body.category;
        const description = req.body.description;
        const amount =  req.body.amount;

        console.log("Category from edit API: "+category+" Description: "+description+ " Amount: "+amount);
        
        const expense  = await Expense.findByPk(id);

        await User.update({
            totalExpenses : req.user.totalExpenses - expense.amount + Number(amount),
        },{
            where : {id : req.user.id}
        });
    
        await Expense.update({
            category : category,
            description : description,
            amount : amount,
        },{
            where : {id : id,  userId : req.user.id}
        });
        res.redirect("/homePage");
    } catch (err) {
      console.log(err);
    }
};


