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
        if (props.foodItems.item_id in cart) {
            const c = cart[props.foodItems.item_id]
            cart[props.foodItems.item_id] = 1 + c
        }
        else {
            cart[props.foodItems.item_id] = 1
        }
        setCartItems(cart)
    }

    return (
        <div className="flex flex-row gap-5 self-center pt-2 pb-2">
            <div className="self-center">
                <Image
                src={props.foodItems.item_image_1}
                className="rounded-lg"
                width={100}
                height={100}
                />
            </div>
            <div className="flex flex-col justify-around">
                <p className="text-xl font-semibold">{props.foodItems.item_name}</p>
                <p className="w-52 text-sm font-light">{props.foodItems.item_description}</p>
                <div className="flex flex-row justify-between">
                    <p className="self-center text-lg">Rs. {props.foodItems.item_price}/-</p>
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