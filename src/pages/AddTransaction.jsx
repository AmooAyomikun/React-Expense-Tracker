import React from 'react'
import { useExpense } from '../context/ExpenseContext'
import { useNavigate } from 'react-router-dom'

const AddTransaction = () => {
    const{addTransaction, categories, currency} = useExpense()

    const[formData, setFormData] = React.useState({
        type: "expense",
        description: "",
        amount: "",
        category: "",
        date: "",
        note: ""
    })

    const[error, setError] = React.useState({})

    function handleChange(event){
        const{name, value} = event.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

        if(error[name]){
            setError((prevState) => ({
                ...prevState,
                [name]: ""
            }))
        }
    }

    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        let validationError = {};

        if(!formData.description.trim()){
            validationError.description = "Description should not be empty"
        }

        if (!formData.amount || Number(formData.amount) <= 0 || isNaN(Number(formData.amount))){
            validationError.amount = "Please enter a valid amount greater than zero"
        }

        if(!formData.category.trim()){
            validationError.category = "Enter a category"
        }

        if(!formData.date.trim()){
            validationError.date = "Enter a date"
        }

        if(Object.keys(validationError).length > 0){
            setError(validationError)
        }else{
            const newTransaction = {
                id: String(Date.now()),
                type: formData.type,
                description: formData.description,
                amount: Number(formData.amount),
                category: formData.category,
                date: formData.date,
                note: formData.note
            }
            addTransaction(newTransaction)
            navigate("/transactions")
        }
    }

    function handleFormType(selectedType){
        setFormData((prevState) => ({
            ...prevState,
            type: selectedType,
            category: ""
        }))
    }

  return (
    <div className='add-transaction page'>
        <div className="form-toggle-button">
            <button type='button' className={`toggle-btn ${formData.type === 'expense' ? "active" : ""}`} onClick={() => handleFormType('expense')}>Expense</button>
            <button type='button' className={`toggle-btn ${formData.type === 'income' ? "active" : ""}`} onClick={() => handleFormType('income')}>Income</button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input 
                            type="text" 
                            id='description'
                            value={formData.description}
                            name='description'
                            onChange={handleChange}
                            placeholder='e.g. Grocery run'
                            className={error.description ? "text-danger" : "input"}
                    />
                    {error.description && <span className='text-warning'>{error.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount ({currency})</label>
                    <input 
                        type="amount" 
                        id='amount'
                        value={formData.amount}
                        onChange={handleChange}
                        name='amount'
                        placeholder="0.00"
                        className={error.amount ? "input-error" : "input"}
                    />
                    {error.amount && <span className='text-warning'>{error.amount}</span>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                            name="category" 
                            id="category"
                            onChange={handleChange}
                            value={formData.category}
                            className={error.category ? "input-error" : ""}
                    >
                        <option value="">Select Category</option>
                        {categories.filter((category) => {
                            return category.type === formData.type
                        }).map((category) => 
                            (
                                <option value={category.name} key={category.id}>{category.name}</option>
                        )
                        )}
                    </select>
                    {error.category && <span className='text-warning'>{error.category}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input 
                            type="date" 
                            name='date'
                            value={formData.date}
                            onChange={handleChange}
                            className={error.date ? "text-danger" : "input"}
                    />
                    {error.date && <span className='text-warning'>{error.date}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="note">Note (optional)</label>
                <textarea 
                        name="note" 
                        id="note"
                        value={formData.note}
                        onChange={handleChange}
                        className={error.note ? "text-danger" : "input"}
                ></textarea>
            </div>

            <button type='submit' className="btn-primary">
                {formData.type === 'expense' ? <span>Add Expense</span> : <span>Add Income</span>}
            </button>
        </form>
    </div>
  )
}

export default AddTransaction