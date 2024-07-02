import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function MasterDataPage({
  handleExpand,
  designationExpand,
  handleAdd,
  designationData,
  handleDesignation,
  skillExpand,
  skillData,
  officeLocationExpand,
  officeLocationData,
  DataValue,
  clientOfficeLocationExpand,
  onsiteLocationData,
  jobTypeExpand,
  jobTypeData,
  manageHolidayExpand,
  holidayData,
  clientDetailsExpand,
  clinetData,
  domineExpand,
  domineData,
}) {
  return (
    <>
      <Grid container alignItems="center">
        <Typography variant="h2" component="div" sx={{ marginLeft: 1 }}>
          Master Data
        </Typography>
      </Grid>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
          marginTop: "10px",
        }}
      />
      <Grid sx={{ paddingLeft: "15px" }}>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("designation")}
          expanded={designationExpand}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
              justifyContent: "space-between",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Designation
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {designationExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!designationExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("Designation")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {designationData && designationData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {designationData.map((designation, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                designation.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "6px",
                              margin: "5px",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              color:
                                designation.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "Designation",
                                  designation.designationName,
                                  designation.designationId,
                                  designation.status
                                )
                              }
                              sx={{
                                cursor: "pointer",
                                lineBreak:"anywhere"
                              }}
                              
                            >
                              {designation.designationName}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("skill")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Skill
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {skillExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!skillExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("Skill")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {skillData && skillData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height:  "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {skillData?.map((skill, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                skill.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "6px",
                              margin: "5px",
                              height: "auto",
                              color:
                                skill.status === "ACTIVE" ? "black" : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "Skill",
                                  skill.skillName,
                                  skill.skillId,
                                  skill.status
                                )
                              }
                              sx={{
                                cursor: "pointer",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {skill.skillName}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("officeLocation")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Office Location
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {officeLocationExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!officeLocationExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("officeLocation")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {officeLocationData && officeLocationData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {officeLocationData?.map((officeLocation, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                officeLocation.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "10px",
                              margin: "5px",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                              color:
                                officeLocation.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "officeLocation",
                                  `${officeLocation.address.name},${
                                    DataValue[officeLocation?.address?.cityId]
                                  }`,
                                  officeLocation.locationId,
                                  officeLocation.status
                                )
                              }
                              sx={{
                                textAlign: "center",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {`${officeLocation?.address?.name}`}
                              <br />
                              {`${officeLocation?.address?.addressLine1} ${
                                officeLocation?.address?.addressLine2
                              },${
                                DataValue[officeLocation?.address?.cityId]
                              } -${officeLocation?.address?.postalCode},${
                                DataValue[officeLocation?.address?.countryId]
                              }.`}
                              <br />
                              {`Phone: ${officeLocation.phoneNumber}`}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("clientOfficeLocation")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Client Onsite Office Location
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {clientOfficeLocationExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!clientOfficeLocationExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("clientOfficeLocation")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {onsiteLocationData && onsiteLocationData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {onsiteLocationData?.map((onsiteLocation, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                onsiteLocation.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "10px",
                              margin: "5px",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                              color:
                                onsiteLocation.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "clientOfficeLocation",
                                  onsiteLocation.address.name,
                                  onsiteLocation.locationId,
                                  onsiteLocation.status
                                )
                              }
                              sx={{
                                textAlign: "center",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {`${onsiteLocation?.address?.name}`}
                              <br />
                              {` ${onsiteLocation?.address?.addressLine1} -${
                                onsiteLocation?.address?.addressLine2
                              }, ${DataValue[onsiteLocation.address?.cityId]} ${
                                onsiteLocation?.address?.postalCode
                              }, ${
                                DataValue[onsiteLocation.address?.countryId]
                              }`}
                              <br />
                              {`Phone: ${onsiteLocation?.phoneNumber}`}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("jobType")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Job Type
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {jobTypeExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!jobTypeExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("Job Type")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>

                    <Grid
                      container
                      sx={{
                        border: "1px solid #AEAEAE",
                        height: "auto",
                        overflow: "auto",
                        padding: "10px",
                      }}
                      mt={2}
                    >
                      {jobTypeData?.map((job, index) => (
                        <Grid
                          item
                          key={index}
                          sx={{
                            border:
                              job.status === "ACTIVE"
                                ? "1.5px solid #008080"
                                : "1.5px solid #AEAEAE",
                            borderRadius: "15px",
                            padding: "6px",
                            margin: "5px",
                            height: "auto",
                            color:
                              job.status === "ACTIVE" ? "black" : "#AEAEAE",
                          }}
                        >
                          <Typography
                            onClick={() =>
                              handleDesignation(
                                "Job Type",
                                job.jobType,
                                job.jobId,
                                job.status
                              )
                            }
                            sx={{
                              cursor: "pointer",
                               lineBreak:"anywhere"
                            }}
                          >
                            {job.jobType}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("manageHoliday")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Manage Holiday
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {manageHolidayExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!manageHolidayExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("holiday")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {holidayData && holidayData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {holidayData?.map((holiday, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                holiday.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "10px",
                              margin: "5px",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                              color:
                                holiday.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "holiday",
                                  `${holiday.name} ,${holiday.holidayType} `,
                                  holiday.id,
                                  holiday.status
                                )
                              }
                              sx={{
                                cursor: "pointer",
                                textAlign: "center",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {`${holiday.holidayType} - ${dayjs(
                                holiday.date
                              ).format("DD-MMM-YYYY")}`}
                              <br />
                              {`${holiday.name}`}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("clinetDetails")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Client Details
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {clientDetailsExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!clientDetailsExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("clinetDetails")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {clinetData && clinetData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {clinetData?.map((clinet, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                clinet.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "10px",
                              margin: "5px",
                              height: "auto",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                              color:
                                clinet.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "clinetDetails",
                                  clinet.clientName,
                                  clinet.clientId,
                                  clinet.status
                                )
                              }
                              sx={{
                                textAlign: "center",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {`${clinet.clientName}`}
                              <br />
                              {` ${clinet?.address?.addressLine1} -${
                                clinet?.address?.addressLine2
                              }, ${DataValue[clinet.address?.cityId]} ${
                                clinet?.address?.postalCode
                              }.`}
                              <br />
                              {`Phone: ${clinet?.phone}`}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
        <Accordion
          sx={{
            border: "1px solid #898989",
            width: "100%",
            marginBottom: "2px",
          }}
          onChange={() => handleExpand("domain")}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row",
              "&.Mui-focusVisible": {
                background: "none",
              },
              width: "100%",
              backgroundColor: "#008080",
            }}
          >
            <Grid container alignItems="center" sx={{ color: "#fff" }}>
              <Grid item xs={11.5}>
                <Typography variant="h6" ml={3}>
                  Domain
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {domineExpand ? <RemoveIcon /> : <AddIcon />}
              </Grid>
            </Grid>
          </AccordionSummary>

          {!domineExpand ? (
            <></>
          ) : (
            <>
              <AccordionDetails
                sx={{
                  padding: "20px 20px 20px 20px",
                }}
              >
                <Grid item sm={12}>
                  <Grid container>
                    <Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd("Domain")}
                        sx={{
                          width: "100px",
                          height: "46px",
                          fontSize: "20px",
                        }}
                      >
                        ADD
                      </Button>
                    </Grid>
                    {domineData && domineData.length > 0 && (
                      <Grid
                        container
                        sx={{
                          border: "1px solid #AEAEAE",
                          height: "auto",
                          overflow: "auto",
                          padding: "10px",
                        }}
                        mt={2}
                      >
                        {domineData?.map((domine, index) => (
                          <Grid
                            item
                            key={index}
                            sx={{
                              border:
                                domine.status === "ACTIVE"
                                  ? "1.5px solid #008080"
                                  : "1.5px solid #AEAEAE",
                              borderRadius: "15px",
                              padding: "6px",
                              margin: "5px",
                              height: "auto",
                              color:
                                domine.status === "ACTIVE"
                                  ? "black"
                                  : "#AEAEAE",
                            }}
                          >
                            <Typography
                              onClick={() =>
                                handleDesignation(
                                  "Domain",
                                  domine.domainName,
                                  domine.domainId,
                                  domine?.status
                                )
                              }
                              sx={{
                                cursor: "pointer",
                                 lineBreak:"anywhere"
                              }}
                            >
                              {domine.domainName}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </>
          )}
        </Accordion>
      </Grid>
    </>
  );
}
