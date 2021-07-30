export const CategoryCard = ( {categories} ) => {
    return (
        <div className="sticky top-2">
        <div className="flex flex-col gap-1 pl-10 pr-10 p-5 shadow-xl rounded-2xl bg-white">
            <p className="text-xl font-semibold">Categories</p>
            {categories.map((category, index) => (
                <a href={"#"+category}><p>{category}</p></a>
            ))}
        </div>
        </div>
    )
}

export default CategoryCard