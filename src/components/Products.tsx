"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "./Loader";

type Props = {};

const Products = (props: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageProducts, setPageProducts] = useState<any[]>([]);

  const productsPerPage = 8;

  const totalPages = useMemo(() => {
    return Math.ceil(products.length / productsPerPage);
  }, [products]);

  const searchProducts = useMemo(() => {
    if (keyword.length > 0)
      return products.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      );
    else return [];
  }, [products, keyword]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        let result = token?.replace(/"/g, "");
        const url =
          "https://intern-task-api.bravo68web.workers.dev/api/products";
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${result}` },
        });
        setProducts(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    setPageProducts(currentProducts);
  }, [page, products]);

  return (
    <div className="container">
      {loading ? (
        <div className="w-full h-dvh flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="py-10">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for products..."
              className="bg-black p-4 py-2 text-xl font-medium border-2 border-white rounded-lg w-full outline-none"
            />
            {searchProducts?.length > 0 && (
              <div className="max-h-32 bg-white text-black overflow-y-scroll flex flex-col rounded-lg">
                <h2 className="font-bold text-lg p-2">
                  Total {searchProducts?.length} product(s) found
                </h2>
                {searchProducts?.map((product, index) => (
                  <div key={index} className="px-2 py-1 text-lg">
                    {product.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageProducts?.map((product: any, index) => (
              <div
                key={index}
                className="border-2 border-white rounded-xl flex flex-col "
              >
                <div className="relative">
                  <Image
                    src={product?.thumbnail}
                    alt={product?.title}
                    width={100}
                    height={100}
                    className="size-28 object-cover mx-auto"
                  />
                  <p className="absolute z-10 bottom-0 right-10 -rotate-45 text-lg">
                    ${product?.price}
                  </p>
                </div>
                <div className="p-4 mt-6 text-center">
                  <h2 className="text-lg font-semibold">{product?.title}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="py-10 flex items-center justify-center gap-1">
            {Array(totalPages)
              .fill("")
              .map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`rounded-lg p-4 py-2 uppercase font-bold text-lg ${
                    page === index + 1
                      ? `bg-black text-white border-2 border-white`
                      : `bg-white text-black border-2 border-black`
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
