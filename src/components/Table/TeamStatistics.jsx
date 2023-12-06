import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "./index";

const TeamStatistics = () => {
  let { teamId } = useParams();

  const team = useSelector(state=>state.home.teams).find(team=>team.id == teamId);
  

  const columns = [
    {
        label: 'Wins',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.win}
            </Typography>
        )
    },
    {
        label: 'Losses',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.lose}
            </Typography>
        )
    },
    {
        label: 'Points Scored',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.pointScored}
            </Typography>
        )
    },
    {
        label: 'Points Against',
        getValue: (row) => (
            <Typography
                variant="small"
                className="font-normal"
            >
                {row.pointAgainst}
            </Typography>
        )
    },
    {
        label: 'Differential',
        getValue: (row) => (
            <Typography
                as="a"
                href="#"
                variant="small"
                className="font-normal"
            >
                {row.diff}
            </Typography>
        )
    }
];


  // return (
  //   <div className="text-black dark:text-white mt-5 w-full">
  //     <table className="w-full min-w-max table-auto text-left">
  //       <thead className="sticky top-0 z-10 bg-white dark:bg-slate">
  //         <tr>
  //           {columns.map((head, idx) => (
  //             <th key={idx} className="h-button text-center font-font-dark-gray font-normal  text-sm">
  //                 {head}
  //             </th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody className="text-center">
  //         {/* {data.map(({ w, l, ps, pa, diff}, index) => ( */}
  //           <tr className="odd:bg-light-dark-gray dark:odd:bg-dark-gray even:bg-light-charcoal dark:even:bg-charcoal h-[53px]">
  //             <td className="w-1/5">
  //               <Typography
  //                 variant="small"
  //                 color="blue-gray"
  //                 className="font-normal"
  //               >
  //                 {team.win}
  //               </Typography>
  //             </td>
  //             <td className="w-1/5">
  //               <Typography
  //                 variant="small"
  //                 color="blue-gray"
  //                 className="font-normal"
  //               >
  //                 {team.lose}
  //               </Typography>
  //             </td>
  //             <td className="w-1/5">
  //               <Typography
  //                 variant="small"
  //                 color="blue-gray"
  //                 className="font-normal"
  //               >
  //                 {team.pointScored}
  //               </Typography>
  //             </td>
  //             <td className="w-1/5">
  //               {/* <img src={mark} alt="" className="mr-3"/> */}
  //               <Typography
  //                 variant="small"
  //                 color="blue-gray"
  //                 className="font-normal"
  //               >
  //                 {team.pointAgainst}
  //               </Typography>
  //             </td>
  //             <td className="w-1/5">
  //               <Typography
  //                 variant="small"
  //                 color="blue-gray"
  //                 className="font-normal"
  //               >
  //                 {team.diff}
  //               </Typography>
  //             </td>
  //           </tr>
  //         {/* ))} */}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  return (
    <>
        <Table
          data={[team]}
          columns={columns}
          presentCheckBox={false}
          presentOptions={false}
      />
    </>
  )
};

export default TeamStatistics;
