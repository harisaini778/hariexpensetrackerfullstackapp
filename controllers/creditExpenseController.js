const CreditExpense = require("../models/creditExpenseModel");

const UserExpense = require("../models/userModels");

const getCreditExpense = async (req,res) => {

try {


    const creditExpense = await CreditExpense.findAll({
        where : {userId : req.user.id}
    });

    

    res.status(200).json({success : true,data:creditExpense});
} 
catch(err) {

    console.log(err);

}

};


const addCreditExpense = async (req,res) => {

    try {

     const {description,totalIncome} = req.body;

     const newCreditExpense = await CreditExpense.create({
        description,
        totalIncome,
        userId : req.user.id,
     });

     res.status(200).json({success:true,data:newCreditExpense});
     console.log("Credit Expense : ",newCreditExpense);

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Server Error"})
    }
};


const calculateSavings = async (req, res) => {
    try {
        const creditExpenses = await CreditExpense.findAll({
            where: { userId: req.user.id },
        });

        if (!creditExpenses || creditExpenses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No credit expenses found",
                data: [],
            });
        }

        const user = await UserExpense.findOne({
            where: { id: req.user.id },
        });

        let totalCredit = 0;

        creditExpenses.forEach((element) => {
            totalCredit += element.totalIncome;
        });

        console.log("Total Expense in the server side is : ", user.totalExpenses);

        const savings = totalCredit - user.totalExpenses;

        res.status(200).json({ success: true, data: savings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {getCreditExpense,addCreditExpense,calculateSavings};