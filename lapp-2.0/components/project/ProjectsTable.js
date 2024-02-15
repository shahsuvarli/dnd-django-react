'use client'

import { Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const heads = [
  "Project ID",
  "Sales Org. ID",
  "Project Names",
  "Ranking",
  "General Contractor",
  "Electrical Contractor",
  "State",
  "Region",
  "Vertical Market",
  "Status",
  "Won/Lost",
  "Channel",
  "Note",
  "Total Value",
  "Created By",
  "Created Date",
  "Modified By",
  "Modified Date",
];

function ProjectsTable({ projects }) {
  const [start, setStart] = React.useState(0);
  const [step, setStep] = React.useState(10);

  const handlePerPage = (e) => {
    setStep(Number(e.target.value));
  };

  const handleStepCount = (e, p) => {
    setStart((p - 1) * step);
  };

  return (
    <div className="flex flex-col py-5 px-8 gap-8 w-full h-fit bg-[#f7f6f3] rounded-md box-border mb-12">
      <Typography fontSize={24} alignSelf={"flex-start"}>
        Project List
      </Typography>
      <div className="max-w-full overflow-x-scroll box-border">
        <table className="w-full rounded-md overflow-x-scroll box-border">
          <thead>
            <tr>
              {heads.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects
              .sort(function (a, b) {
                return b.project_id - a.project_id;
              })
              .slice(start, start + step)
              .map((item) => {
                return (
                  <tr key={item.project_id}>
                    <td>
                      <Link
                        href={`/projects/list/${item.project_id.toString()}`}
                        className="no-underline border border-solid border-[#aaa9a9] rounded-md px-2 py-1 bg-white text-[#383636] hover:bg-[#e7914e] hover:text-white hover:border-transparent"
                      >
                        {item.project_id}
                      </Link>
                    </td>
                    <td>{item.Sales_Org.sales_org}</td>
                    <td>{item.project_name}</td>
                    <td>{item.ranking}</td>
                    <td>{item.general_contractor}</td>
                    <td>{item.electrical_contractor}</td>
                    <td>{item.State.state_long_name}</td>
                    <td>{item.Region.region_name}</td>
                    <td>{item.Vertical_Market.vertical_market_name}</td>
                    <td>{item.status}</td>
                    <td>{item.won_lost}</td>
                    <td>{item.Channel.channel_name}</td>
                    <td className="w-40 break-words overflow-scroll text-ellipsis border-b-0 h-[4em] border-l-0 border-r-0 line-clamp-3">
                      {item.notes}
                    </td>
                    <td className="whitespace-nowrap">{item.total_value} $</td>
                    <td className="whitespace-nowrap">
                      {item.Employees_Project_created_byToEmployees.name}{" "}
                      {item.Employees_Project_created_byToEmployees.surname}
                    </td>
                    <td className="whitespace-nowrap">
                      {/* {item.created_date.substring(0, 10)} */}
                    </td>
                    <td className="whitespace-nowrap">
                      {item.Employees_Project_modified_byToEmployees.name}{" "}
                      {item.Employees_Project_modified_byToEmployees.surname}
                    </td>
                    <td className="whitespace-nowrap">
                      {/* {item.modified_date.substring(0, 10)} */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center [&>div]:flex [&>div]:flex-row [&>div]:gap-3 [&>div]:items-center">
        <div>
          <Typography fontSize={"13px"} color={"#313131"}>
            Rows per page
          </Typography>
          <select
            id="rowCount"
            className="py-2 pr-1 pl-2 border border-solid border-[#d9d9d9]"
            onChange={handlePerPage}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(projects.length / step)}
            showFirstButton
            showLastButton
            onChange={handleStepCount}
          />
        </Stack>
      </div>
    </div>
  );
}

export default ProjectsTable;
