import Orders from "../assets/icons/orders.svg"
import Clients from "../assets/icons/client.svg"
import Analytics from "../assets/icons/analytics.svg"
import Discounts from "../assets/icons/discounts.svg"
import Content from "../assets/icons/content.svg"
import Sell from "../assets/icons/sell.svg"
import Products from "../assets/icons/products.svg"
import Home from "../assets/icons/home.svg"

const Aside = () => {
    return (
        <aside className="h-full w-[300px] bg-gray-100 fixed bottom-0 left-0 top-20 p-6 flex flex-col gap-3">
            <h2 className="flex gap-2"><span><img src={Home} /></span>Inicio</h2>
            <h2 className="flex gap-2"><span><img src={Orders} /></span>Órdenes</h2>
            <h2 className="flex gap-2"><span><img src={Sell} /></span>Ventas</h2>
            <h2 className="flex gap-2"><span><img src={Products} /></span>Productos</h2>
            <h2 className="flex gap-2"><span><img src={Clients} /></span>Clientes</h2>
            <h2 className="flex gap-2"><span><img src={Content} /></span>Contenido</h2>
            <h2 className="flex gap-2"><span><img src={Analytics} /></span>Analíticas</h2>
            <h2 className="flex gap-2"><span><img src={Discounts} /></span>Descuentos</h2>
        </aside>
    )
}

export default Aside;