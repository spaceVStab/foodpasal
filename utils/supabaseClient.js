import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASEURL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASEKEY
export const shop_id = process.env.NEXT_PUBLIC_SHOPID

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getCategory = async () => {
    try {
        console.log('getCategory')
        const {data, error} = await supabase
            .from('foodcategory')
            .select('*')
            .eq('shop_id', shop_id)

        return data || [];
    } catch (error) {
        alert(error.message)
    }
}

// export const getProductById = async ( {product_id} ) => {
//     try {
//         console.log('getProductById')
//         const {data, error} = await supabase 
//             .from('product')
//             .select('product_id, category_id, product_name, product_price, product_description, product_image_1, product_unit_name')
//             .eq('product_id', product_id)
//         return data || [];
//     } catch (error) {
//         alert(error.message)
//     }
// }

export const getActiveFoodItemsForShop = async () => {    
    try{
        console.log('getActiveFoodItemsForShop')
        const {data, error} = await supabase
            .from('fooditem')
            .select('*')
            .eq('shop_id', shop_id)
            .eq('item_active', true)    
        
        return data || [];
    } catch (error) {
        console.log(error.message)
    }
}
