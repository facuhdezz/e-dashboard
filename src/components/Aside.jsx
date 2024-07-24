import Orders from "../assets/icons/orders.svg"
import Clients from "../assets/icons/client.svg"
import Analytics from "../assets/icons/analytics.svg"
import Discounts from "../assets/icons/discounts.svg"
import Content from "../assets/icons/content.svg"
import Sell from "../assets/icons/sell.svg"
import Products from "../assets/icons/products.svg"
import Home from "../assets/icons/home.svg"
import { Link } from "react-router-dom"

const Aside = () => {
    return (
        <aside className="h-[100dvh] w-[300px] bg-gray-100 pt-[96px] px-4 flex flex-col gap-3">
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Home} /></span>Inicio</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Orders} /></span>Órdenes</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Sell} /></span>Ventas</h2></Link>
            <Link to={"/products"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Products} /></span>Productos</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Clients} /></span>Clientes</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Content} /></span>Contenido</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Analytics} /></span>Analíticas</h2></Link>
            <Link to={"/"}><h2 className="flex gap-2 hover:opacity-80 hover:tracking-wider duration-200"><span><img src={Discounts} /></span>Descuentos</h2></Link>
        </aside>
    )
}

export default Aside;