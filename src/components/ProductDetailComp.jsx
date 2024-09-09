import { usePreview } from "../context/PreviewContext";

const ProductDetailComp = () => {

    const { previewProduct } = usePreview();
    
    return (
        <>
            {previewProduct && <article className="flex flex-col gap-2 md:gap-4">
                <div className="overflow-hidden border border-gray-300 rounded-md sm:basis-1/2">
                    <img src={previewProduct.url} alt={previewProduct.descripcion} className="duration-200 hover:cursor-pointer w-full h-full foto"/>
                </div>
                <article className="flex flex-col gap-1 basis-1/2">
                    <h1 className="text-blue-800 sm:text-lg">{previewProduct.nombre}</h1>
                    <h1 className="font-semibold text-xl sm:text-3xl 2xl:text-[2.3rem] 2xl:leading-[3rem] leading-tight">{previewProduct.descripcion}</h1>
                    <h1 className="text-xl sm:text-2xl 2xl:text-3xl mt-2 2xl:my-4 text-blue-900">{previewProduct.moneda} <span className="font-bold">{previewProduct.precio}</span> <span className="text-gray-600 text-base">IVA INC.</span></h1>
                    <div>
                        {previewProduct.opcionales && Object.entries(previewProduct.opcionales).map(([key, value]) => {
                            return (
                                <h2>{key}: <span className="text-blue-900">{previewProduct.moneda} <span className="font-semibold">{value}</span></span></h2>
                            )
                        })}
                    </div>
                    <div className="">
                        {Object.keys(previewProduct.caracteristicas).length > 0 && <h2 className="text-lg font-semibold">Características:</h2>}
                        <div className="flex flex-col divide-y divide-gray-400 max-h-[200px] sm:max-h-[108px] xl:max-h-[150px] overflow-y-scroll rounded-md">
                            {Object.entries(previewProduct.caracteristicas).map(([key, value]) => {
                                return (
                                    // <li className="text-base">{key}: <span className="font-semibold">{value}</span></li>
                                    <div className="flex divide-x divide-gray-400 text-base sm:text-sm xl:text-base">
                                        <div className="bg-gray-200 basis 1/2 w-full p-3 sm:p-2 xl:p-3"><h1 className="text-black">{key}:</h1></div>
                                        <div className="bg-gray-100 basis 1/2 w-full p-3 sm:p-2 xl:p-3"><h1 className="text-black font-semibold">{value}</h1></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </article>
            </article>}
        </>
    )
}

export default ProductDetailComp;