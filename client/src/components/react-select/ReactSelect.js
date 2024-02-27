import { Box, Button, Checkbox, FormControl } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Select, { components } from "react-select";

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>{children}</Box>
        <Checkbox color="primary" checked={isSelected} />
      </Box>
    </components.Option>
  );
};

const ReactSelect = (props) => {
  const dispatch = useDispatch();
  const CustomMenu = (props) => {
    const { innerProps, children } = props;
    const applySkillFilterHandler = () => {
      const getSkillId = props.handleOptionChange
        .map((item) => item.skillId)
        .join(",");
      const params = {
        query: searchData || "",
        skillIds: getSkillId,
      };
      dispatch(getAllocationSearch(params));
    };

    const onResetSkillFilterHandler = () => {
      setSkillsCheckedData([]);
    };
    return (
      <components.Menu {...props}>
        {children}
        <Box
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            right: 0,
            padding: "10px",
            background: "white",
            border: "1px solid lightgray",
            display: "flex",
            justifyContent: "space-between",
          }}
          {...innerProps}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={applySkillFilterHandler}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onResetSkillFilterHandler}
          >
            Reset
          </Button>
        </Box>
      </components.Menu>
    );
  };
  return (
    <FormControl style={{ marginLeft: "15px", width: "90%" }}>
      <Select
        isSearchable={false}
        isMulti
        closeMenuOnSelect={false}
        placeholder={props.placeholder}
        hideSelectedOptions={false}
        onChange={(selected) => props.setSkillsCheckedData(selected)}
        options={props.masterSkillData}
        value={props.skillsCheckedData}
        components={{
          Option: InputOption,
          Menu: CustomMenu,
        }}
        isClearable={false}
        controlShouldRenderValue={false}
        getOptionValue={(option) => option.skillId}
        getOptionLabel={(option) => option.skillName}
        isLoading={props.masterSkillData?.length === 0}
        styles={{
          placeholder: (base) => ({
            ...base,
            color: "white",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (baseStyles) => ({
            ...baseStyles,
            height: "55px",
            background: "#008080",
            color: "white !important",
          }),
        }}
      />
    </FormControl>
  );
};

export default ReactSelect;
