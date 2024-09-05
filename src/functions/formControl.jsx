import { useEffect, useReducer } from "react";

function reducer(state, action) { // CREO LA FUNCIÓN REDUCER PARA MANEJAR LOS ESTADOS DE FORMA UNIFICADA
    switch (action.type) {
        case 'setInput': return { ...state, [action.field]: action.payload };
        case 'setProductInput': return { ...state, product: { ...state.product, [action.field]: action.payload } };
        case 'setObjectProducts':
            const { objectProduct, key, value } = action.payload
            return {
                ...state, product: {
                    ...state.product, [objectProduct]: {
                        ...state.product[objectProduct], [key]: value
                    }
                }
            };
        case 'removeObjectProducts':
            const { objectProduct: object, key: delKey } = action.payload
            const updatedObject = { ...state.product[object] }
            delete updatedObject[delKey]
            return {
                ...state, product: { ...state.product, [object]: updatedObject }
            }
        case 'resetForm':
            return action.payload || initialState;
        default: return state;
    }
}

export const useDataForm = (item) => {

    const initialState = { // DEFINO EL ESTADO INICIAL DE CADA ENTRADA DE LOS PRODUCTOS
        id: item?.id || "",
        url: item?.url || "",
        previewUrl: "",
        product: {
            nombre: item?.nombre || "",
            descripcion: item?.descripcion || "",
            url: item?.url || "",
            nombreImg: item?.nombreImg || "",
            moneda: item?.moneda || "",
            precio: item?.precio || "",
            opcionales: item?.opcionales || {},
            caracteristicas: item?.caracteristicas || {},
            categoria: item?.categoria || "",
            subcategoria: item?.subcategoria || "",
            destacado: item?.destacado || "",
            otros: item?.otros || ""
        }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'resetForm', payload: initialState });
    }, [item]);

    const handleChange = (e, type = 'setInput', realField, realKey, realValue) => {
        const { name, value, files } = e.target

        switch(type) {
            case 'handleChangeR':
                dispatch({ type: 'setInput', field: name, payload: value });
                break;
            case 'handleChangeProductR':
                dispatch({ type: 'setProductInput', field: name, payload: value });
                if(name === 'categoria' && value !== 'calefactores') {
                    dispatch({ type: 'setProductInput', field: 'subcategoria', payload: '' })
                }
                break;
            case 'handleChangeObjectR':
                if (realKey && realValue) {
                    dispatch({
                        type: 'setObjectProducts',
                        payload: {
                            objectProduct: realField,
                            key: realKey,
                            value: realValue
                        }
                    })
                } else {
                    console.log("Ingresar ambos valores");
                }
                break;
            case 'handleRemoveObjectR':
                dispatch({
                    type: 'removeObjectProducts',
                    payload: {
                        objectProduct: realField,
                        key: realKey
                    }
                })
                break;
            case 'handleChangeImg':
                console.log(files[0]);
                if (files[0]) {
                    
                    dispatch({type: 'setInput', field: name, payload: files[0]}) // Objeto de la imagen que contiene la información necesaria para subir la img a la base de datos
                    
                    const reader = new FileReader();
            
                    reader.onloadend = () => {
                        dispatch({type: 'setInput', field: 'previewUrl', payload: reader.result}) // Url para previsualización
                    };
                    
                    reader.readAsDataURL(files[0]);
                }
                break;
        }
    }

    const resetForm = () => {
        dispatch({ type: 'resetForm' });
    };

    useEffect(() => {
        console.log(state);        
    }, [state])

    return {
        state,
        handleChange,
        resetForm,
    };
}

// const handleChangeR = (e) => { // Cambia los estados independientes dentro de initialState (R hace referencia a reduce)
//     const { name, value } = e.target;
//     dispatch({ type: 'setInput', field: name, payload: value });
// }

// const handleChangeProductR = (e) => { // Cambia los estados dentro del objeto product en initialState
//     const { name, value } = e.target;
//     dispatch({ type: 'setProductInput', field: name, payload: value });
    
//     if(name === 'categoria' && value !== 'calefactores') {
//         dispatch({ type: 'setProductInput', field: 'subcategoria', payload: '' })
//     }
// }

// const handleChangeObjectR = (tempKey, tempValue) => { // AGREGA VALORES A LOS OBJETOS (INPUTS DE DOS ENTRADAS, ej: caracteristicas)
//     if (tempKey && tempValue) {
//         dispatch({
//             type: 'setObjectProducts',
//             payload: {
//                 objectProduct: currentField,
//                 key: tempKey,
//                 value: tempValue
//             }
//         })
//     } else {
//         console.log("Ingresar ambos valores");
//     }
// }

// const handleRemoveObjectR = (key, field) => { // QUITA VALORES A LOS OBJETOS (INPUTS DE DOS ENTRADAS)  
//     dispatch({
//         type: 'removeObjectProducts',
//         payload: {
//             objectProduct: field,
//             key: key
//         }
//     })
// }

// const handleChangeImg = (e) => {
//     if (e.target.files[0]) {
//         dispatch({type: 'setInput', field: e.target.name, payload: e.target.files[0]}) // Objeto de la imagen que contiene la información necesaria para subir la img a la base de datos
        
//         const reader = new FileReader();

//         reader.onloadend = () => {
//             dispatch({type: 'setInput', field: 'previewUrl', payload: reader.result}) // Url para previsualización
//         };
        
//         reader.readAsDataURL(e.target.files[0]);
//     }
// };