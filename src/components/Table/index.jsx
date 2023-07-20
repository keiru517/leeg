const Table = (props) => {

    const {
        columns,
        data,
        icon
    } = props;

    return (
        <table class="
    table-auto border-collapse border border-slate-300">
        <thead>
            <tr class="bg-indigo-400 text-white">
                <td class="p-2">ID</td>
                <td class="p-2">Name</td>
                <td class="p-2">Price</td>
            </tr>
        </thead>
        <tbody>
            {
                data.map(d=>(
                    <tr class="even:bg-amber-100 odd:bg-blue-100">
                        <td class="p-2">1</td>
                        <td class="p-2">Blue T-shirt</td>
                        <td class="p-2">$9</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
        // <table className="border border-slate-500 rounded-lg border-separate border-spacing-0 text-white">
        //     <thead>
        //         <tr>
        //             {
        //                 columns.map((column) => (
        //                     <th className="">
        //                         Date
        //                     </th>
        //                 ))
        //             }
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {
        //             data.map((d) => (

        //                 <tr>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.date}
        //                     </td>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.location}
        //                     </td>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.time}
        //                     </td>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.home}
        //                     </td>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.away}
        //                     </td>
        //                     <td className="border border-slate-700 text-white">
        //                         {d.results}
        //                     </td>
        //                     {
        //                         icon ? <td>
        //                             <img src={icon} alt="" />
        //                         </td> : ""
        //                     }


        //                 </tr>
        //             ))
        //         }
        //     </tbody>
        // </table>
    );
}

export default Table;