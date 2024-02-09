import { useEffect } from "react";
import { useSelector } from "react-redux";

const CDatePicker = ({ date, setDate, className, ...rest }) => {
  const darkMode = useSelector((state) => state.home.dark_mode);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    // Add custom styles to the time picker icon
    const iconStyle = document.createElement("style");
    iconStyle.innerHTML = `
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(${darkMode ? 1 : 0});
      }
    `;
    document.head.appendChild(iconStyle);

    return () => {
      // Clean up the custom styles when component is unmounted
      document.head.removeChild(iconStyle);
    };
  }, [darkMode]);

  return (
    <div className="w-full">
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className={`bg-transparent border border-dark-gray text-black dark:text-white ${className}`}
        {...rest}
      />
    </div>
  );
};

export default CDatePicker;
