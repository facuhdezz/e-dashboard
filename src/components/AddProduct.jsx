import { useState } from "react";
import ProductAdded from "./ProductAdded";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";

const AddProduct = ({ item = {} }) => {

    const [selectDest, setSelectDest] = useState(item.destacado || "")
    const [selectCat, setSelectCat] = useState(item.categoria || "calefactores")
    const [selectSubCat, setSelectSubCat] = useState(item.subcategoria || "pellet")
    const [selectMoneda, setSelectMoneda] = useState("")
    const [caracteristica, setCaracteristica] = useState("")
    const [valorCaracteristica, setValorCaracteristica] = useState("")
    const [idProduct, setIdProduct] = useState(item.id || "")
    const [product, setProduct] = useState({
        nombre: item.nombre || "",
        descripcion: item.descripcion || "",
        url: item.url || "",
        moneda: item.moneda || "USD",
        precio: item.precio || 0,
        caracteristicas: item.caracteristicas || {},
        categoria: item.categoria || "calefactores",
        subcategoria: item.subcategoria || "",
        destacado: item.destacado || "false"
    })

    const [isAdded, setIsAdded] = useState(false);

    const handleChangeValue = (event) => {
        if (event.target.name === "categoria") {
            setSelectCat(event.target.value)
        } else if (event.target.name === "subcategoria") {
            setSelectSubCat(event.target.value) 
        } else if (event.target.name === "destacado") {
            setSelectDest(event.target.value)
        } else if (event.target.name === "moneda") {
            setSelectMoneda(event.target.value)
        }
    }

    const handleChangeProduct = ({ target: { name, value } }) => {
        setProduct({ ...product, [name]: value })
    }

    const handleChangeId = (e) => {
        setIdProduct(e.target.value)
    }

    const handleChangeCaract = (event) => {
        if (event.target.name === "nombreCar") {
            setCaracteristica(event.target.value)
        } else if (event.target.name === "valorCar") {
            setValorCaracteristica(event.target.value)
        }
    }

    const handleSetCaract = (e) => {
        e.preventDefault()
        setProduct((prevProduct) => ({
            ...prevProduct, 
            caracteristicas: {
                ...prevProduct.caracteristicas,
                [caracteristica]: valorCaracteristica
            }
        }))
        setCaracteristica("")
        setValorCaracteristica("")
    }

    const handleChange = (event) => {
        handleChangeValue(event)
        handleChangeProduct(event);
        if (product.categoria == "aires acondicionados") {
            setSelectSubCat("")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAdded(true);
    }

    const handleClear = () => {
        setSelectDest("");
        setSelectCat("calefactores");
        setSelectSubCat("");
        setSelectMoneda("");
        setIdProduct("")
        setProduct({
            nombre: "",
            descripcion: "",
            url: "",
            moneda: "USD",
            precio: null,
            caracteristicas: {},
            categoria: "calefactores",
            subcategoria: "pellet",
            destacado: "false"
        });
        setIsAdded(false)
    }

    const sendProduct = () => {
        const db = getFirestore();
        setDoc(doc(db, "products", idProduct), {...product, createdAt: Timestamp.now()});
        handleClear();
    }

    return (
        <section className="h-full overflow-y-scroll">
            {isAdded && 
                <div className="flex flex-col gap-4 items-center">
                    <ProductAdded nombre={product.nombre} descripcion={product.descripcion} url={product.url} moneda={product.moneda} precio={product.precio} caracteristicas={product.caracteristicas} categoria={product.categoria} subcategoria={product.subcategoria} destacado={product.destacado} />
                    <div className="flex flex-col gap-2">
                        <button onClick={sendProduct} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
                        <button onClick={handleClear} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-700">Eliminar producto</button>
                    </div>
                </div>
            } 
            <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del producto</label>
                    <input type="text" name="nombre" value={product.nombre} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="Eco Start 12"></input>
                </div>
                <div>
                    <label>Descripción del producto</label>
                    <input type="text" name="descripcion" value={product.descripcion} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="Calefactor a pellet Eco Start 12 12kw"></input>
                </div>
                <div>
                    <label>URL de la imagen</label>
                    <input type="text" name="url" value={product.url} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="https://i.imgur.com/aob6y6d.jpg"></input>
                </div>
                <div>
                    <label>Mondeda</label>
                    <select id="moneda" name="moneda" onChange={handleChange} value={selectMoneda} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="USD" >USD - Dólares</option>
                        <option value="$">$UY - Pesos</option>
                    </select>
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number" name="precio" value={product.precio} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                </div>
                <div>
                    <h1 className="font-semibold">Características</h1>
                    <div className="flex gap-1">
                        <div className="basis-1/2">
                            <label className="text-sm">Nombre</label>
                            <input type="text" name="nombreCar" value={caracteristica} onChange={handleChangeCaract} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                        </div>
                        <div className="basis-1/2">
                            <label className="text-sm">Valor</label>
                            <input type="text" name="valorCar" value={valorCaracteristica} onChange={handleChangeCaract} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                        </div>
                    </div>                    
                    <button onClick={handleSetCaract} className="text-sm border rounded float-right mt-2 p-1 hover:bg-gray-100">+ Agregar Característica</button>
                </div>
                <div>
                    <label>Categoría</label>
                    <select id="categoria" name="categoria" value={selectCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="calefactores">Calefactores</option>
                        <option value="aires acondicionados">Aires Acondicionados</option>
                    </select>
                </div>
                {selectCat == "calefactores" && <div>
                    <label>Sub Categoría</label>
                    <select id="subcategoria" name="subcategoria" value={selectSubCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="pellet">Calefactores a pellet</option>
                        <option value="leña">Calefactores a leña</option>
                    </select>
                </div>}
                <div>
                    <label>¿Producto destacado?</label>
                    <select id="destacado" name="destacado" value={selectDest} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="false">No</option>
                        <option value="true">Si</option>
                    </select>
                </div>
                <div>
                    <label>ID del producto</label>
                    <input type="text" name="id" value={idProduct} onChange={handleChangeId} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                </div>
                <button type="submit" className="bg-gray-100 border border-gray-300 p-2 rounded text-lg hover:bg-gray-200">Agregar producto</button>
            </form>
        </section>
    )
}

export default AddProduct;