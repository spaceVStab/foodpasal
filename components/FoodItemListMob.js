import FoodUnitMob from "./FoodUnitMob";

export const FoodItemListMob = ( props ) => {
    return (
        <div>
            { props.foodList.map((foodPerCategory, index) => (
                <div>
                    <p className="text-2xl text-center bg-red-100 font-semibold">{foodPerCategory.categoryName}</p>
                    <div className="flex flex-col gap-2 divide-y-2">
                        {foodPerCategory.productList.map((foodItems,index) => (
                            <FoodUnitMob foodItems={foodItems} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FoodItemListMob;