import { Link } from "react-router-dom";
import Edit from "../assets/icons/edit.svg"

const ProductCard = (item) => {
    return(
        <article className={`flex flex-col relative bg-gray-50 border shrink-0 gap-2 p-3 justify-between rounded ${item.clase}`}>
            <Link to={"edit/" + item.id}><img className="absolute top-2 right-2 w-8 hover:w-9 duration-200" src={Edit} /></Link>
            <div className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square">
                    <img className="w-auto h-auto" src={item.url} alt={item.descripcion}/>
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-xs text-blue-800">{item.nombre}</h1>
                    <h3 className="text-sm">{item.descripcion}</h3>
                    <h4 className="text-sm mt-2">{item.moneda} <span className="font-bold">{item.precio}</span></h4>
                    <h5 className="text-sm mt-2">Id: {item.id}</h5>
                    <h1>Características:</h1>
                    <ul>
                        {Object.entries(item.caracteristicas).map(([key, value]) => (
                            <li key={key}>+ {key}: {value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    )
}

export default ProductCard;