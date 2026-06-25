import React from 'react'
import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import TransactionItem from '../components/TransactionItem'
import { Link } from 'react-router-dom'
import QuickAdd from '../components/QuickAdd'


const Dashboard = () => {
    const{transactions, totalBalance, totalIncome, totalExpenses, addTransaction, currency, userName, deleteTransaction} = useExpense()

    React.useEffect(() => {
        document.title = "Dashboard | Trackr"
    },[])
  return (
    <div className='dashboard page'>
        <h1 className="dashboard-title">
            Welcome back, {userName}
        </h1>
        <div className="summary-card">
            <div>
                <p>Total Balance</p>
                {currency} {totalBalance.toLocaleString()}
            </div>

            <div>
                <p>Total income</p>
                {currency} {totalIncome.toLocaleString()}
            </div>

            <div>
                <p>Total expenses</p>
                {currency} {totalExpenses.toLocaleString()}
            </div>
        </div>

        <div className="recent-transactions">
            <div className="recent-navs">
                <p>Recent transactions</p>
                <Link to="/transactions">See all</Link>
            </div>
            {transactions.length === 0 ? <p>No Transaction yet</p> : [...transactions].slice(0,5).map((transaction) => {
                return <TransactionItem key={transaction.id} transaction={transaction} onDelete={deleteTransaction} />
            })}
        </div>

        <QuickAdd />
    </div>
  )
}

export default Dashboard