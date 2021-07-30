import Head from 'next/head'
import CategoryCard from '../components/CategoryCard'
import Header from '../components/Header'
import { CategoryList } from '../resources/categoryList'
import FoodItemList from '@/components/FoodItemList'
import CartDetail from '@/components/CartDetail'
import { useState } from 'react'
import { CartContext } from '@/components/CartContext'

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

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <Header />
        {/* banner */}

        {/* display food items */}
        <div className="flex mt-10 flex-row justify-center gap-10">
          {/* categories  */}
            <CategoryCard categories={categories} />

            <CartContext.Provider value={{cartItems, setCartItems}}>
            {/* food detail  */}
              <FoodItemList foodList={CategoryList}/>
              
            {/* cart detail  */}
              <CartDetail productKeyed={productKeyed}/>
            </CartContext.Provider>
        </div>
      </main>
    </div>
  )
}
