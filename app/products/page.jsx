"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardComponent from '../components/Card'

function page() {
  const [products, setProducts] = useState([])

  async function fetchProducts() {
    const res =await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`)
    console.log(res.data.products)
    setProducts(res.data.products)
  }
  useEffect(()=>{
    fetchProducts()
  }, [])
  return (
    <div>
      <h1 className='text-center'>Products</h1>
      <div className="flex justify-center gap-4">
        {
          products.map((myProduct)=>{
            return <CardComponent {...myProduct} />
          })
        }
      </div>
    </div>
  )
}

export default page
