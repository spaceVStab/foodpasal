import { CartContext } from "./CartContext";
import { useContext, useState, useEffect} from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

export const CartDetail = ({productKeyed}) => {
    const {cartItems, setCartItems} = useContext(CartContext)
    const [totalSum, setTotalSum] = useState(0);

    useEffect( () => {
        let sum = 0;
        Object.entries(cartItems).map((v,k) => {
            sum += parseInt(productKeyed[k.toString()].productPrice.replace(/[^0-9]/g,'')) * parseInt(v[1]);
        })
        setTotalSum(sum)
    }, [cartItems])

    return (
        <div className="sticky flex flex-col gap-5">
            <div className="p-5 bg-white rounded-xl shadow-xl w-64">
                <p className="text-xl font-semibold">Cart Details</p>
                <div className="divider"></div>
                {totalSum==0 && <p>Cart Empty</p>}
                <div className="flex flex-col gap-5">
                {Object.entries(cartItems).map((v, k) => (
                    <div>
                        {v[1]>0 && <p className="text-lg font-medium">{productKeyed[k.toString()].productName}</p>}
                        <div className="flex flex-row justify-between">
                            {v[1]>0 && <p className="font-light">{productKeyed[k.toString()].productPrice}</p>}
                            {v[1]>0 && <p className="font-medium">x {v[1]}</p>}
                        </div>
                        {/* {v[1]>0 && <p>{parseInt(productKeyed[k.toString()].productPrice.replace(/[^0-9]/g,'')) * parseInt(v[1])}</p>} */}
                    </div>
                ))}
                </div>
                <div className="divider"></div>
                <div className="flex flex-col">
                    {totalSum>0 && <p className="font-light text-md">Total Amount</p>}
                    {totalSum>0 && <p className="font-medium text-xl">Rs. {totalSum}/-</p>}
                </div>
            </div>
            {totalSum > 0 && (
            <div>
                <textarea 
                    type="text"
                    placeholder="Additional Note For Us"
                    onChange={(e) => {
                        props.setNote(e.target.value)
                        setHasNote(true)
                    }}
                    className="outline-none border-2 border-red-500 w-64 h-20 rounded-xl text-lg pl-2 shadow-xl"
                />
            </div>)}
            {totalSum > 0 && (<div className="self-center pl-5 pr-5 flex flex-row bg-red-500 rounded-2xl shadow-xl">
                <p className="self-center text-2xl font-medium text-white">Place Order</p>
                <ChevronDoubleRightIcon className="self-center text-white h-10"/>
            </div>)}
        </div>
    )
}

export default CartDetail;