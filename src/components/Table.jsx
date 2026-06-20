import { React } from "react";
// import "../styles/Table.css"

function Table({ data, columns}){
    return(
       
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                          <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

        

        <tbody>
            {data.map((item, i) => (
                <tr key={i}>
                    {columns.map((col, j) => (
                      <td key={j}>
                        {col.render
                        ? col.render(item)
                      : item[col.key]}
                      </td>
                    ))}
                    </tr>
            ))}
        </tbody>
        </table>
    );
}
export default Table;