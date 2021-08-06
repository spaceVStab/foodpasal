import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://pizcffmijqkrsccyopze.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzM5NjM5MSwiZXhwIjoxOTQyOTcyMzkxfQ.7qB3fZ-VVNDwVtxvd9UTCCR_ghZOOTaFcVYaR-9xs2M'
export const shop_id = '10f20107-a286-4d55-8728-638c482f4a95'

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
