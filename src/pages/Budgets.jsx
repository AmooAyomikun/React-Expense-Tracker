import React from 'react'
import { useExpense } from '../context/ExpenseContext'
import BudgetBar from '../components/BudgetBar'

const Budgets = () => {
    const{transactions, budgets, setBudgetLimit, categories, currency} = useExpense()
    React.useEffect(() => {
        document.title = "Budgets | Tracker"
    }, [])
    
    const[limit, setLimit] = React.useState({})
    const [errors, setErrors] = React.useState({})

    const spentByCategory = {}
    const expenses = transactions.filter((transaction) => {
        return transaction.type === "expense"
    })

    expenses.forEach((transaction) => {
        const category = transaction.category

        if(!spentByCategory[category]){
            spentByCategory[category] = 0
        }

        spentByCategory[category] += transaction.amount
    })

    function handleInputChange(event){
        const{name, value} = event.target

        setLimit((prevState) => {
            return{
                ...prevState,
                [name]:value
            }
        })

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }))
        }
    }
    
  return (
    <div className='budget-page page'>
        <div className="budget-card">
            {categories.filter((category) =>{
                return category.type === 'expense'
            }).map((category) => {
                const budget = budgets.find((item) => {
                    return item.category === category.name
                })

                const spent = spentByCategory[category.name] || 0
                return(
                    <div key={category.id}>
                        {budget ? (
                            <>
                                <BudgetBar
                                    spent={spent}
                                    limit={budget.amount}
                                    category={category}
                                    currency={currency}
                                />

                                <div className="budget-edit">
                                    <input
                                        type="number"
                                        name={category.name}
                                        value={limit[category.name] || ""}
                                        onChange={handleInputChange}
                                        placeholder="New limit"
                                    />

                                    <button
                                        onClick={() => {
                                            const val = Number(limit[category.name])
                                        
                                            if (!limit[category.name] || isNaN(val) || val <= 0) {
                                                setErrors((prev) => ({ ...prev, [category.name]: "Enter an amount greater than 0" }))
                                            } else {
                                                setBudgetLimit(category.name, val)
                                                setErrors((prev) => ({ ...prev, [category.name]: "" }))
                                            }
                                        }}
                                    >
                                        Update Budget
                                    </button>
                                    {errors[category.name] && (
                                        <p className='text-danger'>{errors[category.name]}</p>
                                    )}
                                </div>
                            </>

                        ) : (
                            <div>
                                <h4>{category.name}</h4>
                                <p>No budgets created yet. Set spending limits to manage your finances.</p>
                                <input 
                                    type="number" 
                                    id='number'
                                    name={category.name} 
                                    value={limit[category.name] || ""} 
                                    onChange={handleInputChange}
                                />
                                <button 
                                    onClick={() => {
                                        const rawValue = limit[category.name];
                                        const val = Number(rawValue);
                                    
                                        if (!rawValue || rawValue.trim() === "" || isNaN(val) || val <= 0) {
                                            setErrors((prev) => ({ ...prev, [category.name]: "Enter an amount greater than 0" }))
                                        } else {
                                            setBudgetLimit(category.name, val)
                                            setErrors((prev) => ({ ...prev, [category.name]: "" }))
                                        }
                                }}
                                >
                                    Set Budget
                                </button>
                                {errors[category.name] && (
                                    <p className='text-danger'>{errors[category.name]}</p>
                                )}
                            </div> 
                        )}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Budgets