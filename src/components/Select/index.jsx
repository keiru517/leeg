const Select = (props) => {
    const {
        icon,
        className,
        options,
        ...rest
    } = props;

    return (
        <div className={`${className} bg-slate flex border border-charcoal px-3`}>
            {
                icon? <div>
                        <img src={icon} alt="" />
                    </div>: ""
            }
            <select {...rest} className={`w-full bg-transparent outline-none text-gray-400`}>
                {
                    options?.map((opt, idx)=>
                        <option key={idx} value={idx} className="w-[214px] bg-[#39424F]">{opt}</option>
                    )
                }

            </select>
        </div>
    )
}

export default Select;