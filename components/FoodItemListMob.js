import FoodUnitMob from "./FoodUnitMob";

export const FoodItemListMob = ( props ) => {
    return (
        <div>
            { props.foodList.map((foodPerCategory, index) => (
                <div className="flex flex-col" id={foodPerCategory.category_name}>
                    <p className="text-2xl self-center text-center border-2 border-red-500 rounded-full ml-5 w-80 mr-5 font-semibold">{foodPerCategory.category_name}</p>
                    <div className="flex flex-col gap-2 divide-y-2">
                        {foodPerCategory.fooditems.map((foodItems,index) => (
                            <FoodUnitMob foodItems={foodItems} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FoodItemListMob;