import React from 'react'
import { useExpense } from '../context/ExpenseContext'
import categories from '../data/categories'
import TransactionItem from '../components/TransactionItem'

const Transactions = () => {
    const{transactions, deleteTransaction} = useExpense()

    React.useEffect(() => {
        document.title = "Transactions | Trackr"
    }, [])

    const[search, setSearch] = React.useState("")
    const[filterType, setFilterType] = React.useState("all")
    const[filterCategory, setFilterCategory] = React.useState("all")
    const[filterMonth, setFilterMonth] = React.useState("all") 

    let filteredTransactions = transactions

    if(search !== ""){
        filteredTransactions = filteredTransactions.filter((transaction) => {
            return transaction.description.toLowerCase().includes(search.toLocaleLowerCase())
        })
    }

    if(filterType !== "all"){
        filteredTransactions = filteredTransactions.filter((transaction) => {
            return transaction.type === filterType
        })
    }

    if(filterCategory !== "all"){
        filteredTransactions = filteredTransactions.filter((transaction) => {
            return transaction.category === filterCategory
        })
    }

    if(filterMonth !== 'all'){
        filteredTransactions = filteredTransactions.filter((transaction) => {
            if(!transaction.date) return false

            return transaction.date.split("-")[1] === filterMonth
        })
    }

  return (
    <div className='transactions-page page'>
        <div className="search-input">
            <input 
                type="text" 
                className='input' 
                placeholder='Search transactions...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <div className="categories">
            <select name="type" id="type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All types</option>
                <option value='income'>Income</option>
                <option value="expense">Expense</option>
            </select>

            <select name="category" id="category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All categories</option>
                {categories.map((category) => {
                    return (
                        <option value={category.name} id={category.id}>{category.name}</option>
                    )
                })}
            </select>

            <select name="month" id="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                <option value="all">All Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </div>

        <div className="transactions">
                {filteredTransactions.length === 0 ? <p>No transaction yet. Start by adding your first transaction.</p> : filteredTransactions.map((filteredTransaction) => {
                    return(
                        <TransactionItem key={filteredTransaction.id} transaction={filteredTransaction} onDelete={deleteTransaction} />
                    )
                })} 
        </div>
    </div>
  )
}

export default Transactions