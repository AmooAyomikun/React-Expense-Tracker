import React from 'react'
import { useExpense } from '../context/ExpenseContext'
import categories from '../data/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TransactionItem = ({transaction, onDelete}) => {
    const{currency} = useExpense()

    const categoryInfo = categories.find((item) => {
        return item.name === transaction.category
    })
  return (
    <div className='transaction-item'>
        <div className="transaction-left">
            <div className="transaction-icon">
                <FontAwesomeIcon icon={categoryInfo?.icon} />
            </div>

            <div className="transaction-details">
                    <h4 className="transaction-descriptions">
                        {transaction.description}
                    </h4>
                    <p className="transaction-meta">
                        {transaction.category} • {transaction.date}
                    </p>
            </div>
        </div>

        <div className="transaction-right">
            <p className={transaction.type === "expense" ? "text-danger" : "text-success"}>
                {transaction.type === "expense" ? "-" : "+"}
                {currency}
                {transaction.amount.toLocaleString()}
            </p>

            <button onClick={() => onDelete(transaction.id)}>Delete</button>
        </div>
    </div>
  )
}

export default TransactionItem