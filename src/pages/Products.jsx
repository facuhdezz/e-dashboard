import { useEffect, useRef, useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCard";
import Search from "../assets/icons/search.svg"
import { useProducts } from "../context/ProductsContext";

const Products = () => {

    const { productList } = useProducts()
    const [products, setProducts] = useState(productList || []);
    const [filter, setFilter] = useState("");    
    const [productsSearch, setProductsSearch] = useState("");


    useEffect(() => {
        if (productList) {
            setProducts(productList);
        }
    }, [productList]);

    const filteredProducts = (filter) => {
        if (filter && (productsSearch.length == 0)) {
            return products.filter(products => products.categoria == filter);
        } else if (productsSearch.length > 0) {
            return products.filter((product) => product.descripcion.toLocaleLowerCase().includes(productsSearch.toLocaleLowerCase()) || product.categoria.toLocaleLowerCase().includes(productsSearch.toLocaleLowerCase()))
        } else {
            return products;
        }
    }

    const productsToPut = filteredProducts(filter)

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
        <section className="flex flex-col-reverse sm:flex-row gap-3 h-full">
            <article className="sm:basis-1/2 xl:basis-2/3 p-6 border rounded-lg sm:overflow-y-scroll bg-white">
                <h1 className="text-3xl font-semibold mb-3">Productos:</h1>
                <div className="flex flex-col xl:flex-row xl:items-end xl:gap-8 mb-4">
                    <h2 className={`hover:cursor-pointer hover:text-gray-800 mx-2 ${filter == "" ? "border-b-2 border-blue-600" : ""}`} onClick={() => {setFilter("")}}>Todos los productos</h2>
                    <h2 className={`hover:cursor-pointer hover:text-gray-800 mx-2 ${filter == "calefactores" ? "border-b-2 border-blue-600" : ""}`} onClick={() => {setFilter("calefactores")}}>Calefactores</h2>
                    <h2 className={`hover:cursor-pointer hover:text-gray-800 mx-2 ${filter == "aires acondicionados" ? "border-b-2 border-blue-600" : ""}`} onClick={() => {setFilter("aires acondicionados")}}>Aires acondicionados</h2>
                </div>
                <div className="flex gap-2 mb-4">
                    <img src={Search} />
                    <input type="search" placeholder="Buscar un producto" onInput={(event) => { setProductsSearch(event.target.value) }} value={productsSearch} className="search-input bg-gray-100 w-[500px] h-8 rounded-md border border-gray-300 p-2 outline-none focus:bg-white focus:border-gray-400 duration-200"/>
                </div>
                {(productsToPut.length == 0) && <p className="bg-white text-center p-4 border-2 border-gray-700">No se encontraron productos.</p>}
                <div className="producto">
                    {productsToPut.map(item => (
                        <ProductCard onRemove={handleRemoveProduct} key={item.id} clase={"w-auto"} item={item} />
                    ))}
                </div>                
            </article>
            <article ref={addRef} className="sm:basis-1/2 xl:basis-1/3 p-3 border rounded-lg sm:overflow-y-scroll bg-white">
                <div>
                    <h1 className="text-xl font-semibold">Agregar un producto</h1>
                    <AddProduct />
                </div>
            </article>
        </section>
    )
}

export default Products;