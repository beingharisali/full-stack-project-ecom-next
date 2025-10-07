"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditProduct() {
	const { id } = useParams();

	async function getSingleProduct(id) {
		const singleProduct = await axios.get(
			`http://localhost:8000/api/v1/single-product/${id}`
		);
		console.log(singleProduct.data);
		// setProduct({
		// 	pName: singleProduct.data.pName,
		// 	description: singleProduct.data.description,
		// 	price: singleProduct.data.price,
		// 	category: singleProduct.data.category,
		// });
	}
	useEffect(() => {
		getSingleProduct(id);
	}, []);

	const [productData, setProduct] = useState({
		title: "",
		description: "",
		price: "",
		brand: "",
		imageURL: "",
	});

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setProduct({ ...productData, [name]: value });
	};
	async function EditProductData(id) {
		await axios
			.patch(`http://localhost:5001/update/${id}`, productData)
			.then(console.log("Product has been Updated"));
	}

	async function submitHandler(e) {
		e.preventDefault();
		EditProductData(id);
		setProduct({
			title: "",
			description: "",
			price: "",
			brand: "",
			imageURL: "",
		});
	}
	return (
		<>
			<Link href={"/products"}>
				<button className="bg-gray-200 px-4 py-2 rounded m-6 cursor-pointer active:bg-gray-300">
					Back
				</button>
			</Link>
			<form
				className="container mx-auto w-2/5 flex flex-col border-gray-300 border p-7 rounded-3xl gap-2"
				onSubmit={submitHandler}>
				<label htmlFor="title">Product title:</label>
				<input
					type="text"
					id="title"
					placeholder="Product title"
					className="p-3 border rounded-lg"
					name="title"
					value={productData.title}
					onChange={changeHandler}
					required
					autoFocus
				/>
				<label htmlFor="price">Price:</label>
				<input
					type="number"
					id="price"
					placeholder="Product Price"
					name="price"
					className="p-3 border rounded-lg"
					value={productData.price}
					onChange={changeHandler}
					required
				/>
				<label htmlFor="brand">Category</label>
				<input
					type="text"
					id="brand"
					placeholder="Product Category"
					name="brand"
					className="p-3 border rounded-lg"
					value={productData.brand}
					onChange={changeHandler}
					required
				/>
				<label htmlFor="imageURL">Image URL :</label>
				<input
					type="text"
					id="imageURL"
					placeholder="Product Image"
					name="imageURL"
					className="p-3 border rounded-lg"
					value={productData.imageURL}
					onChange={changeHandler}
					required
				/>
				<label htmlFor="description:">Description:</label>
				<textarea
					type="text"
					id="description"
					placeholder="Product Description"
					name="description"
					className="p-3 border rounded-lg h-30"
					value={productData.description}
					onChange={changeHandler}
					required
				/>
				<button
					type="submit"
					className="p-2 border bg-gray-500 rounded-lg cursor-pointer active:bg-gray-600">
					Create Product
				</button>
			</form>
		</>
	);
}
