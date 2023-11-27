import { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import apis from "../../utils/apis";
import * as actions from "../../actions";
import Table from "./index";

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
