
import { AuthProvider } from "./AuthContext";
import { PreviewProvider } from "./PreviewContext";
import { ProductsProvider } from "./ProductsContext"

const AppProvider = ({children}) => {
    return (
        <AuthProvider>
            <ProductsProvider>
              <PreviewProvider>
                {children}
              </PreviewProvider>
            </ProductsProvider>
        </AuthProvider>
    )
}

export default AppProvider;