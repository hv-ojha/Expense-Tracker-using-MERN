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
            window.localStorage.setItem('transactions', JSON.stringify([...state.transactions,action.payload]))
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        
        default: 
            return state;
    }
}