import React, { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import categories from '../data/categories'

const QuickAdd = () => {
    const{addTransaction} = useExpense()

    const getTodaysDate = () => new Date().toISOString().split('T')[0]

    const[formField, setFormField] = React.useState({
        type: "expense",
        description: "",
        amount: "",
        category: "",
        date: getTodaysDate()
    })

    const[error, setError] = useState({})

    function handleChange(event){
        const{name, value} = event.target

        setFormField((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })

        if(error){
            setError((prevState) => {
                return {
                    ...prevState,
                    [name]: ""
                }
            })
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        let validationError = {}

        if(!formField.amount || Number(formField.amount) <= 0 || isNaN(Number(formField.amount))){
            validationError.amount = "Please enter a valid amount greater than zero"
        }

        if(!formField.description.trim()){
            validationError.description = "Description should not be empty"
        }

        if(!formField.category.trim()){
            validationError.category = "Enter a category"
        }

        if (!formField.date) {
            validationError.date = "Please select a date"
        }

        if(Object.keys(validationError).length > 0){
            setError(validationError)
        }else{
            addTransaction({
                id: String(Date.now()),
                ...formField,
                amount: Number(formField.amount),
            })
            setFormField({
                type: "expense",
                description: "",
                amount: "",
                category: "",
                date: getTodaysDate()
            })
        }
    }

    function handleFormType(selectedType){
        setFormField((prevState) => {
            return{
                ...prevState,
                type: selectedType,
                category: ""
            }
        })
    }
  return (
    <div className='quick-form'>
        <div className="form-toggle-button">
            <button type='button' onClick={() => handleFormType('expense')} className={`toggle-btn ${formField.type === 'expense' ? "active" : ""}`}>Expense</button>
            <button type='button' onClick={() => handleFormType('income')} className={`toggle-btn ${formField.type === 'income' ? "active" : ""}`}>Income</button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <input 
                        type="text" 
                        name='description'
                        value={formField.description} 
                        onChange={handleChange} 
                        className='input' placeholder='Description' 
                    />
                    {error.description && <span className='text-warning'>{error.description}</span>}
                </div>

                <div className="form-group">
                    <input 
                        type="text" 
                        name='amount'
                        placeholder='₦ Amount'
                        value={formField.amount.toLocaleString()}
                        onChange={handleChange}
                        className='input'
                    />
                    {error.amount && <span className='text-warning'>{error.amount}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <select  name="category" id="category" value={formField.category} onChange={handleChange}>
                        <option value="">Category</option>
                        {categories.filter((category) => {
                            return category.type === formField.type
                        }).map((category) => {
                            return <option value={category.name} key={category.id}>{category.name}</option>
                        })}
                    </select>
                    {error.category && <span className='text-warning'>{error.category}</span>}
                </div>

                <div className="form-group">
                    <input 
                            type="date"
                            id='date'
                            name='date'
                            value={formField.date}
                            onChange={handleChange}
                            className='input'
                    />
                    {error.date && <span className='text-warning'>{error.date}</span>}
                </div>
            </div>

            <button type='submit' className="btn-primary">
                {formField.type === 'expense' ? <span>Add Expense</span> : <span>Add Income</span>}
            </button>
        </form>
    </div>
  )
}

export default QuickAdd