import { React } from "react";
// import "./Table.css"

function Table({ data }){
    return(
       
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>In</th>
                        <th>Out</th>
                        <th>Hours</th>
                        <th>Status</th>
                    </tr>
                </thead>

        

        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.employee}</td>
                    <td>{item.date}</td>
                    <td>{item.clockIn}</td>
                    <td>{item.clockOut}</td>
                    <td>{item.hours}</td>
                    <td><span className={item.status.toLowerCase()}>{item.status}</span></td>
                    </tr>
            ))}
        </tbody>
        </table>
    );
}
export default Table;