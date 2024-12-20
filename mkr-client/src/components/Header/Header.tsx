import { Typography, Box } from "@mui/material";
import { FC } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Box minWidth="350px" height="150px">
      <Typography variant="h2" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
