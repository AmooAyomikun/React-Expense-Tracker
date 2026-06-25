import React from 'react'
import { createContext, useContext } from 'react'
import categories from '../data/categories';

export const ExpenseContext = createContext();

export default function ExpenseProvider({children}){
    const[transactions, setTransactions] = React.useState(() => {
        const storedTransactions = localStorage.getItem("transactions")
        return storedTransactions ? JSON.parse(storedTransactions) : []
    })

    const[budgets, setBudgets] = React.useState(() => {
        const storedBudgets = localStorage.getItem("budgets")
        return storedBudgets ? JSON.parse(storedBudgets) : []
    })

    const[currency, setCurrencyState] = React.useState(() => {
        const storedCurrency = localStorage.getItem("currency")
        return storedCurrency ? JSON.parse(storedCurrency) : "₦"
    })

    const[userName, setUserNameState] = React.useState(() => {
        const storedUserName = localStorage.getItem("userName")
        return storedUserName ? JSON.parse(storedUserName) : "there"
    })

    function saveToStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    }

    function addTransaction(transaction){
        setTransactions((prevState) => {
            const updated = [transaction, ...prevState]
            saveToStorage("transactions", updated)
            return updated
        })
    }

    function deleteTransaction(id){
        setTransactions((prevState) => {
            const updated = prevState.filter((transaction) => {
                return transaction.id !== id
            })
            saveToStorage("transactions", updated)
            return updated
        })
    }

    function setBudgetLimit(category, amount){
        setBudgets((prevState) => {
            const exists = prevState.some((budget) => {
                return budget.category === category
            })

            if(exists){
                const updated = prevState.map((budget) => {
                    if(budget.category === category){
                            return{
                            ...budget,
                            amount: amount
                        }
                    }
                    return budget
                })
                saveToStorage("budgets", updated)
                return updated
            }else {
                const updated = [
                    ...prevState,
                    {
                        category,
                        amount
                    }
                ]
                saveToStorage("budgets", updated)
                return updated
            }
        })
    }

    function setCurrency(value){
        setCurrencyState(value)
        saveToStorage("currency", value)
    }

    function setUserName(value){
        setUserNameState(value)
        saveToStorage("userName", value)
    }

    function resetAllData(){
        setTransactions([])
        setBudgets([])
        localStorage.removeItem("transactions")
        localStorage.removeItem("budgets")
        localStorage.removeItem("currency")
        localStorage.removeItem("userName")

        setCurrencyState("₦")
        setUserNameState("there")
    }

    const totalIncome = transactions.filter((transaction) => {
        return transaction.type === "income"
    }).reduce((sum, transaction) => {
        return sum + transaction.amount
    }, 0)

    const totalExpenses = transactions.filter((transaction) => {
        return transaction.type === "expense"
    }).reduce((sum, transaction) => {
        return sum + transaction.amount
    }, 0)

    const totalBalance = totalIncome - totalExpenses

    return(
        <ExpenseContext.Provider value={{
            transactions, 
            currency, 
            userName,
            budgets, 
            categories,
            addTransaction, 
            deleteTransaction,  
            setBudgetLimit,
            setCurrency,
            setUserName,
            resetAllData,
            totalIncome,
            totalBalance,
            totalExpenses
        }}>
            {children}
        </ExpenseContext.Provider>
    )
}

export function useExpense(){
    return useContext(ExpenseContext)
}