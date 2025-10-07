"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function page() {
	const [products, setProducts] = useState([]);

	async function fetchData() {
		try {
			const response = await axios.get("http://localhost:8000/api/v1/products");

			// 1. FIX: The data is on the response object, not 'response.data' in the chain.
			console.log("Data has been fetched from database", response.data);
			setProducts(response.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	}

	async function deleteProduct(id) {
		try {
			await axios.delete(`http://localhost:8000/api/v1/delete-products/${id}`);
			setProducts((prevProducts) =>
				prevProducts.filter((product) => product._id !== id)
			);
		} catch (error) {
			console.log("Error occurred while deleting product", error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Link href={"/create-product"}>
				<button className="bg-gray-100 px-4 py-2 rounded m-6 cursor-pointer active:bg-gray-300">
					Create
				</button>
			</Link>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
				{products.map((myData) => (
					<div
						key={myData._id || myData.title}
						className="group relative block overflow-hidden shadow-lg rounded-lg">
						<button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
							<span className="sr-only">Wishlist</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="size-4">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
								/>
							</svg>
						</button>

						<img
							src={myData.imageURL}
							alt={myData.pName}
							className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
						/>

						<div className="relative border border-gray-100 bg-white p-6">
							<p className="text-gray-700">
								${myData.price}
								<span className="text-gray-400 line-through ml-2">
									$80
								</span>{" "}
							</p>

							<h3 className="mt-1.5 text-lg font-medium text-gray-900">
								{myData.title}
							</h3>

							<p className="mt-1.5 line-clamp-3 text-gray-700">
								{myData.brand}
							</p>
							<p className="mt-1.5 line-clamp-3 text-gray-700">
								{myData.description}
							</p>

							<div className="mt-4 flex gap-4">
								<button
									className="block w-full rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 hover:bg-red-50 hover:text-red-700"
									onClick={() => {
										if (
											window.confirm(
												"Are you sure you want to delete this product?"
											)
										) {
											deleteProduct(myData._id);
										}
									}}>
									Delete
								</button>
								<Link href={`/update-product/${myData._id}`}>
									<button
										type="button"
										className="block w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105">
										Edit
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
