import { useEffect, useRef } from "react";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

const Products = () => {

    const { productList } = useProducts()
    const addRef = useRef(null);

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
                {productList.map(item => (
                    <ProductCard key={item.id} clase={"w-auto"} url={item.url} id={item.id} nombre={item.nombre} descripcion={item.descripcion} precio={item.precio} moneda={item.moneda} caracteristicas={item.caracteristicas} />
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