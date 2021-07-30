import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://pizcffmijqkrsccyopze.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzM5NjM5MSwiZXhwIjoxOTQyOTcyMzkxfQ.7qB3fZ-VVNDwVtxvd9UTCCR_ghZOOTaFcVYaR-9xs2M'
export const shop_id = '4508541a-e2c7-4227-99f3-2a68cfecc2bf'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const getCategory = async () => {
    try {
        console.log('getCategory')
        const {data, error} = await supabase
            .from('p_category')
            .select('*')

        return data || [];
    } catch (error) {
        alert(error.message)
    }
}

export const getProductById = async ( {product_id} ) => {
    try {
        console.log('getProductById')
        const {data, error} = await supabase 
            .from('product')
            .select('product_id, category_id, product_name, product_price, product_description, product_image_1, product_unit_name')
            .eq('product_id', product_id)
        return data || [];
    } catch (error) {
        alert(error.message)
    }
}

export const getActiveProductsForShop = async () => {    
    try{
        console.log('getActiveProductsForShop')
        const {data, error} = await supabase
            .from('product')
            .select('product_id, category_id, product_name, product_price, product_description, product_image_1, product_unit_name, discount_percentage')
            .eq('shop_id', shop_id)
            .eq('product_active', true)    
        
        return data || [];
    } catch (error) {
        console.log(error.message)
    }
}
