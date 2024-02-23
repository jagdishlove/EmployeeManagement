import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateBandlData,
  CreateDesignationData,
  CreateDomine,
  CreateManageHoliday,
  CreateOfficeLocationnData,
  CreateSkillData,
  GetAllBandData,
  GetAllDesignationData,
  GetAllDomines,
  GetAllHolidays,
  GetAllOfficeLocationData,
  GetAllSkillData,
  GetBand,
  GetHoliday,
  GetOfficeLocation,
  UpdateBandlData,
  UpdateDesignationData,
  UpdateDomine,
  UpdateManageHoliday,
  UpdateOfficeLocationnData,
  UpdateSkillData,
  GetAllJobTypeData,
  CreateJobTypeData,
  UpdateJobType,
  getAllCountry,
  getAllState,
  CreateClinetDetails,
  UpdateClinetDetails,
  GatAllClinetDetails,
  getClientDetails,
  getLoocations,
  GetAllOnsiteOfficeLocation,
  CreateOnsiteOfficeLocation,
  getClientLocation,
  UpdateOnsiteOfficeLocation,
} from "../../../redux/actions/masterData/masterDataAction";
import { postcodeValidator } from "postcode-validator";
import MasterDataPage from "./masterDataPage";
import { useNavigate } from "react-router-dom";
import MasterDataDialogs from "./masterDataDialogs";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { Button } from "bootstrap";
import { GetAllCitys } from "../../../redux/actions/AdminConsoleAction/users/usersAction";

