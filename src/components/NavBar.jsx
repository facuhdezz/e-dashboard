import Logo from "../assets/logos/b-admin-panel.png"
import Search from "../assets/icons/search.svg"

const NavBar = () => {
    return (
        <nav className="bg-gray-50 w-full px-12 py-4 flex justify-between items-center shadow-md fixed z-10">
            <img src={Logo} className="h-12"/>
            <div className="flex gap-2">
                <img src={Search} />
                <input type="search" placeholder="Buscar" className="search-input bg-gray-100 w-[500px] h-10 rounded-md border border-gray-300 p-2 outline-none focus:bg-white focus:border-gray-400 duration-200"/>
            </div>
            <div>
                <p>Notificaciones</p>
            </div>
        </nav>
    )
}

export default NavBar;