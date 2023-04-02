// import * as React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_PROPHECY } from "../utils/queries";

// import { useTable } from "react-table";

// //upload photos

// function ProphecyHistory() {
//   // Grabbing query data from the MongoDB database
//   const { loading, error, data } = useQuery(QUERY_PROPHECY);

//   if (loading)return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   // const removeHistoryItem = (id) => {
//   //   const updatedHistory = [...historyContainer].filter(
//   //     (item) => item.id !== id
//   //   );

//   //   setHistory(updatedHistory);
//   // };
//   const tableData = React.useMemo(() => data.prophecyHistories, [data]);
//   const columns = React.useMemo(() => [
//     {
//       Header: "Date",
//       accessor: "readingDate",
//     },
//     {
//       Header: "Cards",
//       accessor: "cards",
//     },
//     {
//       Header: "CardPosition",
//       accessor: "cardPosition",
//     },
//     {
//       Header: "ResultsAI",
//       accessor: "resultsAI",
//     },
//     {
//       Header: "UserName",
//       accessor: "user",
//     },
//   ],
//   []);

//   const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, tableData});

//   return (
//     <div>
//       <h1>History of Prophecies</h1>
//       <div className="container">
//         <table {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ProphecyHistory;
