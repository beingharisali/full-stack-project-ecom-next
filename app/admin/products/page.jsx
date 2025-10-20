"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function page() {
     const [products, setProducts] = useState([])
     const router = useRouter()
    
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
        <div className="flex justify-end m-4">

        <Button variant='primary' onClick={()=>router.push('/admin/create-product')}>Create</Button>
        </div>
      <Table responsive>
      <thead>
        <tr>
            <th>
                Id
            </th>
            <th>
                Image
            </th>
            <th>
                Title
            </th>
            <th>
                Description
            </th>
            <th>
                Price
            </th>
        </tr>
      </thead>
      <tbody>
        {
            products.map((myProduct)=>{
                return <tr>
         <td>{myProduct._id}</td>
         <td><img src={myProduct.image} alt="" className='rounded-full h-[50px] w-[50px]' /></td>
         <td>{myProduct.title}</td>
         <td>{myProduct.desc}</td>
         <td>${myProduct.price}</td>
        </tr>
            })
        }
      </tbody>
    </Table>
    </div>
  )
}

export default page
