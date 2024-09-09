import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs,  } from 'firebase/firestore';


const ProductsContext = createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
}

export const ProductsProvider = ({children}) => {
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        getDocs(collection(db, "products")).then(result => {
            setProductList(result.docs.map(product => ({id: product.id, ...product.data()})))
            setLoading(false)
        });
    }, []);

    const addProductToList = (newProduct) => {
        setProductList(prevList => [...prevList, newProduct]);
    };

    const editProductList = (editedProduct) => {
        setProductList(prevList =>
            prevList.map(product =>
                product.id === editedProduct.id ? editedProduct : product
            )
        );
    }

    return (
        <ProductsContext.Provider value={{productList, addProductToList, editProductList, loading}}>
            {children}
        </ProductsContext.Provider>
    )
}