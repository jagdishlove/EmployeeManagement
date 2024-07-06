import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import ProjectList from "./projectList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/system";
import ProjectHeader from "./projectHeader";

const Projects = () => {
  const ALL = "ALL";
  const [projects, setProjects] = useState(ALL);
  const [pageCounter, setPageCounter] = useState(2);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const [resultFilterData, setResultFilterData] = useState([]);

  const projectsData = useSelector(
    (state) => state?.persistData?.projectDetails?.projectsData
  );

  useEffect(() => {
    setResultFilterData(projectsData);
  }, [projectsData]);

  const handleChange = (e) => {
    setSearchData(e);
  };

  localStorage.setItem("selectedTabIndex", 0);
  const getProjectpayload = {
    size: 5 * 2,
    status: projects,
  };

  const payload = {
    filters: searchData ? [searchData] : [],
  };

  useEffect(() => {
    dispatch(getAllProjects(payload, getProjectpayload));
  }, [projects, dispatch, searchData]);

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
      status: projects,
    };

    const payload = { filters: [] };

    dispatch(getAllProjects(payload, nextPagePayload));
    setPageCounter((counter) => counter + 1);
  };

  localStorage.removeItem("selectedProject");
  return (
    <div>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Projects
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />

      <Grid mb={5}>
        <ProjectHeader
          setProjects={setProjects}
          projectsData={projectsData}
          projects={projects}
          handleChange={handleChange}
          searchData={searchData}
        />
      </Grid>
      {resultFilterData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No Project Data Found</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={projectsData?.content?.length || 0}
          next={fetchMore}
          hasMore={projectsData?.totalElements > projectsData?.numberOfElements}
        >
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
            }}
          >
            {resultFilterData?.content?.map((projects) => (
              <Grid key={projects.id} item xs={12} sm={6} md={4} lg={4}>
                <ProjectList
                  key={projects.id}
                  index={projects.id}
                  setProjects={setProjects}
                  projectsData={projects}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Projects;
