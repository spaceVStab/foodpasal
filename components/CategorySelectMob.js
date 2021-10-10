import { Select, MenuItem } from "@material-ui/core";

export const CategorySelectMob = ( {categories} ) => {
    return (
        <div className="self-center m-5">
            <p className="text-xl font-light text-center">Food Categories</p>
            <Select
                className="outline-none border-2 border-red-500 pl-5 pr-5 h-10 rounded-full text-lg w-80"
            >
                {categories.map((category, index) => (
                    <a href={"#"+category}>
                    {/* {index==0 && <MenuItem selected value={category}>{category}</MenuItem>} */}
                    <MenuItem value={category}>{category}</MenuItem>
                    </a>
                ))}
                {/* <MenuItem value="cashondelivery">Cash On Delivery</MenuItem>
                <MenuItem value="khaltipayment">Khalti Payments</MenuItem>
                <MenuItem value="esewapayment">E-Sewa Payments</MenuItem> */}
            </Select>

            {/* <div className="flex flex-col gap-1 pl-10 pr-10 p-5 shadow-xl rounded-2xl bg-white">
                <p className="text-xl font-semibold">Categories</p>
                {categories.map((category, index) => (
                    <a href={"#"+category}><p>{category}</p></a>
                ))}
            </div> */}
        </div>
    )
}

export default CategorySelectMob;