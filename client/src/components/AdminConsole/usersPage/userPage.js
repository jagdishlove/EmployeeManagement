import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import UserHerders from "./userHeaders";
import UserListPage from "./userListPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import CloseIcon from "@mui/icons-material/Close";

export default function User() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(false);
  const [pageCounter, setPageCounter] = useState(2);
  const [skillsCheckedData, setSkillsCheckedData] = useState([]);
  const [designationId, setDesignationId] = useState("All");
  const [selectedSearchOption, setSelectedSearchOption] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const userData = useSelector(
    (state) => state?.persistData?.userDetails?.usersData
  );

  localStorage.setItem("selectedTabIndex", 0);
  const removeSkill = (skillToRemove) => {
    setSkillsCheckedData((prevSkills) =>
      prevSkills.filter((skill) => skill.skillId !== skillToRemove.skillId)
    );
    setFilteredSkills((prevFilteredSkills) =>
      prevFilteredSkills.filter(
        (skill) => skill.skillId !== skillToRemove.skillId
      )
    );
  };

  const skillIds = skillsCheckedData.map((skill) => skill.skillId);
  const skillIdsString = skillIds.join(",");

  const payload = {
    size: 5 * 2,
    designationId: designationId === "All" ? "" : designationId,
    skillIds: skillIdsString,
  };

  useEffect(() => {
    dispatch(getAllUsers(payload, selectedSearchOption));
  }, [users, selectedSearchOption, designationId, skillsCheckedData]);

  useEffect(() => {
    dispatch(masterDataAction());
  }, [users]);

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
      designationId: designationId === "All" ? "" : designationId,
      skillIds: skillIdsString,
    };

    dispatch(getAllUsers(nextPagePayload));
    setPageCounter((counter) => counter + 1);
  };

  localStorage.removeItem("selectedProject");
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        USERS
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
        <UserHerders
          userData={userData}
          setSkillsCheckedData={setSkillsCheckedData}
          skillsCheckedData={skillsCheckedData}
          designationId={designationId}
          setDesignationId={setDesignationId}
          setSelectedSearchOption={setSelectedSearchOption}
          selectedSearchOption={selectedSearchOption}
          filteredSkills={filteredSkills}
          setFilteredSkills={setFilteredSkills}
        />
        <Grid>
          {skillsCheckedData.length > 0 ? (
            <>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", fontSize: "25px" }}
              >
                Filters
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          display={"flex"}
          gap={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          {skillsCheckedData.length > 0 ? (
            <>
              <Grid>
                <Typography>
                  {userData?.totalElements ? userData.totalElements : "0"}{" "}
                  result for
                </Typography>
              </Grid>
            </>
          ) : (
            <></>
          )}
          {skillsCheckedData?.map((selectedSkills) => {
            return (
              <Grid
                sx={{
                  padding: "3px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #79747E",
                }}
                key={selectedSkills.skillId}
              >
                <IconButton
                  onClick={() => removeSkill(selectedSkills)}
                  sx={{ padding: "6px" }}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{
                    padding: "6px, 10px, 6px, 10px",
                  }}
                >
                  {selectedSkills?.skillName}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      {userData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>No User Data Found</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={userData?.content?.length || 0}
          next={fetchMore}
          hasMore={userData?.totalElements > userData?.numberOfElements}
        >
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
            }}
          >
            {" "}
            {userData?.content?.map((user) => (
              <Grid key={user.id} item xs={12} sm={6} md={4} lg={4}>
                <UserListPage
                  key={user.id}
                  index={user.id}
                  SetUsers={setUsers}
                  userData={user}
                  skillsCheckedData={skillsCheckedData}
                  removeSkill={removeSkill}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Box>
  );
}
