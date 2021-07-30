import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShoppingCartIcon, ChevronRightIcon } from "@heroicons/react/solid";

export const CartNavBarMob = ({productKeyed}) => { 
    const {cartItems, setCartItems} = useContext(CartContext)

    const [totalSum, setTotalSum] = useState(0);
    const [totalItem, setTotalItem] = useState(0);

    useEffect( () => {
        let sum = 0;
        let count = 0;
        Object.entries(cartItems).map((v,k) => {
            count += parseInt(v[1]);
            sum += parseInt(productKeyed[k.toString()].productPrice.replace(/[^0-9]/g,'')) * parseInt(v[1]);
        })
        setTotalSum(sum)
        setTotalItem(count)
    }, [cartItems])

    return(
        <div className="sticky bottom-0">
            {totalSum > 0 && totalItem > 0 && (
                <div className="flex pl-5 pr-5 flex-row bg-red-500 h-14 justify-between">
                    <div className="relative self-center">
                        <ShoppingCartIcon className="h-10"/>
                        <p className="absolute -top-1 right-0 self-center text-md text-white rounded-full bg-black pl-1 pr-1">{totalItem}</p>
                    </div>
                    <p className="self-center font-semibold text-xl text-white">Rs. {totalSum}/-</p>
                    <div className="flex self-center flex-row">
                        <p className="self-center font-medium text-lg text-white">Checkout</p>
                        <ChevronRightIcon className="text-white self-center h-6"/>
                    </div>
                </div>
            )}
        </div>
    )

}

export default CartNavBarMob