export default function MasterData() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [enable, setEnable] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [bandDialog, setBandDialog] = useState(false);
  const [holidayDialog, setHolidayDialog] = useState(false);
  const [desginationEdit, setDesugnationEdit] = useState(false);
  const [desginationDisable, setDesignationDisable] = useState(false);
  const [clientDialog, setClientDialog] = useState(false);
  const [clientLocationDialog, setClientLocationDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [changeData, setChnageData] = useState("");
  const [chnageDataType, setChangeDataType] = useState("");
  const [chnageDataId, setChnageDataId] = useState("");
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [designationExpand, setDesignatonExpand] = useState(true);
  const [skillExpand, setSkillExpand] = useState(false);
  const [officeLocationExpand, setOfiiceLocationExpand] = useState(false);
  const [bandExpand, setBandExpand] = useState(false);
  const [clientOfficeLocationExpand, setClientOfficeLocationExpand] =
    useState(false);
  const [jobTypeExpand, setJobTypeExpand] = useState(false);
  const [manageHolidayExpand, setManageHolidayExpand] = useState(false);
  const [clientDetailsExpand, setClientDetailsExpand] = useState(false);
  const [domineExpand, setDomineExpand] = useState(false);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [countyCode, setCountryCode] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const [officeData, setOfficeData] = useState({
    officeAddress: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    type: "",
    addressId: "",
    locationId: "",
  });

  const [bandFormData, setBandFormData] = useState({
    bandName: "",
    minimumCtc: "",
    maximumCtc: "",
  });

  const [holidayFormData, setHolidayFormData] = useState({
    holidayType: "",
    holidayName: "",
  });

  const [clinetDetails, setClinetDetails] = useState({
    clinetId: "",
    clinetName: "",
    phone: "",
    addressName: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    type: "",
    addressId: "",
  });

  const [clientLocationData, setClientLocationData] = useState({
    locationId: "",
    phone: "",
    addressName: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    type: "",
    addressId: "",
  });
  const skillData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.skillData
  );
  const jobTypeData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.jobTypeData
  );

  const holidayType = useSelector(
    (state) => state.persistData.masterData?.holidayTypes
  );

  const designationData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.designationData
  );
  const bandData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.bandData
  );

  const officeLocationData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.officeLocationData
  );

  const officeLocation = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.officeLocation
  );

  const bandByID = useSelector(
    (state) => state?.nonPersist?.masterDataDetails.bandValue
  );

  const holidayData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.holidayData
  );

  const holiday = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.holiday
  );

  const domineData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.domineData
  );

  const country = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.countrydata
  );

  const state = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.statedata
  );

  const clinetData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.clientdata
  );

  const clientDetails = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.clientDetails
  );

  const LocationData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.LocationData
  );

  const onsiteLocationData = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.onsiteLocationData
  );

  const onsiteLocation = useSelector(
    (state) => state?.nonPersist?.masterDataDetails?.onsiteLocation
  );

  const DataValue = {};
  LocationData.forEach((location) => {
    DataValue[location.id] = location.dataValue;
  });

  const countryCode = {};
  LocationData.forEach((location) => {
    countryCode[location.id] = location.code;
  });

  const city = useSelector((state) => state?.nonPersist?.userDetails?.cityData);

  const handleBack = () => {
    navigate(-1);
  };

  const cancleHandler = () => {
    setIsOpenCalender(false);
  };

  const cancleHandlerAccepentc = () => {
    setSelectedDate(dayjs());
  };

  const handleExpand = (type) => {
    if (type === "designation") {
      setDesignatonExpand(!designationExpand);
    }
    if (type === "skill") {
      setSkillExpand(!skillExpand);
    }
    if (type === "officeLocation") {
      setOfiiceLocationExpand(!officeLocationExpand);
    }
    if (type === "band") {
      setBandExpand(!bandExpand);
    }
    if (type === "clientOfficeLocation") {
      setClientOfficeLocationExpand(!clientOfficeLocationExpand);
    }
    if (type === "manageHoliday") {
      setManageHolidayExpand(!manageHolidayExpand);
    }
    if (type === "clinetDetails") {
      setClientDetailsExpand(!clientDetailsExpand);
    }
    if (type === "domine") {
      setDomineExpand(!domineExpand);
    }
    if (type === "jobType") {
      setJobTypeExpand(!jobTypeExpand);
    }
  };

  const ActionList = () => {
    return (
      <Box>
        <Button onClick={cancleHandlerAccepentc}>Okay</Button>
        <Button onClick={cancleHandler}>Cancel</Button>
      </Box>
    );
  };
  useEffect(() => {
    if (officeLocation) {
      setOfficeData({
        locationId: officeLocation.locationId || "",
        officeAddress: officeLocation.address?.name || "",
        addressLine1: officeLocation.address?.addressLine1 || "",
        addressLine2: officeLocation.address?.addressLine2 || "",
        phone: officeLocation.phoneNumber || "",
        countryId: officeLocation.address?.countryId || "",
        stateId: officeLocation.address?.stateId || "",
        cityId: officeLocation.address?.cityId || "",
        postalCode: officeLocation.address?.postalCode || "",
        type: officeLocation.address?.type || "",
        addressId: officeLocation.address?.addressId || "",
      });
      if (officeLocation.address?.countryId) {
        dispatch(
          getAllState({
            parentId: officeLocation.address?.countryId,
            dataType: "state",
          })
        );
      }

      if (officeLocation.address?.stateId) {
        dispatch(
          GetAllCitys({
            parentId: officeLocation.address?.stateId,
            dataType: "city",
          })
        );
      }
    }
    if (bandByID) {
      setBandFormData({
        bandName: bandByID.bandName || "",
        maximumCtc: bandByID.maximumCtc || "",
        minimumCtc: bandByID.minimumCtc || "",
      });
    }
    if (holiday) {
      setHolidayFormData({
        holidayName: holiday.name || "",
        holidayType: holiday.holidayType || "",
      });
      setSelectedDate(dayjs(holiday.date));
    }
    if (clientDetails) {
      setClinetDetails({
        clinetName: clientDetails.clientName || "",
        addressLine1: clientDetails.address?.addressLine1 || "",
        addressLine2: clientDetails.address?.addressLine2 || "",
        postalCode: clientDetails.address?.postalCode || "",
        countryId: clientDetails.address?.countryId || "",
        stateId: clientDetails.address?.stateId || "",
        cityId: clientDetails.address?.cityId || "",
        type: clientDetails.address?.type || "",
        addressId: clientDetails.address?.addressId || "",
        phone: clientDetails?.phone || "",
        clinetId: clientDetails?.clientId || "",
      });
      if (clientDetails.address?.countryId) {
        dispatch(
          getAllState({
            parentId: clientDetails.address?.countryId,
            dataType: "state",
          })
        );
      }

      if (clientDetails.address?.stateId) {
        dispatch(
          GetAllCitys({
            parentId: clientDetails.address?.stateId,
            dataType: "city",
          })
        );
      }
    }
    if (onsiteLocation) {
      setClientLocationData({
        addressLine1: onsiteLocation.address?.addressLine1 || "",
        addressLine2: onsiteLocation.address?.addressLine2 || "",
        postalCode: onsiteLocation.address?.postalCode || "",
        countryId: onsiteLocation.address?.countryId || "",
        stateId: onsiteLocation.address?.stateId || "",
        cityId: onsiteLocation.address?.cityId || "",
        type: onsiteLocation.address?.type || "",
        addressId: onsiteLocation.address?.addressId || "",
        phone: onsiteLocation?.phoneNumber || "",
        locationId: onsiteLocation?.locationId,
        addressName: onsiteLocation?.address?.name || "",
      });
      if (onsiteLocation.address?.countryId) {
        dispatch(
          getAllState({
            parentId: onsiteLocation.address?.countryId,
            dataType: "state",
          })
        );
      }

      if (onsiteLocation.address?.stateId) {
        dispatch(
          GetAllCitys({
            parentId: onsiteLocation.address?.stateId,
            dataType: "city",
          })
        );
      }
    }
  }, [
    officeLocation,
    dispatch,
    bandByID,
    holiday,
    clientDetails,
    onsiteLocation,
  ]);

  const handlechange = (e) => {
    setValue(e.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleDesignation = (type, data, id, status) => {
    if (status === "INACTIVE") {
      if (type === "band") {
        dispatch(GetBand(id));
      }
      if (type === "holiday") {
        dispatch(GetHoliday(id));
      }
      if (type === "officeLocation") {
        dispatch(GetOfficeLocation(id));
      }
      if (type === "clinetDetails") {
        dispatch(getClientDetails(id));
      }
      if (type === "clientOfficeLocation") {
        dispatch(getClientLocation(id));
      }
      setEnable(true);
      setChangeDataType(type);
      setChnageDataId(id);
      setChnageData(data);

      setValue(data);
    } else {
      setOpenDialog(true);
      setDesugnationEdit(false);
      setDesignationDisable(false);
      setChnageDataId(id);
      setChnageData(data);
      setChangeDataType(type);
      setValue(data);
    }
    setErrors({});
  };

  const handleEditDesignation = (type) => {
    setValue(changeData);
    if (type === "officeLocation") {
      setOpen(true);
      dispatch(GetOfficeLocation(chnageDataId));
      setChangeDataType(type);
      setEdit(true);
    } else if (type === "band") {
      setBandDialog(true);
      setChangeDataType(type);
      setEdit(true);
      dispatch(GetBand(chnageDataId));
    } else if (type === "holiday") {
      setHolidayDialog(true);
      dispatch(GetHoliday(chnageDataId));
      setEdit(true);
    }
    if (type === "clinetDetails") {
      dispatch(getClientDetails(chnageDataId));
      setClientDialog(true);
      setChangeDataType(type);
      setEdit(true);
    } else if (type === "clientOfficeLocation") {
      dispatch(getClientLocation(chnageDataId));
      setClientLocationDialog(true);
      setChangeDataType(type);
      setEdit(true);
    } else {
      setDesugnationEdit(true);
    }
    setErrors({});
  };
  const handleCloseDialog = async () => {
    setOpenDialog(false);
    setOpen(false);
    setDialog(false);
    setValue("");
    setEnable(false);
    setBandDialog(false);
    setClientDialog(false);
    setHolidayDialog(false);
    setOfficeData("");
    setBandFormData({
      bandName: "",
      minimum: "",
      maximum: "",
    });
    setHolidayFormData({
      holidayName: "",
      holidayType: "",
    });
    setSelectedDate(dayjs());
    setErrors({});
    setClinetDetails("");
    setClientLocationData("");
    setClientLocationDialog(false);
    setValue("");
    setChangeDataType("");
    setChnageDataId("");
    setSelectedDate(dayjs());
    setEnable(false);
    setErrors({});
    setSelectedImage(null);
  };

  const handleDisable = (type) => {
    setDesignationDisable(true);
    if (type === "officeLocation") {
      dispatch(GetOfficeLocation(chnageDataId));
    }
    if (type === "band") {
      dispatch(GetBand(chnageDataId));
    }
    if (type === "holiday") {
      dispatch(GetHoliday(chnageDataId));
    }
    if (type === "clinetDetails") {
      dispatch(getClientDetails(chnageDataId));
    }
    if (type === "clientOfficeLocation") {
      dispatch(getClientLocation(chnageDataId));
    }
  };

  const handleAddDesignationCancle = () => {
    setDesugnationEdit(false);
    setDesignationDisable(false);
  };

  useEffect(() => {
    if (skillExpand) {
      dispatch(GetAllSkillData());
    }
    if (jobTypeExpand) {
      dispatch(GetAllJobTypeData());
    }
    if (designationExpand) {
      dispatch(GetAllDesignationData());
    }
    if (bandExpand) {
      dispatch(GetAllBandData());
    }
    if (officeLocationExpand) {
      dispatch(GetAllOfficeLocationData());
    }
    if (manageHolidayExpand) {
      dispatch(GetAllHolidays());
    }
    if (domineExpand) {
      dispatch(GetAllDomines());
    }
    if (clientDetailsExpand) {
      dispatch(GatAllClinetDetails());
    }
    if (clientOfficeLocationExpand) {
      dispatch(GetAllOnsiteOfficeLocation());
    }

    dispatch(getAllCountry({ parentId: 0, dataType: "country" }));
    dispatch(getLoocations());
  }, [
    designationExpand,
    officeLocationExpand,
    bandExpand,
    skillExpand,
    manageHolidayExpand,
    domineExpand,
    jobTypeExpand,
    clientDetailsExpand,
    clientOfficeLocationExpand,
  ]);

  const handleAdd = (type) => {
    setDialogTitle(`${type}`);
    if (type === "officeLocation") {
      setOpen(true);
      setChangeDataType("officeLocation");
    } else if (type === "band") {
      setBandDialog(true);
      setChangeDataType(type);
    } else if (type === "holiday") {
      setHolidayDialog(true);
      setEdit(false);
      setChangeDataType(type);
    } else if (type === "clinetDetails") {
      setClientDialog(true);
      setChangeDataType(type);
    } else if (type === "clientOfficeLocation") {
      setClientLocationDialog(true);
      setChangeDataType(type);
    } else {
      setDialog(true);
    }
  };
  const handleOfficeChange = async (field, data, value) => {
    setOfficeData((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));

    if (field === "phoneNumber") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        phoneNumber: data,
      }));
    }
    if (field === "country") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        countryId: value?.id,
      }));
      setCountryCode(value?.code);
      if (value?.id) {
        await dispatch(
          getAllState({ parentId: value?.id || "", dataType: "state" })
        );
      }
    } else if (field === "state") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        stateId: value?.id,
      }));
      if (value?.id) {
        await dispatch(
          GetAllCitys({ parentId: value?.id || "", dataType: "city" })
        );
      }
    } else if (field === "city") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        cityId: value?.id,
      }));
    }
  };

  const handleClinetDetails = async (field, data, value) => {
    setClinetDetails((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));

    if (field === "country") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        countryId: value?.id,
      }));
      await dispatch(
        getAllState({ parentId: value?.id || "", dataType: "state" })
      );
    }
    if (field === "state") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        stateId: value?.id,
      }));
      dispatch(GetAllCitys({ parentId: value?.id || "", dataType: "city" }));
    }
    if (field === "city") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        cityId: value?.id,
      }));
    }
  };

  const handleOnsiteLocation = async (field, data, value) => {
    setClientLocationData((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));

    if (field === "countryId") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        countryId: value?.id,
      }));
      await dispatch(
        getAllState({ parentId: value?.id || "", dataType: "state" })
      );
    }
    if (field === "state") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        stateId: value?.id,
      }));
      dispatch(GetAllCitys({ parentId: value?.id || "", dataType: "city" }));
    }
    if (field === "city") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        cityId: value?.id,
      }));
    }
  };

  const hnadleBandChnage = (field, data) => {
    setBandFormData((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));
  };

  const handleHolidayChnage = (field, data) => {
    setHolidayFormData((prevFormData) => ({
      ...prevFormData,
      [field]: data,
    }));
  };

  const handleSubmit = async (type, id, status) => {
    const validationErrors = validateForm(type);

    if (Object.keys(validationErrors).length == 0) {
      setErrors({});
      try {
        if (type === "Skill") {
          const payload = {
            skillId: id ? id : "",
            skillName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateSkillData(payload));
          await dispatch(GetAllSkillData());
          setValue("");
        } else if (type === "Job Type") {
          const payload = {
            jobId: id ? id : "",
            jobType: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateJobTypeData(payload));
          await dispatch(GetAllJobTypeData());
          setValue("");
        } else if (type === "band") {
          const payload = {
            bandId: id ? id : "",
            bandName: bandFormData.bandName,
            minimumCtc: bandFormData.minimumCtc,
            maximumCtc: bandFormData.maximumCtc,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateBandlData(payload));
          await dispatch(GetAllBandData());
        } else if (type === "Designation") {
          const payload = {
            designationId: id ? id : "",
            designationName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateDesignationData(payload));
          await dispatch(GetAllDesignationData());
        } else if (type === "officeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: officeData.phone,
            address: {
              name: officeData.officeAddress,
              addressLine1: officeData.addressLine1,
              addressLine2: officeData.addressLine2,
              postalCode: officeData.postalCode,
              countryId: officeData.countryId,
              stateId: officeData.stateId,
              cityId: officeData.cityId,
            },
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateOfficeLocationnData(payload));
          await dispatch(GetAllOfficeLocationData());
        } else if (type === "holiday") {
          const payload = {
            id: id ? id : "",
            date: selectedDate,
            holidayType: holidayFormData.holidayType,
            name: holidayFormData.holidayName,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateManageHoliday(payload));
          await dispatch(GetAllHolidays());
        } else if (type === "Domine") {
          const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateDomine(payload));
          await dispatch(GetAllDomines());
        } else if (type === "clinetDetails") {
          const payload = {
            clientId: id ? id : "",
            clientName: clinetDetails.clinetName,
            phone: clinetDetails.phone,
            address: {
              name: clinetDetails.clinetName,
              addressLine1: clinetDetails.addressLine1,
              addressLine2: clinetDetails.addressLine2,
              postalCode: clinetDetails.postalCode,
              countryId: clinetDetails.countryId,
              stateId: clinetDetails.stateId,
              cityId: clinetDetails.cityId,
            },
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateClinetDetails(payload));
          await dispatch(GatAllClinetDetails());
        } else if (type === "clientOfficeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: clientLocationData.phone,
            address: {
              name: clientLocationData.addressName,
              addressLine1: clientLocationData.addressLine1,
              addressLine2: clientLocationData.addressLine2,
              postalCode: clientLocationData.postalCode,
              countryId: clientLocationData.countryId,
              stateId: clientLocationData.stateId,
              cityId: clientLocationData.cityId,
            },
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateOnsiteOfficeLocation(payload));
          await dispatch(GetAllOnsiteOfficeLocation());
        }
      } finally {
        handleCloseDialog();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleUpdate = async (type, id, status) => {
    const validationErrors = validateForm(type);
    if (Object.keys(validationErrors).length == 0) {
      setErrors({});
      try {
        if (type === "Skill") {
          const payload = {
            skillId: id ? id : "",
            skillName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateSkillData(payload));
          await dispatch(GetAllSkillData());
          setValue("");
        } else if (type === "band") {
          const payload = {
            bandId: id ? id : "",
            bandName: bandFormData.bandName,
            minimumCtc: bandFormData.minimumCtc,
            maximumCtc: bandFormData.maximumCtc,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateBandlData(payload));
          await dispatch(GetAllBandData());
        } else if (type === "Designation") {
          const payload = {
            designationId: id ? id : "",
            designationName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateDesignationData(payload));
          await dispatch(GetAllDesignationData());
        } else if (type === "officeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: officeData.phone,
            address: {
              name: officeData.addressName,
              addressLine1: officeData.addressLine1,
              addressLine2: officeData.addressLine2,
              postalCode: officeData.postalCode,
              countryId: officeData.countryId,
              stateId: officeData.stateId,
              cityId: officeData.cityId,
              type: officeData.type || "",
            },
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateOfficeLocationnData(payload));
          await dispatch(GetAllOfficeLocationData());
        } else if (type === "holiday") {
          const payload = {
            id: id ? id : "",
            date: selectedDate,
            holidayType: holidayFormData.holidayType,
            name: holidayFormData.holidayName,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateManageHoliday(payload));
          await dispatch(GetAllHolidays());
        } else if (type === "domine") {
          const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateDomine(payload));
          await dispatch(GetAllDomines());
        } else if (type === "jobType") {
          const payload = {
            jobId: id ? id : "",
            jobType: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateJobType(payload));
          await dispatch(GetAllJobTypeData());
          setValue("");
        } else if (type === "clinetDetails") {
          const payload = {
            clinetId: id ? id : "",
            clinetName: clinetDetails.clinetName,
            phone: clinetDetails.phone,
            address: {
              addressId: clientDetails.addressId,
              name: clinetDetails.addressName,
              addressLine1: clinetDetails.addressLine1,
              addressLine2: clinetDetails.addressLine2,
              postalCode: clinetDetails.postalCode,
              countryId: clinetDetails.countryId,
              stateId: clinetDetails.stateId,
              cityId: clinetDetails.cityId,
            },
          };
          await dispatch(UpdateClinetDetails(payload));
          await dispatch(GatAllClinetDetails());
        } else if (type === "clientOfficeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: clientLocationData.phone,
            address: {
              name: clientLocationData.addressName,
              addressLine1: clientLocationData.addressLine1,
              addressLine2: clientLocationData.addressLine2,
              postalCode: clientLocationData.postalCode,
              countryId: clientLocationData.countryId,
              stateId: clientLocationData.stateId,
              cityId: clientLocationData.cityId,
            },
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateOnsiteOfficeLocation(payload));
          await dispatch(GetAllOnsiteOfficeLocation());
        }
      } finally {
        handleCloseDialog();
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (type) => {
    const errors = {};

    if (type === "officeLocation") {
      if (!officeData.officeAddress) {
        errors.officeAddress = "Office name is a mandatory field.";
      }
      if (!officeData.phone) {
        errors.phoneNumber = "Phone number required";
      }

      if (!officeData.countryId) {
        errors.country = "Please select Country";
      }

      if (!officeData.stateId) {
        errors.state = "Please select State";
      }

      if (!officeData.cityId) {
        errors.city = "Please select City";
      }
      if (!officeData.addressLine1) {
        errors.addressLine1 = "please add Address";
      }

      if (!officeData.addressLine2) {
        errors.addressLine2 = "please add Address";
      }

      if (!officeData.postalCode) {
        errors.postalCode = "Postal code is required";
      } else {
        try {
          const isValid = postcodeValidator(
            officeData.postalCode,
            countyCode || countryCode[officeData.countryId]
          );
          if (!isValid) {
            errors.postalCode = "Invalid postal code";
          }
        } catch {
          errors.postalCode = "Error validating postal code";
        }
      }
    }
    if (
      type === "Skill" ||
      type === "Designation" ||
      type === "Domine" ||
      type === "Job Type"
    ) {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        errors.value = `${type} should only contain letters and spaces`;
      }
      if (!value.trim()) {
        errors.value = `${type} name is a mandatory field.`;
      }
    }
    if (type === "band") {
      if (!bandFormData.bandName) {
        errors.bandName = "please enter BandName";
      }
      if (!bandFormData.minimumCtc) {
        errors.minimum = "please enter mainimum Ctc";
      }
      const maximumCtc = parseFloat(bandFormData.maximumCtc);
      const minimumCtc = parseFloat(bandFormData.minimumCtc);
      if (!bandFormData.maximumCtc) {
        errors.maximum = "Please enter maximum Ctc";
      } else if (maximumCtc <= minimumCtc) {
        errors.maximum = "Maximum Ctc should be greater than minimum Ctc";
      }
    }
    if (type === "holiday") {
      if (!holidayFormData.holidayName) {
        errors.holidayName = "please enter holidayName";
      }
      if (!holidayFormData.holidayType) {
        errors.holidayType = "please enter holidayType";
      }
      if (!selectedDate) {
        errors.holidayDate = "Please Select date";
      }
    }
    if (type === "clinetDetails") {
      if (!clinetDetails.addressLine1) {
        errors.addressLine1 = "please add Address";
      }
      if (!clinetDetails.addressLine2) {
        errors.addressLine2 = "please add Address";
      }
      if (!clinetDetails.cityId) {
        errors.cityId = "please select city";
      }
      if (!clinetDetails.countryId) {
        errors.countryId = "please select country";
      }
      if (!clinetDetails.stateId) {
        errors.stateId = "please select state";
      }
      if (!clinetDetails.postalCode) {
        errors.postalCode = "Postal code is required";
      } else {
        try {
          const isValid = postcodeValidator(
            clinetDetails.postalCode,
            countyCode || countryCode[clinetDetails.countryId]
          );
          if (!isValid) {
            errors.postalCode = "Invalid postal code";
          }
        } catch {
          errors.postalCode = "Error validating postal code";
        }
      }
      if (!clinetDetails.clinetName) {
        errors.clinetName = "please add ClientName";
      }
      if (!clinetDetails.phone) {
        errors.phone = "please add phoneNumber";
      }
    }
    if (type === "clientOfficeLocation") {
      if (!clientLocationData.addressLine1) {
        errors.addressLine1 = "please add Address";
      }
      if (!clientLocationData.addressLine2) {
        errors.addressLine2 = "please add Address";
      }
      if (!clientLocationData.cityId) {
        errors.cityId = "please select city";
      }
      if (!clientLocationData.countryId) {
        errors.countryId = "please select country";
      }
      if (!clientLocationData.stateId) {
        errors.stateId = "please select state";
      }
      if (!clientLocationData.postalCode) {
        errors.postalCode = "Postal code is required";
      } else {
        try {
          const isValid = postcodeValidator(
            clientLocationData.postalCode,
            countyCode || countryCode[clientLocationData.countryId]
          );
          if (!isValid) {
            errors.postalCode = "Invalid postal code";
          }
        } catch {
          errors.postalCode = "Error validating postal code";
        }
      }
      if (!clientLocationData.addressName) {
        errors.clinetName = "please add ClientName";
      }
      if (!clientLocationData.phone) {
        errors.phone = "please add phoneNumber";
      }
    }

    return errors;
  };
  return (
    <>
      <MasterDataPage
        handleBack={handleBack}
        handleExpand={handleExpand}
        designationExpand={designationExpand}
        handleAdd={handleAdd}
        designationData={designationData}
        handleDesignation={handleDesignation}
        skillExpand={skillExpand}
        skillData={skillData}
        officeLocationExpand={officeLocationExpand}
        officeLocationData={officeLocationData}
        DataValue={DataValue}
        bandExpand={bandExpand}
        bandData={bandData}
        clientOfficeLocationExpand={clientOfficeLocationExpand}
        onsiteLocationData={onsiteLocationData}
        jobTypeExpand={jobTypeExpand}
        jobTypeData={jobTypeData}
        manageHolidayExpand={manageHolidayExpand}
        holidayData={holidayData}
        clientDetailsExpand={clientDetailsExpand}
        clinetData={clinetData}
        domineData={domineData}
        domineExpand={domineExpand}
      />
      <MasterDataDialogs
        openDialog={openDialog}
        dialog={dialog}
        open={open}
        enable={enable}
        isOpenCalender={isOpenCalender}
        bandDialog={bandDialog}
        holidayDialog={holidayDialog}
        desginationEdit={desginationEdit}
        desginationDisable={desginationDisable}
        clientDialog={clientDialog}
        clientLocationDialog={clientLocationDialog}
        dialogTitle={dialogTitle}
        changeData={changeData}
        chnageDataType={chnageDataType}
        errors={errors}
        country={country}
        state={state}
        city={city}
        ActionList={ActionList}
        handleDisable={handleDisable}
        handleAddDesignationCancle={handleAddDesignationCancle}
        handleOfficeChange={handleOfficeChange}
        handleClinetDetails={handleClinetDetails}
        handleOnsiteLocation={handleOnsiteLocation}
        hnadleBandChnage={hnadleBandChnage}
        handleHolidayChnage={handleHolidayChnage}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        chnageDataId={chnageDataId}
        handleCloseDialog={handleCloseDialog}
        clientLocationData={clientLocationData}
        edit={edit}
        officeData={officeData}
        clinetDetails={clinetDetails}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        value={value}
        setValue={setValue}
        handleEditDesignation={handleEditDesignation}
        handlechange={handlechange}
        bandFormData={bandFormData}
        setIsOpenCalender={setIsOpenCalender}
        holidayFormData={holidayFormData}
        holidayType={holidayType}
        handleFileChange={handleFileChange}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
}
