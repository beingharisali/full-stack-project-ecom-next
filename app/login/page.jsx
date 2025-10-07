"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
        user
      );
      console.log(res);
      setUser({
        email: "",
        password: "",
      });
      toast.success("User logged in successfully");
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  }
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Login
          </h1>
        </div>
        <form onSubmit={submitHandler} className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={user.email}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  for="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  value={user.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Login
              </button>
            </div>
            <p>
              Don't have an account? Please <Link href="/">create</Link> account
              first
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
