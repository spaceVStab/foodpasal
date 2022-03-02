import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/utils/useUser";
import Head from "next/head";
import router from "next/router";
import OrderCard from "@/components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export const Orders = () => {
    const {user} = useUser();
    const [pastOrders, setPastOrders] = useState([]);
    const [cartNill, setCartNill] = useState(false);

    useEffect(() => {
        if(!user) router.replace('/login')
        else getPastOrders()
    }, [user])

    const getPastOrders = async () => {
        try {
            const user = supabase.auth.user()
            const {data, error} = await supabase 
                .from('orders')
                .select('*')
                .order('order_placed_time', {ascending:false})
                .eq('buyer_user_id', user.id)
            // console.log(data)
            // console.log(user.id)
            if(data.length>0) setPastOrders(data)
            // else setCartNill(true)
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <div className="text-black flex flex-col bg-white">
            <Head>
                <title>KhajaGhar | StackMyStore</title>
                <meta name="description" content="Welcome to Homepage of StackMyStore. The fastest and easiest way of starting your ecommerce platform" />
            </Head>
            <div onClick={() => router.replace('/')} className="cursor-pointer flex flex-row h-16 pl-5 bg-gray-300">
                <ChevronLeftIcon className="h-8 self-center" />
                <p className="text-2xl font-medium self-center">Back</p>
            </div>
            { pastOrders.length>0 && (
                <>
                <p className="text-center font-medium text-2xl">Order History</p>
                <div className="flex self-center flex-col mt-5 md:mt-10 mb-10 gap-5 max-w-lg">
                    { pastOrders.map((order, index) => (
                        // <p>{order.order_id}</p>
                        <OrderCard orderItem={order} />
                    ))}
                </div>
                </>
            )}
            { pastOrders.length==0 && (
                <div className="self-center">
                    <p>No Past Orders</p>
                </div>
            )}
        </div>
    )
}

export default Orders;