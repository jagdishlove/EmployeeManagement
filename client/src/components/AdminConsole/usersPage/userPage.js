import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import UserHerders from './userHeaders';
import UserListPage from './userListPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/users/usersAction';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function User() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(false);
  const [pageCounter, setPageCounter] = useState(2);

  const userData = useSelector(
    (state) => state?.nonPersist?.userDetails?.usersData
  );

  const payload = {
    size: 5 * 2,
  }

  useEffect(() => {
    dispatch(getAllUsers(payload));
  }, [users]);


  const fetchMore = () => {
    // Fetch more data only if there is more data available
    // dispatch(getLeaveRequestData(payload));
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
          width: '100%',
          margin: 'auto',
          marginBottom: '18px',
          border: '1px solid #008080',
        }}
      />
      <Grid mb={5}>
        <UserHerders 
          userData={userData}
        />
      </Grid>
      {userData?.content?.length === 0 ? (
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>No User Data Found</Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={userData?.content?.length || 0}
          next={fetchMore}
          hasMore={userData?.totalElements > userData?.numberOfElements}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap',overflow:'auto' }}>
            {userData?.content?.map((user) => (
              <UserListPage key={user.id} index={user.id} SetUsers={setUsers} userData={user} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </Box>
  );
}
