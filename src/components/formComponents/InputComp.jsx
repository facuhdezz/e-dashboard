import Warning from '../../assets/icons/warning.svg'

const InputComp = (item) => {
    return (
        <div className={item.divClass}>
            <label className={item.labelClass}>{item.label}</label>
            <div className='relative'>
                <input type={item.type} name={item.name} value={item.value} onChange={item.onChange} className="w-full h-8 bg-gray-50 border rounded px-2 outline-none focus:border-gray-400" placeholder={item.placeholder}></input>
                {(!item.value && item.validated) && <img className='absolute top-1 right-1' src={Warning} alt='error: falta rellenar este campo' title="Debe rellenar este campo" />}
                {/* <img className='absolute top-1 right-1' src={Warning} alt='error: falta rellenar este campo' /> */}
            </div>
        </div>
    )
}

export default InputComp;