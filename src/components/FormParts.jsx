import InputComp from "./formComponents/InputComp"
import Warning from "../assets/icons/warning.svg"
import Close from "../assets/icons/close.svg"
import { useEffect } from "react";

export const FormName = ({validate, state, handleChange, isEdit}) => {    
    return (
        <>
            {!isEdit && <InputComp
                labelClass="font-semibold"
                label="Nombre del producto"
                type="text"
                name="nombre"
                validated={validate}
                value={state.product.nombre}
                onChange={(e) => handleChange(e, 'handleChangeProductR')}
                placeholder="Eco Start 12"
            />}
        </>
    )
}

export const FormDescription = ({validate, state, handleChange}) => {
    return (
        <InputComp
            labelClass="font-semibold"
            label="Descripción del producto"
            type="text"
            name="descripcion"
            validated={validate}
            value={state.product.descripcion}
            onChange={(e) => handleChange(e, 'handleChangeProductR')}
            placeholder="Calefactor a pellet Eco Start 12 12kw"
        />
    )
}

export const FormImage = ({handleChange, fileInputRef, state}) => {
    return (
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
    )
}

export const FormMoneda = ({validate, state, handleChange}) => {
    return (
        <div>
            <label className="font-semibold">Moneda</label>
            <div className="relative">
                <select id="moneda" name="moneda" onChange={(e) => handleChange(e, 'handleChangeProductR')} value={state.product.moneda} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                    <option value="" disabled>Seleccione el tipo de moneda</option>
                    <option value="USD" >USD - Dólares</option>
                    <option value="$">$UY - Pesos</option>
                </select>
                {(!state.product.moneda && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
            </div>
        </div>
    )
}

export const FormPrecio = ({validate, state, handleChange}) => {
    return (
        <InputComp
            labelClass="font-semibold"
            label="Precio"
            type="text"
            name="precio"
            validated={validate}
            value={state.product.precio}
            onChange={(e) => handleChange(e, 'handleChangeProductR')}
            placeholder=""
        />
    )
}

export const FormOpcionales = ({state, handleChange, tempOpKey, tempOpValue, currentField, updateKey, updateValue, updateField}) => {
    
    useEffect(() => {
        console.log(currentField);
    }, [currentField])
    
    return (
        <div>
            <h1 className="font-semibold">Opcionales</h1>
            <div>
                <div className="flex gap-1">
                    <InputComp divClass="basis-1/2" labelClass="text-sm" label="Nombre" type="text" value={tempOpKey} onChange={(e) => { currentField != 'opcionales' && updateField('opcionales'); updateKey(e.target.value) }} />
                    <InputComp divClass="basis-1/2" labelClass="text-sm" label={`Valor ${state.product.moneda}`} type="text" value={tempOpValue} onChange={(e) => updateValue(e.target.value)} />
                </div>
                <button onClick={(e) => { handleChange(e, 'handleChangeObjectR', currentField, tempOpKey, tempOpValue); updateKey(''); updateValue('') }} className="text-sm border rounded float-right mt-2 p-1 hover:bg-gray-100">+ Agregar Opcional</button>
                <ul>
                    {state.product.opcionales && Object.entries(state.product.opcionales).map(([key, value]) => (
                        <li key={key} className="flex flex-row items-center text-sm"><img src={Close} onClick={(e) => handleChange(e, 'handleRemoveObjectR', 'opcionales', key, value)} className="w-5 mr-2 hover:cursor-pointer opacity-80" /> {key}: {value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const FormCaracteristicas = ({state, handleChange, tempCaracKey, tempCaracValue, currentField, updateKey, updateValue, updateField}) => {
    return (
        <div>
            <h1 className="font-semibold">Características</h1>
            <div>
                <div className="flex gap-1">
                    <InputComp divClass="basis-1/2" labelClass="text-sm" label="Nombre" type="text" name="nombreCar" value={tempCaracKey} onChange={(e) => { currentField != 'caracteristicas' && updateField('caracteristicas'); updateKey(e.target.value) }} />
                    <InputComp divClass="basis-1/2" labelClass="text-sm" label="Valor" type="text" name="valorCar" value={tempCaracValue} onChange={(e) => updateValue(e.target.value)} />
                </div>
                <button onClick={(e) => { handleChange(e, 'handleChangeObjectR', currentField, tempCaracKey, tempCaracValue); updateKey(''); updateValue('') }} className="text-sm border rounded float-right mt-2 p-1 hover:bg-gray-100">+ Agregar Característica</button>
                <ul>
                    {state.product.caracteristicas && Object.entries(state.product.caracteristicas).map(([key, value]) => (
                        <li key={key} className="flex flex-row items-center text-sm"><img src={Close} onClick={(e) => handleChange(e, 'handleRemoveObjectR', 'caracteristicas', key, value)} className="w-5 mr-2 hover:cursor-pointer opacity-80" /> {key}: {value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const FormCategoria = ({validate, state, handleChange}) => {
    return (
        <div>
            <label className="font-semibold">Categoría</label>
            <div className="relative">
                <select id="categoria" name="categoria" value={state.product.categoria} onChange={(e) => handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                    <option value="" disabled>Seleccione la categoría del producto</option>
                    <option value="calefactores">Calefactores</option>
                    <option value="aires acondicionados">Aires Acondicionados</option>
                    <option value="otros productos">Otros Productos</option>
                </select>
                {(!state.product.categoria && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
            </div>
        </div>
    )
}

export const FormSubcategoria = ({validate, state, handleChange}) => {
    return (
        <>
            {
                state.product.categoria == "calefactores" && <div>
                    <label className="font-semibold">Sub Categoría</label>
                    <div className="relative">
                        <select id="subcategoria" name="subcategoria" value={state.product.subcategoria} onChange={(e) => handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                            <option value="" disabled>Seleccione la subcategoría</option>
                            <option value="pellet">Calefactores a pellet</option>
                            <option value="leña">Calefactores a leña</option>
                        </select>
                        {(!state.product.subcategoria && validate) && <img className='absolute top-1 right-5' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
                    </div>
                </div>
            }
        </>
    )
}

export const FormDestacados = ({state, handleChange}) => {
    return (
        <div>
            <label className="font-semibold">¿Producto destacado?</label>
            <select id="destacado" name="destacado" value={state.product.destacado} onChange={(e) => handleChange(e, 'handleChangeProductR')} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400">
                <option value="">No</option>
                <option value="true">Si</option>
            </select>
        </div>
    )
}

export const FormOtros = ({state, handleChange}) => {
    return (
        <InputComp 
            labelClass="font-semibold" 
            label="Otros" 
            type="text" 
            name="otros" 
            value={state.product.otros} 
            onChange={(e) =>handleChange(e, 'handleChangeProductR')} 
        />
    )
}

export const FormId = ({validate, state, handleChange}) => {
    return (
        <InputComp 
            labelClass="font-semibold" 
            label="ID del producto" 
            type="text" 
            name="id" 
            validated={validate} 
            value={state.id} 
            onChange={(e) =>handleChange(e, 'handleChangeR')} 
        />
    )
}