const Input = (props) => {
    const {
        icon,
        className,
        ...rest
    } = props;
    return (
        <div className={
            `${className} flex space-x-2 border border-border-main rounded-xl items-center px-3`
        }>
            {
            icon ? <div>
                <img src={icon}
                    alt=""/>
            </div> : ""
        }
            <input {...rest} className="bg-transparent outline-none text-white flex-grow"/>
        </div>
    )
}

export default Input;
