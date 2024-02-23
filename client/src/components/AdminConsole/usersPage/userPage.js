import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import UserHerders from "./userHeaders";
import UserListPage from "./userListPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/AdminConsoleAction/users/usersAction";
import InfiniteScroll from "react-infinite-scroll-component";
import CloseIcon from "@mui/icons-material/Close"; // Added CloseIcon
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";

export default function User() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(false);
  const [pageCounter, setPageCounter] = useState(2);
  const [skillsCheckedData, setSkillsCheckedData] = useState([]);
  const [designationId, setDesignationId] = useState("All");

  const userData = useSelector(
    (state) => state?.nonPersist?.userDetails?.usersData
  );

  const removeSkill = (skillToRemove) => {
    setSkillsCheckedData((prevSkills) =>
      prevSkills.filter((skill) => skill.skillId !== skillToRemove.skillId)
    );
  };

  const payload = {
    size: 5 * 2,
  };

  useEffect(() => {
    dispatch(getAllUsers(payload));
  }, [users]);

  useEffect(() => {
    dispatch(masterDataAction());
  }, [users]);

  const fetchMore = () => {
    // Fetch more data only if there is more data available
    const nextPage = 10 * pageCounter;
    const nextPagePayload = {
      size: nextPage,
    };

    dispatch(getAllUsers(nextPagePayload));
    setPageCounter((counter) => counter + 1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
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
        />
        <Box
          display={"flex"}
          gap={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
          p={1}
          sx={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          {skillsCheckedData.length > 0 ? (
            <>
              <Grid>
                <Typography variant="subtitle1">Filter</Typography>
              </Grid>
              <Typography>{skillsCheckedData.length} result for</Typography>
            </>
          ) : (
            <></>
          )}
          {skillsCheckedData?.map((selectedSkills) => {
            return (
              <Box
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
                  size="small"
                >
                  <CloseIcon
                    sx={{
                      width: "15px",
                    }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    padding: "6px, 10px, 6px, 10px",
                  }}
                >
                  {selectedSkills?.skillName}
                </Typography>
              </Box>
            );
          })}
        </Box>
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
          <div style={{ display: "flex", flexWrap: "wrap", overflow: "auto" }}>
            {userData?.content?.map((user) => (
              <UserListPage
                key={user.id}
                index={user.id}
                SetUsers={setUsers}
                userData={user}
                skillsCheckedData={skillsCheckedData}
                removeSkill={removeSkill}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </Box>
  );
}
