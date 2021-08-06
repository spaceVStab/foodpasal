import { useState, useEffect } from "react";
import {
    HeartIcon,
    PlusCircleIcon,
    MinusCircleIcon
} from "@heroicons/react/solid"
import Image from "next/image";
import { CartContext } from "./CartContext";
import { useContext } from "react";

export const FoodUnit = ( props ) => {
    const {cartItems, setCartItems} = useContext(CartContext)
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        if(props.foodItems.item_id in cartItems) {
            setItemCount(cartItems[props.foodItems.item_id])
        }
    }, [])

    const decreaseItemCount = () => {
        setItemCount(itemCount-1<=0 ? 0 : itemCount-1)
        const cart = {...cartItems};
        if(props.foodItems.item_id in cart) {
            const c = cart[props.foodItems.item_id]
            cart[props.foodItems.item_id] = c - 1
            if(cart[props.foodItems.item_id] < 0) cart[props.foodItems.item_id] = 0;
        }
        setCartItems(cart)
    }

    const increaseItemCount = () => {
        setItemCount(itemCount+1)
        const cart = {...cartItems};
        // check if exists
        console.log(cart)
        if (props.foodItems.item_id in cart) {
            const c = cart[props.foodItems.item_id]
            cart[props.foodItems.item_id] = 1 + c
        }
        else {
            cart[props.foodItems.item_id] = 1
        }
        // cart[props.foodItems.productId] = 1
        setCartItems(cart)
    }

    return(
        <div className="flex flex-col pt-5 pb-5 lg:flex-row gap-5">
            <img 
                className="rounded-lg"
                src={props.foodItems.item_image_1}
                width={150}
                height={150}
            />
            <div className="flex flex-col gap-5">
                <p className="text-xl font-semibold">{props.foodItems.item_name}</p>
                <p className="w-80 text-md font-light">{props.foodItems.item_description}</p>
                <div className="flex flex-row justify-between">
                    <p className="self-center text-xl">Rs. {props.foodItems.item_price}/-</p>
                    <div>
                        <p className="text-sm font-light mt-2">No. Of Unit</p>
                        <div className="flex flex-row gap-2">
                            <MinusCircleIcon onClick={decreaseItemCount} className="cursor-pointer h-6 text-red-500"/>
                            <p className="bg-gray-300 rounded-full pl-5 pr-5 ">{itemCount}</p>
                            <PlusCircleIcon onClick={increaseItemCount} className="cursor-pointer h-6 text-red-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FoodUnit;