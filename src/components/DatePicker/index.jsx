import React, { useState } from "react";
import moment from "moment";
import Datepicker from "tailwind-datepicker-react";

const CDatePicker = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const handleChange = (selectedDate) => {
    const dateObj = new Date(selectedDate);
    const formattedDate = moment(dateObj).format("DD/MM/YYYY");
    setDate(formattedDate.toString());
  };

  const handleClose = (state) => {
    setShow(state);
  };

  const options = {
    title: "Enter Season Start Date",
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "white",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "opacity-30",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span className="text-xs">&lt;</span>,
      next: () => <span className="text-xs">&gt;</span>,
    },
    datepickerClassNames: "text-xs",
    defaultDate: null,
    language: "en",
  };
  return (
    <Datepicker
      classNames=""
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
};

export default CDatePicker;
