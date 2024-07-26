import { useState } from "react"
import Delete from "../assets/icons/delete.svg"
import Close from "../assets/icons/close.svg"
import { deleteDoc, doc, getFirestore } from "firebase/firestore"

const RemoveProduct = ({item, onRemove}) => {

    const [modal, setModal] = useState("hidden")

    const clickDel = () => {
        setModal((prevModal) => (prevModal === "hidden" ? "block" : "hidden"))
    }

    const deleteProduct = async () => {
        const db = getFirestore();
        await deleteDoc(doc(db, "products", item.id));
        setTimeout(() => {
            clickDel();
            if (onRemove) {
                onRemove(item.id);
            }
        }, 200);
    }

    return (
        <section>
            <div onClick={clickDel} className="absolute group bg-red-700 top-2 right-2 py-1 px-2 rounded-xl hover:bg-red-900 hover:cursor-pointer duration-200 flex flex-row gap-2 items-center">
                <img className="w-6" src={Delete} />
                <p className="text-white font-semibold absolute group-hover:relative opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Eliminar</p>
            </div>
            <div className={`fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-[rgba(0,0,0,0.21)] ${modal} flex items-center justify-center z-50`}>
                <div className="relative m-auto flex flex-col justify-center gap-2 p-2 rounded bg-white">
                    <img onClick={clickDel} src={Close} className="absolute w-10 top-[-45px] right-[-45px] bg-white rounded hover:cursor-pointer hover:scale-105" />
                    <div className="p-3 text-center">
                        <h1 className="text-xl font-semibold">Está a punto de eliminar un producto:</h1>
                        <h3>{item.descripcion}</h3>
                    </div>
                    <button onClick={deleteProduct} className="w-full rounded bg-red-700 hover:bg-red-900 duration-200 p-2 text-xl font-semibold text-white">Confirmar Eliminar</button>
                </div>
            </div>
        </section>
    )
}

export default RemoveProduct;