import Link from 'next/link'
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShoppingCartIcon, ChevronRightIcon, ChevronDoubleRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

export const CartNavBarMob = ({productKeyed}) => { 
    const {cartItems, setCartItems} = useContext(CartContext)

    const [totalSum, setTotalSum] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [displayMobCartDetail, setDisplayMobCartDetail] = useState(false);

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
            {totalSum > 0 && totalItem > 0 && !displayMobCartDetail && (
                <div className="flex pl-5 pr-5 flex-row bg-red-500 h-14 justify-between">
                    <div className="relative self-center">
                        <ShoppingCartIcon className="h-10"/>
                        <p className="absolute -top-1 right-0 self-center text-md text-white rounded-full bg-black pl-1 pr-1">{totalItem}</p>
                    </div>
                    <p className="self-center font-semibold text-xl text-white">Rs. {totalSum}/-</p>
                    
                    <div onClick={() => setDisplayMobCartDetail(true)} className="flex self-center flex-row">
                        <p className="self-center font-medium text-lg text-white">Checkout</p>
                        <ChevronRightIcon className="text-white self-center h-6"/>
                    </div>
                    
                </div>
            )}
            {
                totalSum>0 && totalItem>0 && displayMobCartDetail && (
                    <div className="flex flex-col bg-white h-screen">
                        <div onClick={() => setDisplayMobCartDetail(false)} className="flex flex-row h-16 pl-5 bg-gray-300">
                            <ChevronLeftIcon className="h-8 self-center" />
                            <p className="text-2xl font-medium self-center">Back</p>
                        </div>
                        <div>
                        <p className="text-3xl font-medium p-2 text-center">Cart Details</p>
                        </div>
                        <div className="flex flex-col pl-5 pr-5 gap-5 divide-y-2">
                        {Object.entries(cartItems).map((v, k) => (
                            <div>
                                {v[1]>0 && <p className="text-lg font-medium">{productKeyed[k.toString()].productName}</p>}
                                <div className="flex flex-row justify-between">
                                    {v[1]>0 && <p className="font-light">{productKeyed[k.toString()].productPrice}</p>}
                                    {v[1]>0 && <p className="font-medium">x {v[1]}</p>}
                                    {v[1]>0 && <p>Rs. {parseInt(productKeyed[k.toString()].productPrice.replace(/[^0-9]/g,'')) * parseInt(v[1])}/-</p>}
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className="flex flex-row justify-between pl-5 pr-5 pt-10">
                            {totalSum>0 && <p className="font-light text-md self-center">Total Amount</p>}
                            {totalSum>0 && <p className="font-medium text-2xl self-center">Rs. {totalSum}/-</p>}
                        </div>
                        <div className="pt-5 self-center">
                            <textarea 
                                type="text"
                                placeholder="Additional Note For Us"
                                onChange={(e) => {
                                    props.setNote(e.target.value)
                                    setHasNote(true)
                                }}
                                className="outline-none border-2 border-red-500 w-72 h-20 rounded-xl text-lg pl-2 shadow-xl"
                            />
                        </div>
                        {totalSum > 0 && (<div className="mt-5 self-center pl-5 pr-5 flex flex-row bg-red-500 rounded-2xl shadow-xl">
                            <p className="self-center text-2xl font-medium text-white">Place Order</p>
                            <ChevronDoubleRightIcon className="self-center text-white h-10"/>
                        </div>)}
                    </div>
                )
            }
        </div>
    )

}

export default CartNavBarMob