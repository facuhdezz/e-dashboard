const InputComp = (item) => {
    return (
        <div className={item.divClass}>
            <label className={item.labelClass}>{item.label}</label>
            <input type={item.type} name={item.name} value={item.value} onChange={item.onChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder={item.placeholder}></input>
        </div>
    )
}

export default InputComp;