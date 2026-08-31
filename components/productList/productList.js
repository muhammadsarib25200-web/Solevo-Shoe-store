import { useSelector } from "react-redux";
import ProductCard from "@components/productCard/productCard";

export default function productList(){
    const Products = useSelector((state) => state.products.items);
    return(<>
     <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {Products.map((product) =>(
         <ProductCard
          key={product.id}
          product={product}
          showDescription={true}
          cartBtn={true}
        />
      ))}
    </div>
    
    </>)
}