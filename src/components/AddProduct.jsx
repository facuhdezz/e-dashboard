import { useState } from "react";
import ProductAdded from "./ProductAdded";

const AddProduct = ({ item }) => {

    const [selectDest, setSelectDest] = useState("")
    const [selectCat, setSelectCat] = useState("calefactores")
    const [selectSubCat, setSelectSubCat] = useState("")
    const [selectMoneda, setSelectMoneda] = useState("")
    const [caracteristica, setCaracteristica] = useState("")
    const [valorCaracteristica, setValorCaracteristica] = useState("")
    const [product, setProduct] = useState({
        nombre: "",
        descripcion: "",
        url: "",
        moneda: "USD",
        precio: null,
        caracteristicas: {},
        categoria: "calefactores",
        subcategoria: "pellet",
        destacado: "false"
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
        if (product.categoria == "aires acondicionados") {
            setProduct({ ...product, subcategoria: ""})
        }
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
        console.log(product);
        setCaracteristica("")
        setValorCaracteristica("")
    }

    const handleChange = (event) => {
        handleChangeValue(event)
        handleChangeProduct(event);
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

    return (
        <section className="h-full overflow-y-scroll">
            <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit}>
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
                    <select id="moneda" name="moneda" onChange={handleChange} value={selectMoneda} type="text" className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="USD" >USD - Dólares</option>
                        <option value="$">$UY - Pesos</option>
                    </select>
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number" name="precio" onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
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
                    <select id="categoria" type="text" name="categoria" value={selectCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="calefactores">Calefactores</option>
                        <option value="aires acondicionados">Aires Acondicionados</option>
                    </select>
                </div>
                {selectCat == "calefactores" && <div>
                    <label>Sub Categoría</label>
                    <select id="subcategoria" type="text" name="subcategoria" value={selectSubCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="pellet">Calefactores a pellet</option>
                        <option value="leña">Calefactores a leña</option>
                    </select>
                </div>}
                <div>
                    <label>¿Producto destacado?</label>
                    <select id="destacado" type="text" name="destacado" value={selectDest} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="false">No</option>
                        <option value="true">Si</option>
                    </select>
                </div>
                <button type="submit">Agregar producto</button>
            </form>
            {isAdded && 
                <div className="flex flex-col gap-4 items-center">
                    <ProductAdded nombre={product.nombre} descripcion={product.descripcion} url={product.url} moneda={product.moneda} precio={product.precio} caracteristicas={product.caracteristicas} categoria={product.categoria} subcategoria={product.subcategoria} destacado={product.destacado} />
                    <div className="flex flex-col gap-2">
                        <button onClick={handleClear} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
                        <button onClick={handleClear} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-700">Eliminar producto</button>
                    </div>
                </div>
            } 
        </section>
    )
}

export default AddProduct;