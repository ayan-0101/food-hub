import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, { id: action.id, name: action.name, price: action.price, img: action.img, quantity: action.quantity, size: action.size }]

        case 'REMOVE':
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case 'UPDATE':
            let newCart = [...state];
            newCart.find((food, index) => {
                if (food.id === action.id) {
                    newCart[index] = { ...food, quantity: parseInt(action.quantity) + action.price + food.price }
                }
                return newCart
            })
            return newCart

        case 'DROP':
            let emptyArr = []
            return emptyArr;

        default:
            console.log("Error in Reducer")
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)

