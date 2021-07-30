import Head from 'next/head'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'
import { CategoryList } from '../resources/categoryList'
import FoodItemList from '@/components/FoodItemList'
import CartDetail from '@/components/CartDetail'
import HeaderMob from '@/components/HeaderMob'
import { useState } from 'react'
import { CartContext } from '@/components/CartContext'
import { useCallback } from 'react'
import FoodItemListMob from '@/components/FoodItemListMob'
import { useEffect } from 'react'
import CartNavBarMob from '@/components/CartNavBarMob'

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


export default function Home() {

  const [cartItems, setCartItems] = useState({})

  const categories = []
  let productList = []
  CategoryList.map((category, index) => {
    categories.push(category.categoryName)
    productList = productList.concat(category.productList)
  })

  const productKeyed = {}
  productList.map((product, index) => {
    productKeyed[product.productId] = product
  })
  console.log(productKeyed)

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

            <CartContext.Provider value={{cartItems, setCartItems}}>
            {/* food detail  */}
              <FoodItemList foodList={CategoryList}/>
              
            {/* cart detail  */}
              <CartDetail productKeyed={productKeyed}/>
            </CartContext.Provider>
        </div>
        <p className="font-light text-xl text-center p-4">Powered By StackMyStore</p>
      </main>)}
      { isBreakpoint && (
        <main>
          <HeaderMob />

          <CartContext.Provider value={{cartItems, setCartItems}}>
            <FoodItemListMob foodList={CategoryList} />
            <CartNavBarMob productKeyed={productKeyed}/>
          </CartContext.Provider>
        </main>
      )}
    </div>
  )
}
