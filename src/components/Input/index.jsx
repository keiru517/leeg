const Input = (props) => {
    const {
        icon,
        className,
        option,
        ...rest
    } = props;
    return (
        <div className={
            `${className} flex space-x-2 border border-border-main rounded-xl items-center px-3 h-[45px]`
        }>
            {
                icon ? <div>
                    <img src={icon}
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
