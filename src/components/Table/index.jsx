const Table = (props) => {

    const {
        columns,
        data,
        icon
    } = props;

    return (
        <table className="border-collapse border border-slate-500 rounded-lg">
            <thead>
                <tr>
                    {
                        columns.map((column) => (
                            <th className="border border-slate-500 text-white">
                                Date
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d) => (

                        <tr>
                            <td className="border border-slate-700 text-white">
                                {d.date}
                            </td>
                            <td className="border border-slate-700 text-white">
                                {d.location}
                            </td>
                            <td className="border border-slate-700 text-white">
                                {d.time}
                            </td>
                            <td className="border border-slate-700 text-white">
                                {d.home}
                            </td>
                            <td className="border border-slate-700 text-white">
                                {d.away}
                            </td>
                            <td className="border border-slate-700 text-white">
                                {d.results}
                            </td>
                            {
                                icon ? <td>
                                    <img src={icon} alt="" />
                                </td> : ""
                            }


                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Table;