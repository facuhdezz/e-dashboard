import Close from '../assets/icons/close.svg'
import Edit from '../assets/icons/edit.svg'
import { useEffect, useReducer, useRef, useState } from "react";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { useDataForm } from '../functions/formControl';
import { FormCaracteristicas, FormCategoria, FormDescription, FormDestacados, FormMoneda, FormName, FormOpcionales, FormOtros, FormPrecio, FormSubcategoria } from './FormParts';
import { useProducts } from '../context/ProductsContext';

const EditProduct = ({ item }) => {

    const { editProductList } = useProducts();

    const [tempOpKey, setTempOpKey] = useState("");
    const [tempOpValue, setTempOpValue] = useState("");
    const [tempCaracKey, setTempCaracKey] = useState("");
    const [tempCaracValue, setTempCaracValue] = useState("");
    const [currentField, setCurrentField] = useState("");

    const updateOpKey = (newKey) => {
        setTempOpKey(newKey)
    }
    const updateOpValue = (newValue) => {
        setTempOpValue(newValue)
    }
    const updateCaracKey = (newKey) => {
        setTempCaracKey(newKey)
    }
    const updateCaracValue = (newValue) => {
        setTempCaracValue(newValue)
    }
    const updateField = (newField) => {
        setCurrentField(newField)
    }

    const { state, handleChange } = useDataForm(item);

    const [exist, setExist] = useState(null)
    const [isEdit, setIsEdit] = useState(true)
    const [inputEdit, setInputEdit] = useState("")

    const [validate, setValidate] = useState(true)

    useEffect(() => {
        if (state.product.categoria == "calefactores" && !state.product.subcategoria) {
            setValidate(false)
        } else {
            setValidate(true)
        }
    }, [state.product.categoria, state.product.subcategoria])

    useEffect(() => {
        if (Object.keys(item).length > 0) {
            setExist(true)
        } else {
            setExist(false)
        }
    }, [])

    const sendProduct = () => {
        if (validate) {
            const db = getFirestore();
            setDoc(doc(db, "products", state.id), { ...state.product, createdAt: item.createdAt, updatedAt: Timestamp.now() });
            editProductList(state.product)
            setInputEdit("")
        } else {
            console.log("Debe seleccionar una subcategoría");            
        }
    }

    return (
        <section className="h-full overflow-y-scroll mt-4">
            {/* {isAdded &&
                <div className="flex flex-col gap-4 items-center">
                    <ProductAdded nombre={state.product.nombre} descripcion={state.product.descripcion} url={state.product.url || state.previewUrl} moneda={state.product.moneda} precio={state.product.precio} caracteristicas={state.product.caracteristicas} opcionales={state.product.opcionales} categoria={state.product.categoria} subcategoria={state.product.subcategoria} destacado={state.product.destacado} otros={state.product.otros} />
                    <div className="flex flex-col gap-2">
                        <button onClick={sendProduct} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
                        <button onClick={handleClear} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-700">Eliminar producto</button>
                    </div>
                </div>
            } */}

            <div className="flex flex-col gap-4 divide-y mt-3">
                <div>
                    {!(!exist || (inputEdit == "nombre")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Nombre del producto: <span className="font-normal">{state.product.nombre}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("nombre"); setIsEdit(false) }} /></div>}
                    <FormName isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "nombre") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "descripcion")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Descripcion del producto: <span className="font-normal">{state.product.descripcion}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("descripcion"); setIsEdit(false) }} /></div>}
                    <FormDescription isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "descripcion") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "moneda")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Tipo de moneda: <span className="font-normal">{state.product.moneda}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("moneda"); setIsEdit(false) }} /></div>}
                    <FormMoneda isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "moneda") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "precio")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Precio del producto: <span className="font-normal">{state.product.precio}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("precio"); setIsEdit(false) }} /></div>}
                    <FormPrecio isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "precio") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "opcionales")) && <div className="flex flex-row gap-2 items-center mt-2">
                        <h1 className="text-base font-semibold">Agregados opcionales:</h1>
                        <ul>
                            {state.product.opcionales && Object.entries(state.product.opcionales).map(([key, value]) => (
                                <li key={key} className="text-base font-semibold">{key}: {value}</li>
                            ))}
                        </ul>
                        <img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("opcionales"); setIsEdit(false) }} /></div>}
                    <FormOpcionales isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} tempOpKey={tempOpKey} tempOpValue={tempOpValue} currentField={currentField} updateKey={updateOpKey} updateValue={updateOpValue} updateField={updateField} />
                    {(!isEdit && inputEdit == "opcionales") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "caracteristicas")) && <div className="flex flex-row gap-2 items-center mt-2">
                        <h1 className="text-base font-semibold">Características: </h1>
                        <ul>
                            {state.product.caracteristicas && Object.entries(state.product.caracteristicas).map(([key, value]) => (
                                <li key={key} className="">{key}: {value}</li>
                            ))}
                        </ul>
                        <img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("caracteristicas"); setIsEdit(false) }} /></div>}
                    <FormCaracteristicas isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} tempCaracKey={tempCaracKey} tempCaracValue={tempCaracValue} currentField={currentField} updateKey={updateCaracKey} updateValue={updateCaracValue} updateField={updateField} />
                    {(!isEdit && inputEdit == "caracteristicas") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "categoria")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Categoría: <span className="font-normal">{state.product.categoria}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("categoria"); setIsEdit(false) }} /></div>}
                    <FormCategoria isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {state.product.categoria == "calefactores" && !(!exist || (inputEdit == "categoria")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Subcategoría: <span className="font-normal">{state.product.subcategoria}</span></h1></div>}
                    <FormSubcategoria isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "categoria") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                {/* {state.product.categoria == "calefactores" && <div>
                    {!(!exist || (inputEdit == "subcategoria")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Subcategoría: <span className="font-normal">{state.product.subcategoria}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("subcategoria") ; setIsEdit(false) }} /></div>}
                    {(!isEdit && inputEdit == "subcategoria") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => {setIsEdit(true); setInputEdit("")}} />}
                </div>} */}

                <div>
                    {!(!exist || (inputEdit == "destacado")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Producto destacado: <span className="font-normal">{state.product.destacado ? "Sí" : "No"}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("destacado"); setIsEdit(false) }} /></div>}
                    <FormDestacados isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "destacado") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <div>
                    {!(!exist || (inputEdit == "otros")) && <div className="flex flex-row gap-2 items-center mt-2"><h1 className="text-base font-semibold">Otros: <span className="font-normal">{state.product.otros}</span></h1><img className="w-6 hover:cursor-pointer hover:scale-110 duration-100" src={Edit} onClick={() => { setInputEdit("otros"); setIsEdit(false) }} /></div>}
                    <FormOtros isEdit={isEdit} inputEdit={inputEdit} state={state} handleChange={handleChange} />
                    {(!isEdit && inputEdit == "otros") && <img className="hover:scale-110 duration-100 hover:cursor-pointer mt-2" src={Close} onClick={() => { setIsEdit(true); setInputEdit("") }} />}
                </div>

                <button onClick={sendProduct} className="bg-green-800 text-white p-2 rounded-lg hover:bg-green-700">Confirmar</button>
            </div>
        </section>
    )
}

export default EditProduct;