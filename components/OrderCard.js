export const OrderCard = ({orderItem}) => {
    console.log(orderItem)
    // console.log(productItem)
    return (
        <div className="self-center flex w-80 md:w-96 pt-5 pb-5 ml-4 mr-4 flex-col gap-2 rounded-2xl shadow-lg">
            <div className="flex flex-col">
                <p className="self-center font-medium text-2xl">{orderItem.purchase_item_name}</p>
                <div className="flex flex-row justify-around">
                    <div>
                        <p className="font-light">No. of Unit</p>
                        <p className="self-center font-semibold text-xl">x {orderItem.purchase_unit_count}</p>
                    </div>
                    <div>
                        <p className="font-light">Price</p>
                        <p className="self-center font-semibold text-lg">Rs. {orderItem.selling_price}/-</p>
                    </div>
                    <div>
                        <p className="font-light">Order Date</p>
                        <p className="self-center font-semibold text-lg">{orderItem.order_placed_time.slice(0,10)}</p>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-row ml-2 mr-2 justify-evenly relative">
                <p className="self-center font-semibold text-xl">{orderItem.purchase_item_name}</p>
                <p className="self-center font-semibold text-lg">x {orderItem.purchase_unit_count}</p>
                <p className="self-center font-semibold text-lg">Rs. {orderItem.selling_price}/-</p>
            </div> */}
            <p className="border-2 rounded-full ml-10 mr-10"></p>
            <div className="flex ml-5 flex-row gap-3">
                <p className="text-xs text-gray-700 self-center text-center">Order Status : </p>
                <p className="text-lg self-center text-center font-medium">{orderItem.order_status}</p>
            </div>
            <div className="flex ml-5 flex-row">
                {/* <p className="text-lg font-semibold text-gray-800">{orderItem.payment_mode}</p> */}
                { orderItem.payment_received && <p className="text-center md:text-lg font-semibold text-white bg-green-500 rounded-lg pl-2 pr-2">Payment Received</p>}
                { !orderItem.payment_received && <p className="text-center md:text-lg font-semibold text-white bg-red-500 rounded-lg pl-2 pr-2">Payment Not Received</p>}
            </div>
        </div>
    )
}

export default OrderCard