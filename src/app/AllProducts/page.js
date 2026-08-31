'use client'
import ProductList from "../../../components/productList/productList";
import { useSelector } from "react-redux";
import "./allProducts.css";

export default function AllProductPage() {
  const products = useSelector((state) => state.products.items);

  return (
    <main className="all-products-page">
      <section className="all-products-intro" aria-labelledby="all-products-title">
        <div className="all-products-copy">
          <p className="all-products-kicker">THE SOLEVO EDIT</p>
          <h1 id="all-products-title">Find your next favorite pair.</h1>
          <p className="all-products-description">
            Step into a collection made for everyday movement, standout moments,
            and everything in between.
          </p>
        </div>
        <p className="all-products-count">{products.length} pairs to explore</p>
      </section>
      <ProductList />
    </main>
  );
}