import React, { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const{currency, setCurrency, userName, setUserName, resetAllData} = useExpense()

    React.useEffect(() => {
        document.title = "Settings | Trackr"
    },[])

    const navigate = useNavigate()

    function handleReset(){
        const confirmed = window.confirm("Are you absolutely sure you want to reset all data? This will wipe out all transactions and budgets permanently.")

        if(confirmed){
            resetAllData()
            navigate("/")
        }
    }

  return (
    <div className='settings-page page'>
        <div className="settings-card">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Customize your profile and application preferences.</p>
            
            <div className="profile">
                <div className="form-group">
                    <label htmlFor="userName">Your name</label>
                    <input 
                        type="text" 
                        id='userName'
                        name='profileName'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='input'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currency">Currency</label>

                    <select name="currency" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="₦">₦ Nigeria Naira</option>
                        <option value="$">$ US Dollar</option>
                        <option value="£">£ British Pound</option>
                    </select>
                </div>

                <button type='button' className='btn-danger' onClick={handleReset}>Reset All</button>
            </div>
        </div>
    </div>  
  )
}

export default Settings
