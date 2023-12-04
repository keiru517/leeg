import { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import apis from "../../utils/apis";
import * as actions from "../../actions";
import moment from 'moment';
import Table from "./index";

function Checkbox({ label, name, checked, onChange, disabled }) {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="">{label}</Switch.Label>
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
}

const RosterTable = ({ rosters, rosterList }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const columns = [
    {
      label: 'Player',
      fixed: true,
      getValue: (row) => (
        <Link to={`player/${row.userId}`} className="flex items-center">
          <img src={row.avatar} alt="" className="h-8 w-8 mr-4 rounded-full" />
          {row.firstName} {row.lastName}
        </Link>
      )
    },
    {
      label: 'Email',
      getValue: (row) => row.email
    },
    {
      label: 'Date Applied',
      getValue: (row) => new Date(row.createdAt).toLocaleDateString()
    },
    {
      label: 'Date Accepted',
      getValue: (row) => new Date(row.updatedAt).toLocaleDateString()
    },
    {
      label: 'Team',
      getValue: (row) => row.teamId !== 0 ? "Yes" : "No"
    },
  ];

  const options =
    rosterList === "WaitList"
      ? [
          { id: 0, name: "Accept" },
        ]
      : [{ id: 0, name: "WaitList" }];


  const handleOption = () => {
    if (selectedItems.length === 0) {
      alert("Please select one or more players!");
    } else {
      if (rosterList === "WaitList") {
        // if the user clicks Accept
        axios
            .post(apis.acceptPlayer, selectedItems.map((playerId)=> ({id:playerId})))
            .then(() => {
              actions.getPlayers(dispatch);
            })
            .catch((error) => alert(error.response.data.message));
      } else {
        axios
          .post(apis.unacceptPlayer, selectedItems.map((playerId)=> ({id:playerId})))
          .then(() => {
            actions.getPlayers(dispatch);
          })
          .catch((error) => alert(error.response.data.message));
      }
    }
    setSelectedItems([]);
  };

  const [canSubmit, setCanSubmit] = useState(false);
  useEffect(() => {
    // Return true if nothing is selected
    const allItemsFalse = Object.values(itemChecked).every(
      (value) => value === false
    );
    if (allItemsFalse) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  }, [itemChecked]);

  // Set itemchecked as {} when the select option is changed
  useEffect(() => {
    setItemChecked({});
  }, [rosterValue]);

  return (
    <div className="text-black dark:text-white h-full w-full mt-4">
      <Table
          data={rosters}
          columns={columns}
          presentCheckBox
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          presentOptions
          options={options}
          handleOption={handleOption}
      />
    </div>
  );
};

export default RosterTable;
