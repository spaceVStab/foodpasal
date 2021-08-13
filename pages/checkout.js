import { useUser } from "@/utils/useUser";
import router from "next/router";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { Select, MenuItem } from "@material-ui/core";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { shop_id, supabase } from "@/utils/supabaseClient";

export const Checkout = () => {

    const { user, session, signOut } = useUser();
    const {cartItems, setCartItems} = useContext(CartContext)
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymode, setPaymode] = useState('');
    const [note, setNote] = useState('');
    const [totalsum, setTotalsum] = useState(0);
    const [cartFoodItems, setCartFoodItems] = useState([])
    const [cartIdDetailDict, setCartIdDetailDict] = useState({})

    useEffect(() => {
        if(!user) router.replace("/login")
        else getCartFoodItems()
    }, [user])

    if(!user) return(
        <div>
            <p>Redirecting...</p>
        </div>
    )

    const getCartFoodItems = async () => {
        try {
            const itemIdList = []
            Object.entries(cartItems).map((v,k) => {
                if(v[1]>0) {
                    itemIdList.push(v[0])
                }
            })

            const { data, error } = await supabase
                .from('fooditem')
                .select('*')
                .in('item_id', itemIdList)
            const itemIdDetailDict = {}
            if(data) {
                data.map((item, index) => {
                    itemIdDetailDict[item.item_id] = item
                })
            }

            let sum = 0;
            Object.entries(cartItems).map((v,k) => {
                sum += parseInt(itemIdDetailDict[v[0].toString()].item_price.toString().replace(/[^0-9]/g,'')) * parseInt(v[1]);
            })
            setTotalsum(sum);

            // console.log(data)
            // console.log(itemIdDetailDict)
            setCartFoodItems(data)
            setCartIdDetailDict(itemIdDetailDict)
        } catch (error) {
            console.log(error)
        }
    }

    const placeOrderCOD = async () => {
        const orderList = []
        Object.entries(cartItems).map((v, k) => {
            if (v[1]>0) {
                const temp = {}
                temp["shop_id"]=shop_id
                temp["item_id"]=v[0]
                temp["selling_price"]=cartIdDetailDict[v[0]].item_price
                temp["purchase_unit_count"]=v[1]
                temp["purchase_item_name"]=cartIdDetailDict[v[0]].item_name
                temp["order_consumer_note"]=note
                temp["buyer_user_id"]=user.id
                temp["order_status"]='ORDER PLACED'
                temp["payment_mode"]=paymode
                temp["buyer_name"]=name
                temp["buyer_contact_number"]=number
                temp["buyer_delivery_address"]=address
                orderList.push(temp)
            }
        })
        
        try{
            const user = supabase.auth.user()
            const {data, error} = await supabase
                .from('orders')
                .insert(orderList)
            // console.log(data)
            router.replace('/orders')
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-10 bg-gray-100">
            <Link href='/'>
            <div onClick={() => router.replace('/')} className="cursor-pointer flex flex-row h-16 pl-5 bg-gray-400">
                <PlusIcon className="transform rotate-45 h-8 self-center" />
                <p className="text-2xl font-medium self-center">Cancel</p>
            </div>
            </Link>
            <p className="text-center text-3xl font-semibold">Checkout</p>
            {/* {Object.entries(cartItems).map((v, k) => (
                <div>
                    {v[1]>0 && <p className="text-lg font-medium">{v[0]}</p>}
                </div>
            ))} */}
            {/* if logged in  */}
            {/* ask information */}
                {/* name  */}
                {/* phone number */}
                {/* delivery address */}
            <div className="flex flex-col md:flex-row gap-10 self-center">
                <div className="flex flex-col gap-2">
                    <p className="text-center text-lg font-light">Fill All The Details</p>
                    <input 
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-xl text-lg w-80 mr-auto ml-auto"
                    />
                    <input 
                        type="text"
                        placeholder="Your Phone Number"
                        onChange={(e) => setNumber(e.target.value)}
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-xl text-lg w-80 mr-auto ml-auto"
                    />
                    <input 
                        type="text"
                        placeholder="Complete Delivery Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-xl text-lg w-80 mr-auto ml-auto"
                    />
                    <textarea 
                        type="text"
                        placeholder="Additional Note For Us"
                        onChange={(e) => setNote(e.target.value)}
                        className="ml-auto mr-auto outline-none border-2 border-red-500 w-80 h-20 rounded-xl text-lg pl-2 shadow-xl"
                    />
                    <p className="text-center text-lg font-light">Select Payment Method</p>
                    <Select
                        className="outline-none border-2 border-red-500 pl-5 h-10 rounded-xl text-lg w-80 mr-auto ml-auto"
                        onChange={(e) => {
                            setPaymode(e.target.value);
                        } }
                    >
                        <MenuItem value="cashondelivery">Cash On Delivery</MenuItem>
                        <MenuItem value="khaltipayment">Khalti Payments</MenuItem>
                        <MenuItem value="esewapayment">E-Sewa Payments</MenuItem>
                    </Select>
                    {/* payment method */}
                    {/* Confirm */}
                    {/* if online pay redirect otherwise confirm  */}
                    {
                        name.length>0 && number.length>=10 && address.length>0 &&
                        paymode=='cashondelivery' && (
                            <div onClick={() => placeOrderCOD()} className="self-center cursor-pointer pl-5 pr-5 flex flex-row bg-red-500 rounded-2xl shadow-xl">
                                <p className="self-center text-2xl font-medium text-white">Place Order</p>
                                <ChevronDoubleRightIcon className="self-center text-white h-10"/>
                            </div>
                        )
                    }
                </div>
                { Object.entries(cartIdDetailDict).length > 0 && (
                <div className="self-center">
                    <div className="sticky flex flex-col gap-5">
                        <div className="p-5 bg-white rounded-xl shadow-xl w-64">
                            <p className="text-xl font-semibold">Cart Details</p>
                            <div className="divider"></div>
                            <div className="flex flex-col gap-5">
                            {Object.entries(cartItems).map((v, k) => (
                                v[1]>0 && 
                                (<div>
                                    <p className="text-lg font-medium">{cartIdDetailDict[v[0].toString()].item_name}</p>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-light">Rs. {cartIdDetailDict[v[0].toString()].item_price}/-</p>
                                        <p className="font-medium">x {v[1]}</p>
                                    </div>
                                    {/* {v[1]>0 && <p>{parseInt(productKeyed[k.toString()].productPrice.replace(/[^0-9]/g,'')) * parseInt(v[1])}</p>} */}
                                </div>)
                            ))}
                            </div>
                            <div className="divider"></div>
                            <div className="flex flex-col">
                                {totalsum>0 && <p className="font-light text-md">Total Amount</p>}
                                {totalsum>0 && <p className="font-medium text-xl">Rs. {totalsum}/-</p>}
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
            <div>
                <p className="font-light text-xl text-center p-4">Powered By StackMyStore</p>
            </div>
        </div>
    )
}

export default Checkout;