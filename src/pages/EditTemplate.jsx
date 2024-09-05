import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import EditProduct from "../components/EditProduct";
import ProductDetailComp from "../components/ProductDetailComp";

const EditTemplate = () => {

    const { productList } = useProducts()
    const { id } = useParams()
    const [productUnique, setProductUnique] = useState(null)

    useEffect(() => {
        const filteredProduct = productList.find(productos => productos.id == id)
        setProductUnique(filteredProduct)
    }, [id])

    return (
        <section className="flex flex-col lg:flex-row gap-3 h-full">
            <Link to={"/"} className="font-xl"><h1>Volver a productos</h1></Link>
            <article className="sm:basis-1/2 p-6 border rounded-lg overflow-y-scroll bg-white flex flex-col">
                {/* {productUnique && <ProductDetail key={productUnique.id + 1} clase={"w-auto"} item={productUnique} />} */}
                {productUnique && <ProductDetailComp key={productUnique.id + 1} clase={"w-auto"} item={productUnique} />}
            </article>
            <article className="sm:basis-1/2 p-3 border rounded-lg overflow-y-scroll bg-white">
                <div>
                    <h1 className="text-xl font-semibold">Editar un producto</h1>
                    {productUnique && <EditProduct item={productUnique} />}
                </div>
            </article>
        </section>
    )
}

export default EditTemplate;