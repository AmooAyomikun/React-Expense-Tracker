import React from 'react'
import { useExpense } from '../context/ExpenseContext'
import BarChart from '../components/BarChart'
import DonutChart from '../components/DonutChart'

const Analytics = () => {
    const{transactions, categories} = useExpense()

    React.useEffect(() => {
        document.title = "Analytics | Trackr"
    }, [])

    const expenses = transactions.filter((transaction) => {
        return transaction.type === "expense"
    })

    const monthlyTotals = {}

    expenses.forEach((transaction) => {
        if (!transaction.date) return
        const month = transaction.date.split("-")[1]

        if(!monthlyTotals[month]){
            monthlyTotals[month] = 0
        }

        monthlyTotals[month] += transaction.amount
    })

    const monthNames = {
        "01":"Jan",
        "02":"Feb",
        "03":"Mar",
        "04":"Apr",
        "05":"May",
        "06":"Jun",
        "07":"Jul",
        "08":"Aug",
        "09":"Sep",
        "10":"Oct",
        "11":"Nov",
        "12":"Dec"
    }

    const monthlyData = Object.entries(monthlyTotals).map(([month, total]) => {
        return {
            label: monthNames[month],
            value: total
        }
    })

    const totalExpenses = expenses.reduce((sum, transaction) => {
        return sum + transaction.amount
    }, 0)

    const categoryTotals = {}

    expenses.forEach((transaction) => {
        const category = transaction.category

        if(!categoryTotals[category]){
            categoryTotals[category] = 0
        }

        categoryTotals[category] += transaction.amount
    })

    const categoryData = Object.entries(categoryTotals).map(([category, total]) => {
        const categoryInfo = categories.find((item) => {
            return item.name === category
        })

        const rawPercentage = totalExpenses ? (total / totalExpenses) * 100 : 0

        return{
            label: category,
            value: total,
            percentage: Math.round(rawPercentage),
            color: categoryInfo?.color || "#888"
        }
    })
  return (
    <div className='analytics-page page'>
        <div className="analytics-header">
            <h1>Analytics</h1>
            <p className="text-muted">
                Visualize your spending patterns and financial habits.
            </p>
        </div>
        
        {categoryData.length === 0 && monthlyData.length === 0 
            ? <p>No analytics data available yet. Add transactions to see insights.</p> 
            : <div className="analytics-grid">
                <div className="card">
                    <h3>Monthly Spending</h3>
                    {monthlyData.length > 0 ? <BarChart data={monthlyData} /> : <p className="text-muted">No spending data available.</p>}
                </div>

                <div className="card">
                    <h3>Category Breakdown</h3>
                    {categoryData.length > 0 ? <DonutChart data={categoryData} /> : <p className="text-muted">No category data available.</p>}
                </div>
            </div>
        }
    </div>
  )
}

export default Analytics