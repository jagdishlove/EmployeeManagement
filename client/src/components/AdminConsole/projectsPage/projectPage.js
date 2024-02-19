import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../redux/actions/AdminConsoleAction/projects/projectsAction";
import ProjectList from "./projectList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/system";
import ProjectHeader from "./projectHeader";

const Projects = () => {
  const [projects, setProjects] = useState("ONGOING_PROJECTS");
  const [pageCounter, setPageCounter] = useState(2);
  const dispatch = useDispatch();


  const payload = {
    size: 5 * 2,
    status: projects,
  };

  const getProjectpayload = {
    filters: [],
  };

  const projectsData = useSelector(
    (state) => state?.nonPersist?.projectDetails?.projectsData
  );
 

  useEffect(() => {
    dispatch(getAllProjects(payload, getProjectpayload));
  }, [projects, dispatch]);

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
      filters: [
        { status: projects }, // Include the status in the filters array for pagination as well
      ],
    };

    dispatch(getAllProjects(nextPagePayload));
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
        <ProjectHeader projectsData={projectsData} payload={payload} getProjectpayload={getProjectpayload} projects={projects} setProjects={setProjects}/>
      </Grid>
      {projectsData?.content?.length === 0 ? (
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
            {projectsData?.content?.map((projects) => (
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
