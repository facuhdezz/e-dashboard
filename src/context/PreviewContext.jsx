import { createContext, useContext, useEffect, useState } from "react";

const PreviewContext = createContext();

export const usePreview = () => {
    return useContext(PreviewContext);
}

export const PreviewProvider = ({children}) => {
    const [previewProduct, setPreviewProduct] = useState();

    const addPreviewProduct = (newPreview) => {
        setPreviewProduct(newPreview)
    }

    return (
        <PreviewContext.Provider value={{previewProduct, addPreviewProduct}}>
            {children}
        </PreviewContext.Provider>
    )
}