import { Box } from "@mui/material";
import BackgroundImage from "../../../public/auth_background.jpg";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={BackgroundImage}
        alt="배경 이미지"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default AuthLayout;
