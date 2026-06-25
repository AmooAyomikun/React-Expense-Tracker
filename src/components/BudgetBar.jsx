import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BudgetBar = ({category, spent, limit, currency}) => {
    const cleanSpent = typeof spent === 'string' ? Number(spent.replace(/,/g, '')) : Number(spent || 0)
    const cleanLimit = typeof limit === 'string' ? Number(limit.replace(/,/g, '')) : Number(limit || 0)

    const percentage = (cleanSpent / cleanLimit) * 100
    const displayPercentage = Math.round(percentage)
    const remainingMoney = cleanLimit - cleanSpent
    let color;

    if(percentage > 100){
        color= "var(--danger, #EF4444)"
    }else if(percentage >= 70){
        color = "var(--warning, #F59E0B)"
    }else{
        color = "var(--success, #10B981)"
    }

    const barWidth = Math.min(percentage, 100)
  return (
    <div className='budget-bar'>
        <div className="budget-bar-header">
            <span className="budget-icon">
                <FontAwesomeIcon icon={category.icon} />
            </span>
            <h4 className="budget-name">{category?.name}</h4>

            <span className='text-muted'>{currency} {cleanSpent.toLocaleString()}/ {currency} {cleanLimit.toLocaleString()}</span>
        </div>

       <div className="budget-progress-track">
            <div
                className="budget-progress-bar"
                style={{
                    width: `${barWidth}%`,
                    backgroundColor: color
                }}
            ></div>
        </div>
        {percentage >= 100 ? (
                    <span className="status-msg over-budget">
                        Budget reached
                    </span>
                    ) : (
                    <span className="status-msg under-budget">
                        {displayPercentage}% used - {currency}{remainingMoney.toLocaleString()} remaining
                    </span>
        )}
    </div>
  )
}

export default BudgetBar