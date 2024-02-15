"use client";

import React from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProjectsTable from "./ProjectsTable";
import axios from "axios";

export default function ListProjects({
  state,
  region,
  vertical_market,
  channel,
  sales_org,
  initialProjects,
}) {
  const { user } = useSelector((state) => state.crm);
  const [states, setStates] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [projects, setProjects] = React.useState(initialProjects);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/project/search/`, {
        params: formik.values,
        headers: {
          "Content-Type": "application/json", // Example header
        },
      });

      setProjects(response.data);
    } catch (err) {
      throw new Error("Failed to run search");
    }
  };

  const formik = useFormik({
    initialValues: {
      sales_org_id: "",
      // projectId: 1,
      project_name: "",
      ranking: "",
      general_contractor: "",
      electrical_contractor: "",
      state: "",
      region: "",
      vertical_market: "",
      status: "",
      won_lost: "",
      channel: "",
      date_from: "",
      date_to: "",
      notes: "",
      total_value: 0,
      created_by: `${user.name} ${user.surname}`,
      modified_by: `${user.name} ${user.surname}`,
      modified_date: "2023-05-22T09:30:00Z",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSearch();
        setSubmitting(false);
      }, 400);
    },
  });

  return (
    <div className="flex flex-col gap-5 animate-[rise_1s_ease-in-out] lg:w-[calc(100%-310px)] w-full">
      <div className="flex flex-col py-8 px-5 gap-8 bg-[#f7f6f3] rounded-md box-border animate-[rise_1s_ease-in-out w-full]">
        <Typography fontSize={24} alignSelf={"flex-start"}>
          Project Search
        </Typography>
        <Formik>
          <Form
            className="w-full flex flex-col justify-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full h-full gap-y-6 gap-x-0 flex flex-wrap justify-between  [&>*]:gap-2 [&>*]:flex [&>*]:flex-col [&>*]:text-sm text-[#313131] [&>*]:w-[32%] [&>*]:relative [&>div>input]:h-10 [&>div>input]:p-2 [&>div>input]:box-border [&>div>input]:rounded-md [&>div>input]:border [&>div>input]:border-solid [&>div>input]:border-[#d9d9d9] [&>div>select]:h-10 [&>div>select]:p-2 [&>div>select]:box-border [&>div>select]:rounded-md [&>div>select]:border [&>div>select]:border-solid [&>div>select]:border-[#d9d9d9]">
              <div>
                <label htmlFor="sales_org_id">Sales organization</label>
                <Field
                  name="sales_org_id"
                  type="select"
                  as="select"
                  id="sales_org_id"
                  placeholder="Enter Sales Organization"
                  value={formik.values.sales_org_id}
                  onChange={(event) => {
                    formik.handleChange(event);
                    const selectedStates = state.filter(
                      (item) => item.sales_org_id == event.target.value
                    );
                    const selectedRegions = region.filter(
                      (item) => item.sales_org_id == event.target.value
                    );
                    setStates(selectedStates);
                    setRegions(selectedRegions);
                  }}
                >
                  <option value="">Select Sales Organization</option>
                  {sales_org.map(({ sales_org_id, sales_org }) => (
                    <option value={sales_org_id} key={sales_org_id}>
                      {sales_org_id} - {sales_org}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label htmlFor="project_name">Project Name</label>
                <Field
                  name="project_name"
                  type="text"
                  id="project_name"
                  value={formik.values.project_name}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  placeholder="Enter Project Name"
                />
              </div>
              <div>
                <label htmlFor="ranking">Ranking</label>
                <Field
                  name="ranking"
                  type="select"
                  as="select"
                  id="ranking"
                  value={formik.values.ranking}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Ranking</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Field>
              </div>
              <div>
                <label htmlFor="general_contractor">General Contractor</label>
                <Field
                  name="general_contractor"
                  type="text"
                  id="general_contractor"
                  placeholder="Enter General Contractor"
                  value={formik.values.general_contractor}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
              </div>
              <div>
                <label htmlFor="electrical_contractor">
                  Electrical Contractor
                </label>
                <Field
                  name="electrical_contractor"
                  type="text"
                  id="electrical_contractor"
                  placeholder="Enter Electrical Contractor"
                  value={formik.values.electrical_contractor}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <Field
                  name="state"
                  type="text"
                  as="select"
                  id="state"
                  placeholder="Select State"
                  value={formik.values.state}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option
                      value={state.state_short_name}
                      key={state.state_short_name}
                    >
                      {state.state_long_name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label htmlFor="date_from">Created Date</label>
                <div className="flex flex-row justify-between gap-1 box-border [&>input]:w-1/2">
                  <Field
                    name="date_from"
                    type="date"
                    id="date_from"
                    value={formik.values.date_from}
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                  />
                  <Field
                    name="date_to"
                    type="date"
                    id="date_to"
                    value={formik.values.date_to}
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="region">Region</label>
                <Field
                  name="region"
                  type="text"
                  id="region"
                  as="select"
                  autoComplete="off"
                  placeholder="Select Region"
                  value={formik.values.region}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Region</option>
                  {regions.map(({ region_id, region_name }) => (
                    <option value={region_id} key={region_id}>
                      {region_name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label htmlFor="vertical_market">Vertical Market</label>
                <Field
                  name="vertical_market"
                  type="text"
                  as="select"
                  id="vertical_market"
                  placeholder="Select Vertical Market"
                  value={formik.values.vertical_market}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Market</option>
                  {vertical_market.map(
                    ({ vertical_market_id, vertical_market_name }) => (
                      <option
                        value={vertical_market_id}
                        key={vertical_market_id}
                      >
                        {vertical_market_name}
                      </option>
                    )
                  )}
                </Field>
              </div>
              <div>
                <label htmlFor="channel">Channel (direct/dist)</label>
                <Field
                  name="channel"
                  type="text"
                  id="channel"
                  as="select"
                  placeholder="Select Channel"
                  value={formik.values.channel}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Channel</option>
                  {channel.map(({ channel_id, channel_name }) => (
                    <option value={channel_id} key={channel_id}>
                      {channel_name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <Field
                  name="status"
                  type="text"
                  as="select"
                  id="status"
                  placeholder="Select Status"
                  value={formik.values.status}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Status</option>
                  <option value={"open"}>Open</option>
                  <option value={"closed"}>Closed</option>
                </Field>
              </div>
              <div>
                <label htmlFor="wonLost">Won / Lost</label>
                <Field
                  name="wonLost"
                  type="text"
                  as="select"
                  id="wonLost"
                  placeholder="Select Won / Lost"
                  value={formik.values.won_lost}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                >
                  <option value="">Select Won/Lost</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"won"}>Won</option>
                  <option value={"lost"}>Lost</option>
                </Field>
              </div>
              <div className="sm:w-[49%] w-full">
                <label htmlFor="notes">Notes</label>
                <Field
                  className="h-16 border border-solid border-[#d9d9d9] border-radius text-base p-2"
                  name="notes"
                  id="notes"
                  type="textarea"
                  placeholder="Enter Notes"
                  rows="4"
                  component="textarea"
                  value={formik.values.notes}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                />
              </div>
            </div>
            <div className="flex text-base gap-5 self-end mt-3 [&>button]:w-36 [&>button]:rounded-md [&>button]:border-none [&>button]:hover:cursor-pointer">
              <button
                className="bg-[#e4e2dd] text-[#313131] h-10"
                type="cancel"
                onClick={formik.resetForm}
              >
                Reset
              </button>
              <button className="bg-[#e7914e] text-white h-10" type="submit">
                Search
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div>
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
}
