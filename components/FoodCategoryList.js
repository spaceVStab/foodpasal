import {
    HeartIcon,
    PlusCircleIcon,
    MinusCircleIcon
} from "@heroicons/react/solid"
import Image from "next/image";
import FoodUnit from "./FoodUnit";
import { useState, useEffect } from "react";

export const FoodCategoryList = ( props ) => {

    const [itemCount, setItemCount] = useState({});

    useEffect( ()=> {
        console.log(itemCount)
    }, [itemCount])

    const decreaseItemCount = (productId) => {
        let temp = itemCount
        if(productId in temp) {
            temp[productId] -= 1
            if(temp[productId] < 0) temp[productId] = 0
        }
        // console.log(temp)
        setItemCount(temp)
    }

    const increaseItemCount = (productId) => {
        // check if exist
        let temp = itemCount
        if(productId in temp){
            temp[productId] += 1
        }
        else{
            temp[productId] = 1
        }
        // console.log(temp)
        setItemCount(temp)
    }

    return (
        <div className="flex flex-col gap-10">
            {props.foodUnitCategory.map((foodItems, index) => (
                <FoodUnit foodItems={foodItems} />
            ))}
        </div>
    )

}

export default FoodCategoryList;