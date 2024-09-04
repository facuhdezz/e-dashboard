const ProductAdded = (product) => {
    return (
        <article className="flex flex-col items-center">
            <img className="w-[50%]" src={product.url} />
            <div>
                <h1>Nombre: <span className="font-semibold">{product.nombre}</span></h1>
                <h2>Decripción: <span className="font-semibold">{product.descripcion}</span></h2>
                <h3>{product.moneda} <span className="font-semibold">{product.precio}</span></h3>
                <h4>Categoría: <span className="font-semibold">{product.categoria}</span></h4>
                {product.categoria == "calefactores" && <h5>Subcategoría: <span className="font-semibold">{product.subcategoria}</span></h5>}
                <h1>Opcionales:</h1>
                <ul>
                    {Object.entries(product.opcionales).map(([key, value]) => (
                        <li key={key}>+ {key}: {value}</li>
                    ))}
                </ul>
                <h1>Características:</h1>
                <ul>
                    {Object.entries(product.caracteristicas).map(([key, value]) => (
                        <li key={key}>+ {key}: {value}</li>
                    ))}
                </ul>
                {product.destacado == "true" && <p className="font-semibold">Producto destacado</p>}
            </div>
        </article>
    )
}

export default ProductAdded;