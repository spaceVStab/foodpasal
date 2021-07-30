import FoodCategoryList from "./FoodCategoryList"

export const FoodItemList = ( props ) => {
    return (
        <div className="flex flex-col gap-10">
            {props.foodList.map((foodCategoryList, index) => (
                <div className="flex flex-col rounded-xl bg-white shadow-xl p-10 gap-5">
                    <p id={foodCategoryList.categoryName} className="text-2xl font-semibold">{foodCategoryList.categoryName}</p>
                    <FoodCategoryList foodUnitCategory={foodCategoryList.productList} />
                </div>
            ))}
        </div>
    )
}

export default FoodItemList