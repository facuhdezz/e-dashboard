import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

const Products = () => {

    const { productList } = useProducts()

    return (
        <section className="flex flex-row gap-3 h-full">
            <article className="basis-1/3 p-3 border rounded-lg overflow-y-scroll">
                <div>
                    <h1 className="text-lg font-semibold">Agregar un producto</h1>
                    <AddProduct item={productList[0]} />
                </div>
            </article>
            <article className="producto basis-2/3 p-2 border rounded-lg overflow-y-scroll">
                {productList.map(item => (
                    <ProductCard key={item.idx + 1000} clase={"w-auto"} url={item.url} idx={item.idx} nombre={item.nombre} descripcion={item.descripcion} precio={item.precio} moneda={item.moneda} />
                ))}
            </article>
        </section>
    )
}

export default Products;