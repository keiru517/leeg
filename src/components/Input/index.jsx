const Input = (props) => {
    const {
        icon,
        className,
        option,
        ...rest
    } = props;
    return (
        <div className={
            `${className} bg-slate flex space-x-2 border border-charcoal items-center px-3 h-[45px]`
        }>
            {
                icon ? <div>
                    <img src={icon} className="w-3.5 h-3.5"
                        alt="" />
                </div> : ""
            }
            <input {...rest} className="bg-transparent outline-none text-white flex-grow" />
            {
                option ? <div>
                    <img src={option} alt="" />
                </div>
                    : ""
            }
        </div>
    )
}

export default Input;
