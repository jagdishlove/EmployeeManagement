import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import ProjectList from "./projectList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/system";
import ProjectHeader from "./projectHeader";

const Projects = () => {
  const ONGOING_PROJECTS = "ONGOING_PROJECTS";
  const [projects, setProjects] = useState(ONGOING_PROJECTS);
  const [pageCounter, setPageCounter] = useState(2);
  const [searchData, setSearchData] = useState();
  const dispatch = useDispatch();
  const [resultFilterData, setResultFilterData] = useState([]);

  console.log("resultFilterData", resultFilterData);

  const projectsData = useSelector(
    (state) => state?.nonPersist?.projectDetails?.projectsData
  );

  const searchDataArray = searchData?.map((obj) => obj.name || []);

  useEffect(() => {
    setResultFilterData(projectsData);
  }, [projectsData]);
  useEffect(() => {
    if (searchDataArray?.length > 0) {
      const filterProjects = projectsData?.content?.filter((obj) =>
        searchDataArray.includes(obj.projectName)
      );
      setResultFilterData({ content: filterProjects });
    }
  }, [searchData]);

  const handleChange = (e) => {
    setSearchData(e);
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: e,
    // }));
  };

  const getProjectpayload = {
    size: 5 * 2,
    status: projects,
  };

  const payload = {
    filters: [],
  };

  useEffect(() => {
    dispatch(getAllProjects(payload, getProjectpayload));
  }, [projects, dispatch]);

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
