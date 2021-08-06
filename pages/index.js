import Head from 'next/head'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'
import CategorySelectMob from '@/components/CategorySelectMob'
import { CategoryList } from '../resources/categoryList'
import FoodItemList from '@/components/FoodItemList'
import CartDetail from '@/components/CartDetail'
import HeaderMob from '@/components/HeaderMob'
import { supabase } from '@/utils/supabaseClient'
import { useState } from 'react'
import { CartContext } from '@/components/CartContext'
import { useCallback } from 'react'
import FoodItemListMob from '@/components/FoodItemListMob'
import { useEffect } from 'react'
import CartNavBarMob from '@/components/CartNavBarMob'
import { getActiveFoodItemsForShop } from '@/utils/supabaseClient'
import { getCategory } from '@/utils/supabaseClient'

export const getStaticProps = async () => {
  const products = await getActiveFoodItemsForShop();
  const categories = await getCategory();

  categories.map( (category, index) => {
    let temp = []
    products.some((e) => {
      if(e.category_id == category.category_id) {
        temp.push(e)
      }
    })
    category['fooditems'] = temp
  })

  return {
    props: { categoriesSupa:categories },
    revalidate: 300,
  }
}

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`)
    media.addEventListener('change', e => updateTarget(e))

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener('change', e => updateTarget(e))
  }, [])

  return targetReached;
};


export default function Home( {categoriesSupa} ) {

  console.log(categoriesSupa)

  const categories = []
  let foodItemList = []
  categoriesSupa.map((category, index) => {
    categories.push(category.category_name)
    foodItemList = foodItemList.concat(category.fooditems)
  })

  // const categories = []
  // let productList = []
  // CategoryList.map((category, index) => {
  //   categories.push(category.categoryName)
  //   productList = productList.concat(category.productList)
  // })

  const productKeyed = {}
  foodItemList.map((foodItem, index) => {
    productKeyed[foodItem.item_id] = foodItem
  })
  // console.log(productKeyed)

  const isBreakpoint = useMediaQuery(768)

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      {!isBreakpoint && (<main className="bg-gray-100">
        <Header />
        {/* banner */}

        {/* display food items */}
        <div className="flex ml-5 mr-5 mt-10 mb-20 flex-row justify-center gap-5">
          {/* categories  */}
            <CategoryCard categories={categories} />

            
            {/* food detail  */}
              <FoodItemList foodList={categoriesSupa}/>
              
            {/* cart detail  */}
              <CartDetail productKeyed={productKeyed}/>
            {/* </CartContext.Provider> */}
        </div>
        <p className="font-light text-xl text-center p-4">Powered By StackMyStore</p>
      </main>)}
      { isBreakpoint && (
        <main>
          <div className="flex flex-col">
            <HeaderMob />
            <CategorySelectMob categories={categories} />
          {/* <CartContext.Provider value={{cartItems, setCartItems}}> */}
            <FoodItemListMob foodList={categoriesSupa} />
            <CartNavBarMob productKeyed={productKeyed}/>
          {/* </CartContext.Provider> */}
          <p className="font-light text-xl text-center p-4">Powered By StackMyStore</p>
          </div>
        </main>
      )}
    </div>
  )
}
