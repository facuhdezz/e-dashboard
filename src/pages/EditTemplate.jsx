import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductDetail from "../components/ProductDetail";

const EditTemplate = () => {

    const { productList } = useProducts()
    const { id } = useParams()
    const [productUnique, setProductUnique] = useState(null)

    useEffect(() => {
        const filteredProduct = productList.find(productos => productos.id == id)
        setProductUnique(filteredProduct)
    }, [id])

    return (
        <section className="flex flex-row gap-3 h-full">
            <article className="basis-1/2 p-6 border rounded-lg overflow-y-scroll bg-white flex flex-col">
                {productUnique && <ProductDetail key={productUnique.id + 1} clase={"w-auto"} item={productUnique} />}
            </article>
            <article className="basis-1/2 p-3 border rounded-lg overflow-y-scroll bg-white">
                <div>
                    <h1 className="text-xl font-semibold">Editar un producto</h1>
                    {productUnique && <AddProduct item={productUnique} />}
                </div>
            </article>
        </section>
    )
}

export default EditTemplate;