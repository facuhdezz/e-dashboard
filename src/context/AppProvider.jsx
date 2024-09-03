import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext"

const AppProvider = ({children}) => {
    return (
        <AuthProvider>
            <ProductsProvider>
                {children}
            </ProductsProvider>
        </AuthProvider>
    )
}

export default AppProvider;