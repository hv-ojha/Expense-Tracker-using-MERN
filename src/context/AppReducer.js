export default (state, action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            const list = state.transactions.filter(transaction => transaction.id !== action.payload);
            window.localStorage.setItem('transactions', JSON.stringify(list));
            return {
                ...state,
                transactions: JSON.parse(window.localStorage.getItem('transactions')).length > 0 ? JSON.parse(window.localStorage.getItem('transactions')) : []
            }
        
        case 'ADD_TRANSACTION': 
            const transaction = action.payload;
            const amt = parseInt(transaction.amount);
            if(transaction.text !== '' && (!isNaN(amt) && amt !== 0)) {
                window.localStorage.setItem('transactions', JSON.stringify([...state.transactions,action.payload]))
                return {
                    ...state,
                    transactions: [...state.transactions, action.payload]
                }
            } else {
                return{
                    ...state
                }
            }
        
        default: 
            return state;
    }
}