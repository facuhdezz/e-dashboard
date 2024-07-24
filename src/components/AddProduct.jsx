import { useState } from "react";
import ProductCard from "./ProductCard";

const AddProduct = ({ item }) => {

    const [categoria, setCategoria] = useState("calefactores")
    const [product, setProduct] = useState({
        nombre: "",
        descripcion: "",
        url: "",
        moneda: "",
        precio: null,
        categoria: "",
        subcategoria: "",
        destacado: null
    })

    const [isAdded, setIsAdded] = useState(false);

    const handleChangeCategory = (event) => {
        setCategoria(event.target.value)
    }

    const handleChangeProduct = ({ target: { name, value } }) => {
        setProduct({ ...product, [name]: value })
    }

    const handleChange = (event) => {
        if (event.target.name === 'category') {
            handleChangeCategory(event);
        } else {
            handleChangeProduct(event);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdded(true);
        console.log(product);
    }

    return (
        <section>
            <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del producto</label>
                    <input type="text" name="nombre" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder={item.nombre}></input>
                </div>
                <div>
                    <label>Descripción del producto</label>
                    <input type="text" name="descripcion" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder={item.descripcion}></input>
                </div>
                <div>
                    <label>URL de la imagen</label>
                    <input type="text" name="url" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder={item.url}></input>
                </div>
                <div>
                    <label>Mondeda</label>
                    <select id="moneda" name="moneda" onChange={handleChange} type="text" className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="USD" selected>USD - Dólares</option>
                        <option value="$">$UY - Pesos</option>
                    </select>
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number" name="precio" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                </div>
                <div>
                    <label>Categoría</label>
                    <select id="categoria" type="text" name="categoria" value={categoria} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="calefactores" selected>Calefactores</option>
                        <option value="aires acondicionados">Aires Acondicionados</option>
                    </select>
                </div>
                {categoria == "calefactores" && <div>
                    <label>Sub Categoría</label>
                    <select id="subcategoria" type="text" name="subcategoria" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="pellet" selected>Calefactores a pellet</option>
                        <option value="leña">Calefactores a leña</option>
                    </select>
                </div>}
                <div>
                    <label>¿Producto destacado?</label>
                    <select id="destacado" type="text" name="destacado" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="pellet" selected>No</option>
                        <option value="leña">Si</option>
                    </select>
                </div>
                <button type="submit">Agregar producto</button>
            </form>
            {isAdded && <ProductCard item={product} />} 
        </section>
    )
}

export default AddProduct;