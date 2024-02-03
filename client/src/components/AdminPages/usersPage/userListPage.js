import { Edit as EditIcon } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserDataListPage = ({ userData }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const managerData = useSelector(
    (state) => state.persistData.masterData?.skill
  );

  const Navigate = useNavigate();

  const handleViewInDetail = () => {
    Navigate('/userDetailPage')
  }

  const skillIdToName = {};
  managerData.forEach((skill) => {
    skillIdToName[skill.skillId] = skill.skillName;
  });

  return (
    <Card style={{
      border: '1px solid darkgray',
      borderRadius: '10px',
      width: '360px',
      margin: '5px',
      backgroundColor: userData?.status === 'ACTIVE' ? 'white' : '#F0F0F0',
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: userData?.status === 'ACTIVE' ? '#008080' : '#808080', color: '#fff' }}>
            {userData?.firstName.charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem
                selected={false}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            </Menu>
          </>
        }
        title={<Typography variant="body2" sx={{ color: '#1D1B20', fontSize: "16px" }}>{${userData?.firstName} | ID: ${userData?.empId}}</Typography>}
        subheader={<Typography variant="body2" sx={{ color: '#1D1B20', fontSize: '12px' }}>{${userData?.designation} | ${userData?.role}}</Typography>}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: 'black' }}>Current Projects : </b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: 'black' }}>Skill Set : </b>
              {userData.skillId && userData.skillId.length > 0 ? (
                userData.skillId.map((skill, id) => (
                  <React.Fragment key={id}>
                    {id > 0 && ' | '}
                    {skillIdToName[skill]}
                  </React.Fragment>
                ))
              ) : (
                skillIdToName[userData.skillId]
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              <b style={{ color: 'black' }}>Reporting Manager : </b> {userData?.managerFirstName} {userData?.managerLastName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Grid padding={1} ml={28}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="end"
          width="100%"
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              color: userData.status === 'ACTIVE' ? '#008080' : '#808080',
              cursor: 'pointer',
              backgroundColor: userData.status === 'ACTIVE' ? 'white' : '#F0F0F0',
              borderRadius: '40px',
              padding: '10px 10px',
              border: '1px solid #79747E',
              '&:hover': {
                backgroundColor: userData.status === 'ACTIVE' ? '#008080' : 'none',
                color: userData.status === 'ACTIVE' ? '#fff' : '#808080',
              },
              fontWeight: 'bold',
              textAlign: 'end'
            }}
            onClick={handleViewInDetail}
          >
            View in detail
          </Typography>
        </Box>
      </Grid>
    </Card>
  );
};

export default UserDataListPage;