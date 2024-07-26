const ProductDetail = ({item}) => {
    
    return (
        <>
            <div className="flex items-center">
                <img className="w-32 sm:w-48" src={item.url} />
                <h1 className="text-2xl sm:text-3xl lg:text-xl 2xl:text-3xl font-semibold">Nombre: {item.nombre}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">ID: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.id}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Descripción: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.descripcion}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">URL de imágen: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.url}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Precio: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.moneda} {item.precio}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Características: </h1>
                <ul className="flex flex-col divide-y">
                    {Object.entries(item.caracteristicas).map(([key, value]) => (
                        <li className="p-1 text-sm" key={key}>+ {key}: {value}</li>
                    ))}
                </ul>             
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Categoría: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.categoria}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Subcategoría: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.subcategoria}</h1>
            </div>            
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Destacado: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.destacado ? <span>Sí</span> : <span>No</span>}</h1>
            </div>
            <div className="flex flex-row border divide-x border-gray-300">
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg bg-gray-100">Otros: </h1>
                <h1 className="basis-1/2 py-2 px-4 sm:text-xl 2xl:text-xl lg:text-lg font-semibold bg-gray-50">{item.otros}</h1>
            </div>
        </>
    )
}

export default ProductDetail;