import FoodUnitMob from "./FoodUnitMob";

export const FoodItemListMob = ( props ) => {
    return (
        <div className="flex flex-col gap-5">
            { props.foodList.map((foodPerCategory, index) => (
                <div className="flex flex-col gap-5" id={foodPerCategory.category_name}>
                    <h3 className="text-3xl self-center text-center bg-red-500 text-white border-2 border-red-500 rounded-full ml-5 w-80 mr-5 font-semibold">{foodPerCategory.category_name}</h3>
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