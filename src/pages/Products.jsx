import { useEffect, useRef, useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

const Products = () => {

    const { productList } = useProducts()
    const [products, setProducts] = useState(productList || []);

    useEffect(() => {
        if (productList) {
            setProducts(productList);
        }
    }, [productList]);

    const handleRemoveProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const addRef = useRef()

    useEffect(() => {
        const handleScrollToTop = () => {
          addRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        };
    
        window.addEventListener('scrollToTop', handleScrollToTop); // ejecuto la funcion al capturar el evento 'scrollToTop'
    
        return () => {
          window.removeEventListener('scrollToTop', handleScrollToTop); // limpio el evento
        };
      }, []);

    return (
        <section className="flex flex-row gap-3 h-full">
            <article className="producto basis-2/3 p-6 border rounded-lg overflow-y-scroll bg-white">
                {products.map(item => (
                    <ProductCard onRemove={handleRemoveProduct} key={item.id} clase={"w-auto"} item={item} />
                ))}
            </article>
            <article ref={addRef} className="basis-1/3 p-3 border rounded-lg overflow-y-scroll bg-white">
                <div>
                    <h1 className="text-xl font-semibold">Agregar un producto</h1>
                    <AddProduct />
                </div>
            </article>
        </section>
    )
}

export default Products;