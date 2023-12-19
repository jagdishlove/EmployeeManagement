import { useTheme } from "@mui/material/styles";
import { SubHeaderStyle } from "./subHeaderStyle";
import { Box } from "@mui/material";

const SubHeader = ({ children }) => {
  const theme = useTheme();
  const style = SubHeaderStyle(theme);

  return <Box style={style.subHeader_container}>{children}</Box>;
};

export default SubHeader;
