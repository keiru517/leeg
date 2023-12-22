const CTimePicker = ({ time, setTime }) => {
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default CTimePicker;
