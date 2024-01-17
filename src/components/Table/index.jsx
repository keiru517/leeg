import { Typography } from "@material-tailwind/react";
import { Switch } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import triupIconDark from "../../assets/img/dark_mode/triup-icon-dark.png";
import tridownIconDark from "../../assets/img/dark_mode/tridown-icon-dark.png";
import triupIconLight from "../../assets/img/dark_mode/triup-icon-light.png";
import tridownIconLight from "../../assets/img/dark_mode/tridown-icon-light.png";

const Checkbox = ({ label, name, checked, onChange, disabled }) => (
  <Switch.Group>
    <div className="flex items-center">
      <Switch.Label className="mr-4">{label}</Switch.Label>
      <Switch
        checked={checked}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className={`
        relative flex h-5 w-5 items-center justify-center transition-all duration-200 outline-none ring-1 
        ${!checked && !disabled ? "ring-gray-400" : ""}
        ${checked && !disabled ? "ring-red-400" : ""}
        ${disabled ? "bg-gray-200 ring-gray-200" : ""}
      `}
      >
        <AiOutlineCheck
          size="1rem"
          className={`
         ${checked ? "scale-100" : "scale-0"} 
         ${checked && !disabled ? "text-red-400" : "text-gray-400"} 
         transition-transform duration-200 ease-out`}
        />
      </Switch>
    </div>
  </Switch.Group>
);

const Table = ({
  columns,
  data,
  presentCheckBox,
  selectedItems,
  setSelectedItems,
  presentOptions,
  options,
}) => {
  const darkMode = useSelector((state) => state.home.dark_mode);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const updateColumnWidths = () => {
      const headings = tableRef.current.querySelectorAll("th");
      const newWidths = {};

      headings.forEach((heading, index) => {
        const { width } = heading.getBoundingClientRect();
        newWidths[index] = width;
      });

      setColumnWidths(newWidths);
    };

    // Call the function initially and on window resize
    updateColumnWidths();
    window.addEventListener("resize", updateColumnWidths);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateColumnWidths);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const stickyColStyle = {
    position: "sticky",
    left: 0,
    zIndex: 1,
  };

  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const [tableData, setTableData] = useState(data);
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="dark:text-white w-full mt-4 overflow-auto">
      <table className="w-full min-w-max table-auto text-left" ref={tableRef}>
        <thead>
          {presentCheckBox && (
            <th style={stickyColStyle} className="bg-white dark:bg-slate">
              <Checkbox
                name="name"
                checked={selectedItems.length === data.length}
                onChange={(checked) => {
                  if (checked) {
                    setSelectedItems(data.map((i) => i.id));
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
            </th>
          )}
          {columns
            .filter((i) => i)
            .map((col, index) => (
              <th
                key={col.label}
                className="h-button text-center font-font-dark-gray bg-white dark:bg-slate hover:cursor-pointer"
                style={
                  col?.fixed
                    ? {
                        position: "sticky",
                        left: Object.keys(columnWidths).reduce((acc, i) => {
                          if ((presentCheckBox && i < index + 1) || i < index) {
                            acc += columnWidths[i];
                          }
                          return acc;
                        }, 0),
                        zIndex: 1,
                      }
                    : {}
                }
                onClick={() => handleSortingChange(col.accessor)}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  <div className="flex justify-center items-center">
                    {col.label}
                    {col.label !== "#" && (
                      <div className="ml-3">
                        <img
                          src={darkMode ? triupIconDark : triupIconLight}
                          alt=""
                          className="w-3 h-3 cursor-pointer hover:bg-opacity-70"
                        />
                        <img
                          src={darkMode ? tridownIconDark : tridownIconLight}
                          alt=""
                          className="w- h-3 cursor-pointer hover:bg-opacity-70"
                        />
                      </div>
                    )}
                  </div>
                </Typography>
              </th>
            ))}
          {presentOptions && <th>{options}</th>}
        </thead>
        <tbody className="text-center">
          {tableData.map((d, index) => (
            // {data.map((d, index) => (
            <tr key={index}>
              {presentCheckBox && (
                <td
                  style={stickyColStyle}
                  className="border border-1 border-gray bg-white dark:bg-slate"
                >
                  <Checkbox
                    name="name"
                    checked={selectedItems.includes(d.id)}
                    onChange={(checked) => {
                      if (checked) {
                        setSelectedItems((oldSelectedItems) => [
                          ...oldSelectedItems,
                          d.id,
                        ]);
                      } else {
                        setSelectedItems((oldSelectedItems) =>
                          oldSelectedItems.filter((i) => i !== d.id)
                        );
                      }
                    }}
                  />
                </td>
              )}
              {columns.map((column, idx) => (
                <td
                  className="bg-white dark:bg-slate border border-1 border-gray"
                  style={
                    column?.fixed
                      ? {
                          position: "sticky",
                          left: Object.keys(columnWidths).reduce((acc, i) => {
                            if ((presentCheckBox && i < idx + 1) || i < idx) {
                              acc += columnWidths[i];
                            }
                            return acc;
                          }, 0),
                          zIndex: 1,
                        }
                      : {}
                  }
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal`}
                  >
                    {/* <div className="flex justify-center"> */}
                      {column.label === "#" ? index + 1 : column.getValue(d)}
                    {/* </div> */}
                  </Typography>
                </td>
              ))}
              {presentOptions && <td />}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
