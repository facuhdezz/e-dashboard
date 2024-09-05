import { PreviewProvider } from "./PreviewContext";
import { ProductsProvider } from "./ProductsContext"

const AppProvider = ({children}) => {
    return (
        <ProductsProvider>
            <PreviewProvider>
                {children}
            </PreviewProvider>
        </ProductsProvider>
    )
}

export default AppProvider;