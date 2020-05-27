import React, { useState, useContext, useEffect } from 'react'

import { GlobalContext } from '../context/GlobalState'

export const AddTransaction = () => {
    const [transaction, setTransaction] = useState({
        text: '',
        amount: 0
    });
    const [disabled, setDisabled] = useState(true);

    const { addTransaction } = useContext(GlobalContext);

    const checkValid = () => {
        if(transaction.text === '' && (parseInt(transaction.amount) === 0 || isNaN(transaction.amount))) {
            return false
        }
        else {
            return true
        }
    }

    const handleChange = e => {
        e.preventDefault();

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value 
        });
     };

    useEffect(() => {
        console.log(transaction);
        const amt = parseInt(transaction.amount);
        if(transaction.text !== '' && (!isNaN(amt) && amt !== 0)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    },[transaction])

    const onSubmit = e => {
        e.preventDefault();

        if(checkValid) {
            const newTransaction = {
                id: Math.floor(Math.random() * 100000000),
                text: transaction.text,
                amount: parseInt(transaction.amount)
            }
            addTransaction(newTransaction);
        }
    }

    return (
        <div>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                <label>Text</label>
                <input type="text" name="text" value={transaction.text} onChange={handleChange.bind(this)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label>Amount <br />
                    (negative - expense, positive - income)</label>
                <input type="number" name="amount" value={transaction.amount} onChange={handleChange.bind(this)} placeholder="Enter amount..." />
                </div>
                <button 
                    disabled={disabled}
                    className="btn"
                >Add transaction</button>
            </form>
        </div>
    )
}
