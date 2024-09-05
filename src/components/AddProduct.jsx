import Close from '../assets/icons/close.svg'
import Warning from '../assets/icons/warning.svg'
import { useEffect, useReducer, useRef, useState } from "react";
import ProductAdded from "./ProductAdded";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useProducts } from '../context/ProductsContext';
import InputComp from './formComponents/InputComp';
import { useDataForm } from '../functions/formControl';

const AddProduct = () => {

    const { state, handleChange, resetForm } = useDataForm();
    
    const [tempOpKey, setTempOpKey] = useState("");
    const [tempOpValue, setTempOpValue] = useState("");
    const [tempCaracKey, setTempCaracKey] = useState("");
    const [tempCaracValue, setTempCaracValue] = useState("");
    const [currentField, setCurrentField] = useState("");

    const [validate, setValidate] = useState(false);

    const section = useRef()
    const fileInputRef = useRef(null);

    const { addProductToList } = useProducts()

    const [isAdded, setIsAdded] = useState(false);    

    const handleClick = () => {
        if(state.id && state.product.descripcion && state.product.moneda && state.product.precio && state.product.categoria (state.product.categoria !== 'calefactores' || state.product.subcategoria)) {
            setIsAdded(true);
            window.dispatchEvent(new Event('scrollToTop'));
            setValidate(false);
        } else {
            setValidate(true);
        }   
    };

    // const handleUpload = () => {
    //     const storage = getStorage()
    //     if (!file) return;
    //     const storageRef = ref(storage, `productImg/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on(
    //       'state_changed',
    //       null,
    //       (error) => {
    //         console.error(error);
    //       },
    //       () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log(downloadURL);
    //             setUrl(downloadURL);
    //             setProduct((prevProduct) => ({
    //                 ...prevProduct,
    //                 url: downloadURL,
    //                 nombreImg: file.name
    //             }));
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //       }
    //     );
    //   };

    const handleClear = () => {
        resetForm()
        setIsAdded(false)
    }

    const sendProduct = () => {
        // const db = getFirestore();
        // setDoc(doc(db, "products", idProduct), {...product, createdAt: Timestamp.now()});
        addProductToList(product)
        handleClear();
    }

    return (
        <section ref={section} className="h-full overflow-y-scroll mt-4">
            {isAdded &&
                <div className="flex flex-col gap-4 items-center">
                    <ProductAdded nombre={state.product.nombre} descripcion={state.product.descripcion} url={state.product.url || state.previewUrl} moneda={state.product.moneda} precio={state.product.precio} caracteristicas={state.product.caracteristicas} opcionales={state.product.opcionales} categoria={state.product.categoria} subcategoria={state.product.subcategoria} destacado={state.product.destacado} otros={state.product.otros} />
                    <div className="flex flex-col gap-2">
                        <button onClick={sendProduct} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
                        <button onClick={handleClear} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-700">Eliminar producto</button>
                    </div>
                </div>
            }
            <form className="flex flex-col gap-4 divide-y mt-3" onSubmit={(e) => { e.preventDefault() }}>
                <div className="flex flex-col gap-3">
                    <InputComp labelClass="font-semibold" label="Nombre del producto" type="text" name="nombre" validated={validate} value={state.product.nombre} onChange={(e) =>handleChange(e, 'handleChangeProductR')} placeholder="Eco Start 12" />
                    <InputComp labelClass="font-semibold" label="Descripción del producto" type="text" name="descripcion" validated={validate} value={state.product.descripcion} onChange={(e) =>handleChange(e, 'handleChangeProductR')} placeholder="Calefactor a pellet Eco Start 12 12kw" />
                </div>
                <div>
                    <label className="font-semibold">Subir imagen</label>
                    <input type="file" name="url" onChange={(e) => handleChange(e, 'handleChangeImg')} ref={fileInputRef} className="w-full h-8 mt-2"></input>
                    {state.previewUrl && <div>
                        <img src={state.previewUrl} className="w-[50%] mx-auto" />
                        {/* <button onClick={handleUpload} className="text-sm lg:text-base w-full border rounded p-1 bg-green-600 hover:bg-green-700 text-white mt-2">Subir imagen</button> */}
                        <button name="previewUrl" value="" onClick={(e) => handleChange(e, 'handleChangeR')} className="text-sm lg:text-base w-full border rounded p-1 bg-red-700 hover:bg-red-800 text-white mt-2">Eliminar imagen</button>
                    </div>
                    }
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Moneda</label>
                        <div className="relative">
                            <select id="moneda" name="moneda" onChange={(e) =>handleChange(e, 'handleChangeProductR')} value={state.product.moneda} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                                <option value="" disabled>Seleccione el tipo de moneda</option>
                                <option value="USD" >USD - Dólares</option>
                                <option value="$">$UY - Pesos</option>
                            </select>
                            {(!state.product.moneda && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
                        </div>
                    </div>
                    <InputComp labelClass="font-semibold" label="Precio" type="text" name="precio" validated={validate} value={state.product.precio} onChange={(e) =>handleChange(e, 'handleChangeProductR')} placeholder="" />
                    <div>
                        <h1 className="font-semibold">Opcionales</h1>
                        <div>
                            <div className="flex gap-1">
                                <InputComp divClass="basis-1/2" labelClass="text-sm" label="Nombre" type="text" value={tempOpKey} onChange={(e) => { currentField != 'opcionales' && setCurrentField('opcionales'); setTempOpKey(e.target.value) }} />
                                <InputComp divClass="basis-1/2" labelClass="text-sm" label={`Valor ${state.product.moneda}`} type="text" value={tempOpValue} onChange={(e) => setTempOpValue(e.target.value)} />
                            </div>
                            <button onClick={(e) => { handleChange(e, 'handleChangeObjectR', currentField, tempOpKey, tempOpValue); setTempOpKey(''); setTempOpValue('') }} className="text-sm border rounded float-right mt-2 p-1 hover:bg-gray-100">+ Agregar Opcional</button>
                            <ul>
                                {state.product.opcionales && Object.entries(state.product.opcionales).map(([key, value]) => (
                                    <li key={key} className="flex flex-row items-center text-sm"><img src={Close} onClick={(e) => handleChange(e, 'handleRemoveObjectR', 'opcionales', key, value)} className="w-5 mr-2 hover:cursor-pointer opacity-80" /> {key}: {value}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="font-semibold">Características</h1>
                    <div>
                        <div className="flex gap-1">
                            <InputComp divClass="basis-1/2" labelClass="text-sm" label="Nombre" type="text" name="nombreCar" value={tempCaracKey} onChange={(e) => { currentField != 'caracteristicas' && setCurrentField('caracteristicas'); setTempCaracKey(e.target.value) }} />
                            <InputComp divClass="basis-1/2" labelClass="text-sm" label="Valor" type="text" name="valorCar" value={tempCaracValue} onChange={(e) => setTempCaracValue(e.target.value)} />
                        </div>
                        <button onClick={(e) => { handleChange(e, 'handleChangeObjectR', currentField, tempCaracKey, tempCaracValue); setTempCaracKey(''); setTempCaracValue('') }} className="text-sm border rounded float-right mt-2 p-1 hover:bg-gray-100">+ Agregar Característica</button>
                        <ul>
                            {state.product.caracteristicas && Object.entries(state.product.caracteristicas).map(([key, value]) => (
                                <li key={key} className="flex flex-row items-center text-sm"><img src={Close} onClick={(e) => handleChange(e, 'handleRemoveObjectR', 'caracteristicas', key, value)} className="w-5 mr-2 hover:cursor-pointer opacity-80" /> {key}: {value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="font-semibold">Categoría</label>
                        <div className="relative">
                            <select id="categoria" name="categoria" value={state.product.categoria} onChange={(e) =>handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                                <option value="" disabled>Seleccione la categoría del producto</option>
                                <option value="calefactores">Calefactores</option>
                                <option value="aires acondicionados">Aires Acondicionados</option>
                                <option value="otros productos">Otros Productos</option>
                            </select>
                            {(!state.product.categoria && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
                        </div>
                    </div>
                    {state.product.categoria == "calefactores" && <div>
                        <label className="font-semibold">Sub Categoría</label>
                        <div className="relative">
                            <select id="subcategoria" name="subcategoria" value={state.product.subcategoria} onChange={(e) =>handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                                <option value="" disabled>Seleccione la subcategoría</option>
                                <option value="pellet">Calefactores a pellet</option>
                                <option value="leña">Calefactores a leña</option>
                            </select>
                            {(!state.product.subcategoria && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
                        </div>
                    </div>}
                </div>
                <div>
                    <label className="font-semibold">¿Producto destacado?</label>
                    <select id="destacado" name="destacado" value={state.product.destacado} onChange={(e) =>handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                        <option value="">No</option>
                        <option value="true">Si</option>
                    </select>
                </div>
                <InputComp labelClass="font-semibold" label="Otros" type="text" name="otros" value={state.product.otros} onChange={(e) =>handleChange(e, 'handleChangeProductR')} />
                <InputComp labelClass="font-semibold" label="ID del producto" type="text" name="id" validated={validate} value={state.id} onChange={(e) =>handleChange(e, 'handleChangeR')} />
                <button type="submit" onClick={handleClick} className="bg-gray-100 border border-gray-300 p-2 rounded text-lg hover:bg-gray-200">Agregar producto</button>
            </form>
        </section>
    )
}

export default AddProduct;