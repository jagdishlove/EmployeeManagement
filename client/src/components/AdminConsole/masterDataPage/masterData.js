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

import { getAllCitysAction } from "../../../redux/actions/AdminConsoleAction/users/usersAction";

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
  const [file, setFile] = useState(null);
  const [editHeading, setEditHeading] = useState("");

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
    date: null,
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
    (state) => state?.persistData?.masterDataDetails?.skillData
  );

  const jobTypeData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.jobTypeData
  );

  const holidayType = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.holidayTypes
  );

  const designationData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.designationData
  );
  const bandData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.bandData
  );

  const officeLocationData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.officeLocationData
  );

  const officeLocation = useSelector(
    (state) => state?.persistData?.masterDataDetails?.officeLocation
  );

  const bandByID = useSelector(
    (state) => state?.persistData?.masterDataDetails.bandValue
  );

  const holidayData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.holidayData
  );

  const holiday = useSelector(
    (state) => state?.persistData?.masterDataDetails?.holiday
  );

  const domineData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.domineData
  );

  const country = useSelector(
    (state) => state?.persistData?.masterDataDetails?.countrydata
  );

  const state = useSelector(
    (state) => state?.persistData?.masterDataDetails?.statedata
  );

  const clinetData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.clientdata
  );

  const clientDetails1 = useSelector(
    (state) => state?.persistData?.masterDataDetails?.clientDetails
  );

  const LocationData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.LocationData
  );

  const onsiteLocationData = useSelector(
    (state) => state?.persistData?.masterDataDetails?.onsiteLocationData
  );

  const onsiteLocation = useSelector(
    (state) => state?.persistData?.masterDataDetails?.onsiteLocation
  );

  const DataValue = {};
  LocationData.forEach((location) => {
    DataValue[location.id] = location.dataValue;
  });

  const countryCode = {};
  LocationData.forEach((location) => {
    countryCode[location.id] = location.code;
  });

  const city = useSelector((state) => state?.persistData?.userDetails?.cities);
  localStorage.setItem("selectedTabIndex", 0);

  const handleBack = () => {
    navigate(-1);
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
    if (type === "domain") {
      setDomineExpand(!domineExpand);
    }
    if (type === "jobType") {
      setJobTypeExpand(!jobTypeExpand);
    }
  };

  useEffect(() => {
    if (officeLocation?.address?.countryId) {
      dispatch(
        getAllState({
          parentId: officeLocation?.address?.countryId,
          dataType: "state",
        })
      );
    }

    if (officeLocation?.address?.stateId) {
      dispatch(
        getAllCitysAction({
          parentId: officeLocation?.address?.stateId,
          dataType: "city",
        })
      );
    }
    dispatch(getAllCountry({ parentId: 0, dataType: "country" }));

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
        date: holiday.date || null,
        holidayName: holiday.name || "",
        holidayType: holiday.holidayType || "",
      });
    }
  }, [officeLocation, dispatch, bandByID, holiday]);

  useEffect(() => {
    if (onsiteLocation?.address?.countryId) {
      dispatch(
        getAllState({
          parentId: onsiteLocation?.address?.countryId,
          dataType: "state",
        })
      );
    }
    dispatch(getAllCountry({ parentId: 0, dataType: "country" }));

    if (onsiteLocation?.address?.stateId) {
      dispatch(
        getAllCitysAction({
          parentId: onsiteLocation?.address?.stateId,
          dataType: "city",
        })
      );
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
    }
    if (clientDetails1?.address?.countryId) {
      dispatch(
        getAllState({
          parentId: clientDetails1?.address?.countryId,
          dataType: "state",
        })
      );
    }
    dispatch(getAllCountry({ parentId: 0, dataType: "country" }));

    if (clientDetails1?.address?.stateId) {
      dispatch(
        getAllCitysAction({
          parentId: clientDetails1?.address?.stateId,
          dataType: "city",
        })
      );
    }
    if (clientDetails1) {
      setClinetDetails({
        clinetName: clientDetails1.clientName || "",
        addressLine1: clientDetails1.address?.addressLine1 || "",
        addressLine2: clientDetails1.address?.addressLine2 || "",
        postalCode: clientDetails1.address?.postalCode || "",
        countryId: clientDetails1.address?.countryId || "",
        stateId: clientDetails1.address?.stateId || "",
        cityId: clientDetails1.address?.cityId || "",
        type: clientDetails1.address?.type || "",
        addressId: clientDetails1.address?.addressId || "",
        phone: clientDetails1?.phone || "",
        clinetId: clientDetails1?.clientId || "",
      });
      setSelectedImage(
        `data:image/png;base64,${clientDetails1?.fileStorage?.data}`
      );
    }
  }, [onsiteLocation, clientDetails1]);

  const handlechange = (e) => {
    setValue(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
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
      setEditHeading(type);
      setValue(data);
    } else {
      setOpenDialog(true);
      setDesugnationEdit(false);
      setDesignationDisable(false);
      setChnageDataId(id);
      setChnageData(data);
      setChangeDataType(type);
      setValue(data);
      setEditHeading(type);
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
      date: null,
    });
    setErrors({});
    setClinetDetails("");
    setClientLocationData("");
    setClientLocationDialog(false);
    setValue("");
    setChangeDataType("");
    setChnageDataId("");
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

    setOpen(false);
    setHolidayDialog(false);
    setClientDialog(false);
    setClientLocationDialog(false);
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
      setHolidayFormData({});
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
    const id = value?.id;
    if (field === "phoneNumber") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        phone: data,
      }));
    } else if (field === "country") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        countryId: id,
        stateId: "",
        cityId: "",
      }));
      setCountryCode(value?.code);
      if (officeData.countryId || id) {
        await dispatch(getAllState({ parentId: id || "", dataType: "state" }));
      }
    } else if (field === "state") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        stateId: id,
        cityId: "",
      }));
      if (officeData.stateId || id) {
        await dispatch(
          getAllCitysAction({
            parentId: id || "",
            dataType: "city",
          })
        );
      }
    } else if (field === "city") {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        cityId: id,
      }));
    } else {
      setOfficeData((prevFormData) => ({
        ...prevFormData,
        [field]: data?.target?.value,
      }));
    }
  };

  const handleClinetDetails = async (field, data, value) => {
    const id = value?.id;
    if (field === "phoneNumber") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        phone: data,
      }));
    } else if (field === "country") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        countryId: id,
        stateId: "",
        cityId: "",
      }));
      setCountryCode(value?.code);
      await dispatch(getAllState({ parentId: id || "", dataType: "state" }));
    } else if (field === "state") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        stateId: id,
        cityId: "",
      }));
      dispatch(
        getAllCitysAction({
          parentId: id || "",
          dataType: "city",
        })
      );
    } else if (field === "city") {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        cityId: id,
      }));
    } else {
      setClinetDetails((prevFormData) => ({
        ...prevFormData,
        [field]: data.target.value,
      }));
    }
  };

  const handleOnsiteLocation = async (field, data, value) => {
    const id = value?.id;
    if (field === "phoneNumber") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        phone: data,
      }));
    } else if (field === "country") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        countryId: id,
        stateId: "",
        cityId: "",
      }));
      setCountryCode(value?.code);
      await dispatch(getAllState({ parentId: id || "", dataType: "state" }));
    } else if (field === "state") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        stateId: id,
        cityId: "",
      }));
      dispatch(
        getAllCitysAction({
          parentId: id || "",
          dataType: "city",
        })
      );
    } else if (field === "city") {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        cityId: id,
      }));
    } else {
      setClientLocationData((prevFormData) => ({
        ...prevFormData,
        [field]: data.target.value,
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
    if (field === "date") {
      const formattedDate = data.format("YYYY-MM-DD");

      setHolidayFormData((prevFormData) => ({
        ...prevFormData,
        date: formattedDate,
      }));
    } else {
      setHolidayFormData((prevFormData) => ({
        ...prevFormData,
        [field]: data,
      }));
    }
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
          await dispatch(CreateSkillData(payload, handleCloseDialog));
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
          await dispatch(CreateJobTypeData(payload, handleCloseDialog));
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
          await dispatch(CreateDesignationData(payload, handleCloseDialog));
          await dispatch(GetAllDesignationData());
        } else if (type === "officeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: officeData.phone,
            address: {
              addressId: officeData.addressId ? officeData.addressId : "",
              addressLine1: officeData.addressLine1,
              addressLine2: officeData.addressLine2,
              postalCode: officeData.postalCode,
              countryId: officeData.countryId,
              stateId: officeData.stateId,
              cityId: officeData.cityId,
            },
          };
          if (officeData.officeAddress) {
            payload.address.name = officeData.officeAddress;
          }
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateOfficeLocationnData(payload, handleCloseDialog));
          await dispatch(GetAllOfficeLocationData());
        } else if (type === "holiday") {
          const payload = {
            id: id ? id : "",
            date: holidayFormData.date,
            holidayType: holidayFormData.holidayType,
            name: holidayFormData.holidayName,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateManageHoliday(payload, handleCloseDialog));
          await dispatch(GetAllHolidays());
        } else if (type === "Domain") {
          const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateDomine(payload, handleCloseDialog));
          await dispatch(GetAllDomines());
        } else if (type === "clinetDetails") {
          const payload = {
            clientId: id ? id : "",
            file: file ? file : "",
            clientName: clinetDetails.clinetName,
            phone: clinetDetails.phone,
            "address.name": clinetDetails.clinetName,
            "address.addressLine1": clinetDetails.addressLine1,
            "address.addressLine2": clinetDetails.addressLine2,
            "address.postalCode": clinetDetails.postalCode,
            "address.countryId": clinetDetails.countryId,
            "address.cityId": clinetDetails.cityId,
            "address.stateId": clinetDetails.stateId,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(CreateClinetDetails(payload, handleCloseDialog));
          await dispatch(GatAllClinetDetails());
        } else if (type === "clientOfficeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: clientLocationData.phone,
            address: {
              name: clientLocationData.addressName,
              addressId: clientLocationData.addressId,
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
          await dispatch(CreateOnsiteOfficeLocation(payload, handleCloseDialog));
          await dispatch(GetAllOnsiteOfficeLocation());
        }
      } finally {
        console.log("object");
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
          await dispatch(UpdateSkillData(payload, handleCloseDialog));
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
          await dispatch(UpdateBandlData(payload, ));
          await dispatch(GetAllBandData());
        } else if (type === "Designation") {
          const payload = {
            designationId: id ? id : "",
            designationName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateDesignationData(payload, handleCloseDialog));
          await dispatch(GetAllDesignationData());
        } else if (type === "officeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: officeData.phone,
            address: {
              addressId: officeData.addressId ? officeData.addressId : "",

              name: officeData.addressName,
              addressLine1: officeData.addressLine1,
              addressLine2: officeData.addressLine2,
              postalCode: officeData.postalCode,
              countryId: officeData.countryId,
              stateId: officeData.stateId,
              cityId: officeData.cityId,
            },
          };
          if (officeData.officeAddress) {
            payload.address.name = officeData.officeAddress;
          }
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateOfficeLocationnData(payload, handleCloseDialog));
          await dispatch(GetAllOfficeLocationData());
        } else if (type === "holiday") {
          const payload = {
            id: id ? id : "",
            date: holidayFormData.date,
            holidayType: holidayFormData.holidayType,
            name: holidayFormData.holidayName,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateManageHoliday(payload, handleCloseDialog));
          await dispatch(GetAllHolidays());
        } else if (type === "Domain") {
          const payload = {
            domainId: id ? id : "",
            domainName: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateDomine(payload, handleCloseDialog));
          await dispatch(GetAllDomines());
        } else if (type === "Job Type") {
          const payload = {
            jobId: id ? id : "",
            jobType: value,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateJobType(payload, handleCloseDialog));
          await dispatch(GetAllJobTypeData());
          setValue("");
        } else if (type === "clinetDetails") {
          const payload = {
            clientId: id ? id : "",
            file: file ? file : "",
            clientName: clinetDetails.clinetName,
            phone: clinetDetails.phone,
            "address.id": clinetDetails.addressId,
            "address.addressLine1": clinetDetails.addressLine1,
            "address.addressLine2": clinetDetails.addressLine2,
            "address.postalCode": clinetDetails.postalCode,
            "address.countryId": clinetDetails.countryId,
            "address.cityId": clinetDetails.cityId,
            "address.stateId": clinetDetails.stateId,
          };
          if (status) {
            payload.status = status;
          }
          await dispatch(UpdateClinetDetails(payload, handleCloseDialog));
          await dispatch(GatAllClinetDetails());
        } else if (type === "clientOfficeLocation") {
          const payload = {
            locationId: id ? id : "",
            phoneNumber: clientLocationData.phone,
            address: {
              name: clientLocationData.addressName,
              addressId: clientLocationData.addressId,
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
          await dispatch(UpdateOnsiteOfficeLocation(payload, handleCloseDialog));
          await dispatch(GetAllOnsiteOfficeLocation());
        }
      } finally {
        console.log("object");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (type) => {
    const errors = {};

    if (type === "officeLocation") {
      if (!officeData.officeAddress) {
        errors.officeAddress = "Office name is mandatory";
      }
      if (!officeData.phone) {
        errors.phoneNumber = "Please add a phone number";
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
        errors.addressLine1 = "Please add address";
      }

      if (!officeData.addressLine2) {
        errors.addressLine2 = "Please add address";
      }

      if (!officeData.postalCode) {
        errors.postalCode = "Postal code is mandatory";
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
    if (type === "Designation" || type === "Domain" || type === "Job Type") {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        errors.value = `${type} should only contain letters and spaces`;
      }
      if (!value.trim()) {
        errors.value = `${type} name is mandatory.`;
      }
    }
    if (type === "Skill") {
      if (!value.trim()) {
        errors.value = `${type} name is mandatory.`;
      }
    }
    if (type === "band") {
      if (!bandFormData.bandName) {
        errors.bandName = "Please enter BandName";
      }
      if (!bandFormData.minimumCtc) {
        errors.minimum = "Please enter mainimum Ctc";
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
        errors.holidayName = "Please enter holiday name.";
      }
      if (!holidayFormData.holidayType) {
        errors.holidayType = "Please enter holiday type.";
      }
      if (!holidayFormData.date) {
        errors.date = "Please choose a date.";
      }
    }
    if (type === "clinetDetails") {
      if (!clinetDetails.addressLine1) {
        errors.addressLine1 = "Please add Address";
      }
      if (!clinetDetails.addressLine2) {
        errors.addressLine2 = "Please add Address";
      }
      if (!clinetDetails.cityId) {
        errors.cityId = "Please select city";
      }
      if (!clinetDetails.countryId) {
        errors.countryId = "Please select country";
      }
      if (!clinetDetails.stateId) {
        errors.stateId = "Please select state";
      }
      if (!clinetDetails.postalCode) {
        errors.postalCode = "Postal code is mandatory";
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
        errors.clinetName = "Please add client name";
      }
      if (!clinetDetails.phone) {
        errors.phone = "Please add a phone number";
      }
    }
    if (type === "clientOfficeLocation") {
      if (!clientLocationData.addressLine1) {
        errors.addressLine1 = "please add Address";
      }
      if (!clientLocationData.addressLine2) {
        errors.addressLine2 = "Please add Address";
      }
      if (!clientLocationData.cityId) {
        errors.cityId = "Please select city";
      }
      if (!clientLocationData.countryId) {
        errors.countryId = "Please select country";
      }
      if (!clientLocationData.stateId) {
        errors.stateId = "Please select state";
      }
      if (!clientLocationData.postalCode) {
        errors.postalCode = "Postal code is mandatory";
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
        errors.clinetName = "Please add client name";
      }
      if (!clientLocationData.phone) {
        errors.phone = "Please add a phone number";
      }
    }

    return errors;
  };

  localStorage.removeItem("selectedProject");
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
        editHeading={editHeading}
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
