import React from 'react';

const Button = (props) => {
    const {
        icon,
        className,
        children,
        ...rest
    } = props;

    return (
        <button className={
            `${className} rounded-lg text-sm text-white font-semibold`
        }>
            <div className={`flex h-full w-full px-2 py-2 space-x-2 items-center`}>
                 {
                    icon ? <img src={icon} alt="" /> : ""
                }
                <span className={`${icon ? "" : "flex-grow text-center"}`}>
                    {children}
                </span>
            </div>
        </button>
    );
}


export default Button;
