import { useEffect } from "react";
import { useSelector } from "react-redux";

const CTimePicker = ({ time, setTime, className }) => {
  const darkMode = useSelector((state) => state.home.dark_mode);
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    // Add custom styles to the time picker icon
    const iconStyle = document.createElement("style");
    iconStyle.innerHTML = `
      input[type="time"]::-webkit-calendar-picker-indicator {
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
        type="time"
        value={time}
        onChange={handleTimeChange}
        className={`bg-transparent border border-dark-gray text-black dark:text-white ${className}`}
      />
    </div>
  );
};

export default CTimePicker;
