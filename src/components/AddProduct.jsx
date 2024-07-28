import Close from '../assets/icons/close.svg'
import { useEffect, useRef, useState } from "react";
import ProductAdded from "./ProductAdded";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useProducts } from '../context/ProductsContext';

const AddProduct = ({ item = {} }) => {

    const section = useRef()

    const { addProductToList } = useProducts()

    const [isAdded, setIsAdded] = useState(false);
    const [exist, setExist] = useState(null)
    const [inputEdit, setInputEdit] = useState("")

    useEffect(() => {
        if (Object.keys(item).length > 0) {
            setExist(true)
        } else {
            setExist(false)
        }
    }, [])

    const [selectDest, setSelectDest] = useState(item.destacado || "")
    const [selectCat, setSelectCat] = useState(item.categoria || "calefactores")
    const [selectSubCat, setSelectSubCat] = useState(item.subcategoria || "pellet")
    const [selectMoneda, setSelectMoneda] = useState("")
    const [caracteristica, setCaracteristica] = useState("")
    const [valorCaracteristica, setValorCaracteristica] = useState("")
    const [idProduct, setIdProduct] = useState(item.id || "")
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(item.url || "")
    const [previewUrl, setPreviewUrl] = useState("")
    const fileInputRef = useRef(null);
    const [product, setProduct] = useState({
        nombre: item.nombre || "",
        descripcion: item.descripcion || "",
        url: item.url || "",
        nombreImg: item.nombreImg || "",
        moneda: item.moneda || "USD",
        precio: item.precio || 0,
        caracteristicas: item.caracteristicas || {},
        categoria: item.categoria || "calefactores",
        subcategoria: item.subcategoria || "",
        destacado: item.destacado || ""
    });

    const handleClick = () => {
        setIsAdded(true);
        window.dispatchEvent(new Event('scrollToTop'));
        console.log(product);
    };

    const handleUpload = () => {
        const storage = getStorage()
        if (!file) return;
        const storageRef = ref(storage, `productImg/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);
                setUrl(downloadURL);
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    url: downloadURL,
                    nombreImg: file.name
                }));
            }).catch((err) => {
                console.log(err);
            })
          }
        );
      };

    const removeCaract = (key) => {
        setProduct(prevProduct => {
            const updateCaract = {...prevProduct.caracteristicas}
            delete updateCaract[key]
            return {...prevProduct, caracteristicas: updateCaract}
        })
    }

    const handleChangeImg = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleClearImg = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

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
            nombreImg: "",
            moneda: "USD",
            precio: null,
            caracteristicas: {},
            categoria: "calefactores",
            subcategoria: "pellet",
            destacado: ""
        });
        setIsAdded(false)
    }

    const sendProduct = () => {
        const db = getFirestore();
        setDoc(doc(db, "products", idProduct), {...product, createdAt: Timestamp.now()});
        addProductToList(product)
        handleClear();
    }

    return (
        <section ref={section} className="h-full overflow-y-scroll mt-4">
            {isAdded && 
                <div className="flex flex-col gap-4 items-center">
                    <ProductAdded nombre={product.nombre} descripcion={product.descripcion} url={product.url || previewUrl} moneda={product.moneda} precio={product.precio} caracteristicas={product.caracteristicas} categoria={product.categoria} subcategoria={product.subcategoria} destacado={product.destacado} />
                    <div className="flex flex-col gap-2">
                        <button onClick={sendProduct} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
                        <button onClick={handleClear} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-700">Eliminar producto</button>
                    </div>
                </div>
            } 
            <form className="flex flex-col gap-4 divide-y mt-3" onSubmit={(e) => {e.preventDefault()}}>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Nombre del producto</label>
                        {(!exist || (inputEdit == "nombre")) && <input type="text" name="nombre" value={product.nombre} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="Eco Start 12"></input>}
                        {!(!exist || (inputEdit == "nombre")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("nombre")}}>Editar Nombre</p>}
                    </div>
                    <div>
                        <label className="font-semibold">Descripción del producto</label>
                        {(!exist || (inputEdit == "descripcion")) && <input type="text" name="descripcion" value={product.descripcion} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="Calefactor a pellet Eco Start 12 12kw"></input>}
                        {!(!exist || (inputEdit == "descripcion")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("descripcion")}}>Editar Descripcion</p>}
                    </div>
                </div>
                {/* <div>
                    <label>URL de la imagen</label>
                    <input type="text" name="url" value={product.url} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder="https://i.imgur.com/aob6y6d.jpg"></input>
                </div> */}
                <div>
                    <label className="font-semibold">Subir imagen</label>
                    <input type="file" name="url" onChange={handleChangeImg} ref={fileInputRef} className="w-full h-8 mt-2"></input>
                    {previewUrl && <div>
                            <img src={previewUrl} className="w-[50%] mx-auto" />
                            <button onClick={handleUpload} className="text-sm lg:text-base w-full border rounded p-1 bg-green-600 hover:bg-green-700 text-white mt-2">Subir imagen</button>
                            <button onClick={handleClearImg} className="text-sm lg:text-base w-full border rounded p-1 bg-red-700 hover:bg-red-800 text-white mt-2">Eliminar imagen</button>     
                        </div>               
                    }
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Mondeda</label>
                        {(!exist || (inputEdit == "moneda")) && <select id="moneda" name="moneda" onChange={handleChange} value={selectMoneda} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                            <option value="USD" >USD - Dólares</option>
                            <option value="$">$UY - Pesos</option>
                        </select>}
                        {!(!exist || (inputEdit == "moneda")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("moneda")}}>Editar Moneda</p>}
                    </div>
                    <div>
                        <label className="font-semibold">Precio</label>
                        {(!exist || (inputEdit == "precio")) && <input type="number" name="precio" value={product.precio} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>}
                        {!(!exist || (inputEdit == "precio")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("precio")}}>Editar Precio</p>}
                    </div>
                </div>
                <div>
                    <h1 className="font-semibold">Características</h1>
                    {!(!exist || (inputEdit == "caracteristicas")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("caracteristicas")}}>Editar Caracteristicas</p>}
                    {(!exist || (inputEdit == "caracteristicas")) && <div><div className="flex gap-1">
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
                    <ul>
                        {product.caracteristicas && Object.entries(product.caracteristicas).map(([key, value]) => (
                            <li key={key} className="flex flex-row items-center text-sm"><img src={Close} onClick={() => removeCaract(key)} className="w-5 mr-2 hover:cursor-pointer opacity-80" /> {key}: {value}</li>
                        ))}
                    </ul></div>}
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Categoría</label>
                        {!(!exist || (inputEdit == "categoria")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("categoria")}}>Editar Categoría</p>}
                        {(!exist || (inputEdit == "categoria")) && <select id="categoria" name="categoria" value={selectCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                            <option value="calefactores">Calefactores</option>
                            <option value="aires acondicionados">Aires Acondicionados</option>
                        </select>}
                    </div>
                    {selectCat == "calefactores" && <div>
                        <label className="font-semibold">Sub Categoría</label>
                        {!(!exist || (inputEdit == "subcategoria")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("subcategoria")}}>Editar Subcategoría</p>}
                        {(!exist || (inputEdit == "subcategoria")) && <select id="subcategoria" name="subcategoria" value={selectSubCat} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                            <option value="pellet">Calefactores a pellet</option>
                            <option value="leña">Calefactores a leña</option>
                        </select>}
                    </div>}
                </div>
                <div>
                    <label className="font-semibold">¿Producto destacado?</label>
                    {!(!exist || (inputEdit == "destacados")) && <p className="hover:cursor-pointer hover:font-semibold" onClick={() => {setInputEdit("destacados")}}>Editar Destacado</p>}
                    {(!exist || (inputEdit == "destacados")) && <select id="destacado" name="destacado" value={selectDest} onChange={handleChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="">No</option>
                        <option value="true">Si</option>
                    </select>}
                </div>
                {!exist && <div>
                    <label className="font-semibold">ID del producto</label>
                    <input type="text" name="id" value={idProduct} onChange={handleChangeId} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400"></input>
                </div>}
                <button type="submit" onClick={handleClick} className="bg-gray-100 border border-gray-300 p-2 rounded text-lg hover:bg-gray-200">Agregar producto</button>
            </form>
        </section>
    )
}

export default AddProduct;