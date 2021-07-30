import Image from "next/image";
import { useState } from "react";
import {
    HeartIcon,
    PlusCircleIcon,
    MinusCircleIcon
} from "@heroicons/react/solid"
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const FoodUnitMob = ( props ) => {
    const [itemCount, setItemCount] = useState(0);
    const {cartItems, setCartItems} = useContext(CartContext)

    const decreaseItemCount = () => {
        setItemCount(itemCount-1<=0 ? 0 : itemCount-1)
        const cart = {...cartItems};
        if(props.foodItems.productId in cart) {
            const c = cart[props.foodItems.productId]
            cart[props.foodItems.productId] = c - 1
            if(cart[props.foodItems.productId] < 0) cart[props.foodItems.productId] = 0;
        }
        setCartItems(cart)
    }

    const increaseItemCount = () => {
        setItemCount(itemCount+1)
        const cart = {...cartItems};
        if (props.foodItems.productId in cart) {
            const c = cart[props.foodItems.productId]
            cart[props.foodItems.productId] = 1 + c
        }
        else {
            cart[props.foodItems.productId] = 1
        }
        setCartItems(cart)
    }

    return (
        <div className="flex flex-row gap-5 self-center pt-2 pb-2">
            <div className="self-center">
                <Image
                src="/logo.png"
                className="rounded-lg"
                width={100}
                height={100}
                />
            </div>
            <div className="flex flex-col justify-around">
                <p className="text-xl font-semibold">{props.foodItems.productName}</p>
                <p className="w-52 text-sm font-light">1x Mini Plain Butter  Dosa + 1x Mini Vada + 2x Idli + 1x</p>
                <div className="flex flex-row justify-between">
                    <p className="self-center text-lg">{props.foodItems.productPrice}</p>
                    <div>
                        {/* <p className="text-sm font-light mt-2">No. Of Unit</p> */}
                        <div className="flex flex-row gap-2">
                            <MinusCircleIcon onClick={decreaseItemCount} className="cursor-pointer h-6 text-red-500"/>
                            <p className="bg-gray-300 rounded-full pl-5 pr-5">{itemCount}</p>
                            <PlusCircleIcon onClick={increaseItemCount} className="cursor-pointer h-6 text-red-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodUnitMob;