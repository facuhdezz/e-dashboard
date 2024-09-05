import { useEffect, useReducer, useRef, useState } from "react";
import ProductAdded from "./ProductAdded";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useProducts } from '../context/ProductsContext';
import { useDataForm } from '../functions/formControl';
import { FormCaracteristicas, FormCategoria, FormDescription, FormDestacados, FormId, FormImage, FormMoneda, FormName, FormOpcionales, FormOtros, FormPrecio, FormSubcategoria } from './FormParts';

const AddProduct = () => {

    const { state, handleChange, resetForm } = useDataForm();
    
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

    const [validate, setValidate] = useState(false);

    const section = useRef()
    const fileInputRef = useRef(null);

    const { addProductToList } = useProducts()

    const [isAdded, setIsAdded] = useState(false);    

    const handleClick = () => {
        if(state.id && state.product.descripcion && state.product.moneda && state.product.precio && state.product.categoria && (state.product.categoria !== 'calefactores' || state.product.subcategoria)) {
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
                    <FormName state={state} validate={validate} handleChange={handleChange} />
                    <FormDescription state={state} validate={validate} handleChange={handleChange} />
                </div>
                <FormImage handleChange={handleChange} state={state} fileInputRef={fileInputRef} />
                <div className="flex flex-col gap-3">
                    <FormMoneda state={state} validate={validate} handleChange={handleChange} />
                    <FormPrecio state={state} validate={validate} handleChange={handleChange} />
                    <FormOpcionales state={state} handleChange={handleChange} tempOpKey={tempOpKey} tempOpValue={tempOpValue} currentField={currentField} updateKey={updateOpKey} updateValue={updateOpValue} updateField={updateField} />
                </div>
                <FormCaracteristicas state={state} handleChange={handleChange} tempCaracKey={tempCaracKey} tempCaracValue={tempCaracValue} currentField={currentField} updateKey={updateCaracKey} updateValue={updateCaracValue} updateField={updateField}  />
                <div className="flex flex-col gap-3">
                    <FormCategoria state={state} validate={validate} handleChange={handleChange} />
                    <FormSubcategoria state={state} validate={validate} handleChange={handleChange} />
                </div>
                <FormDestacados state={state} handleChange={handleChange} />
                <FormOtros state={state} handleChange={handleChange} />
                <FormId state={state} validate={validate} handleChange={handleChange} />
                <button type="submit" onClick={handleClick} className="bg-gray-100 border border-gray-300 p-2 rounded text-lg hover:bg-gray-200">Agregar producto</button>
            </form>
        </section>
    )
}

export default AddProduct;