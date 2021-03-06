import FoodCategoryList from "./FoodCategoryList"

export const FoodItemList = ( props ) => {
    return (
        <div className="pl-5 pr-5 pb-10 flex flex-col gap-10 h-screen scrollbar-hide overflow-scroll">
            {props.foodList.map((foodCategoryList, index) => (
                <div className="flex flex-col rounded-xl bg-white shadow-xl p-10 gap-5">
                    <div className="z-10 sticky top-0">
                        <h3 id={foodCategoryList.category_name} className="bg-white border-b-2 border-black text-2xl pl-5 pr-5 p-2 font-semibold">{foodCategoryList.category_name}</h3>
                    </div>
                    <div>
                        <FoodCategoryList foodUnitCategory={foodCategoryList.fooditems} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FoodItemList