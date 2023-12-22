const Input = (props) => {
    const {
        icon,
        className,
        option,
        value,
        ...rest
    } = props;
    return (
        <div className={
            `${className} flex space-x-2 border border-dark-gray items-center px-3`
        }>
            {
                icon ? <div>
                    <img src={icon} className="w-3.5 h-3.5"
                        alt="" />
                </div> : ""
            } 
            <input {...rest} className="bg-transparent outline-none text-black dark:text-white flex-grow h-[42px] " value={value}/>
            {
                option ? <div>
                    <img src={option} alt="" className="hover:cursor-pointer"/>
                </div>
                    : ""
            }
        </div>
    )
}
 
export default Input;
