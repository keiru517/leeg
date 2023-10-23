import { Typography } from "@material-tailwind/react";
import deleteIcon from "../../assets/img/dark_mode/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../actions";
import axios from "axios";
import apis from "../../utils/apis";

const AdminTable = (props) => {
  let { leagueId, user } = props;
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.home.admins).filter(
    (admin) => admin.leagueId == leagueId && admin.isDeleted !== 1
  );
  const users = useSelector((state) => state.home.users);

  useEffect(() => {
    actions.getPlayers(dispatch);
  }, []);

  const handleDelete = (adminId) => {
    axios.post(apis.removeAdmin, {adminId}).then((res)=>{
      actions.getUsers(dispatch);
      actions.getAdmins(dispatch);
      alert(res.data.message)
    }).catch((error)=>{
      alert(error.response.data.message);
    })
  }

  return (
    <div className="text-white h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead className="sticky">
          <tr>
            <th
              key="1"
              className="h-button bg-white dark:bg-slate text-center font-font-dark-gray w-1/2"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none "
              >
                Admin
              </Typography>
            </th>
            <th
              key="2"
              className="h-button bg-slate text-center font-font-dark-gray w-1/2"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none "
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {/* <tr key={1} className="even:bg-dark-gray odd:bg-charcoal">
            <td className="w-4/5">
              <div className="flex items-center underline justify-between">
                <div className="flex">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="w-8 h-8 mr-2 rounded-default"
                  />
                  {user?.firstName} {user?.lastName}
                </div>

                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  Main Admin
                </span>
              </div>
            </td>
            <td className="w-1/5"></td>
          </tr> */}
          {admins.length > 0
            ? admins.map((admin, index) => (
                <tr key={index} className="even:bg-dark-gray odd:bg-charcoal">
                  <td className="w-4/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={
                            users.find((user) => user?.id == admin.userId)
                              ?.avatar
                          }
                          alt=""
                          className="w-8 h-8 mr-2 rounded-default"
                        />
                        {
                          users.find((user) => user?.id == admin.userId)
                            ?.firstName
                        }{" "}
                        {
                          users.find((user) => user?.id == admin.userId)
                            ?.lastName
                        }
                      </div>
                      {admin.role === 1 ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          Owner
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td className="w-1/5">
                    {admin.role !== 1 ? (
                      <img
                        src={deleteIcon}
                        onClick={()=>{
                          handleDelete(admin.id);
                        }}
                        alt=""
                        className="mx-auto cursor-pointer hover:"
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
