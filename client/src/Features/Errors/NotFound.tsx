import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // 1. Import Link from react-router-dom

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
      }}
    >
      <SearchOff sx={{ fontSize: 100, color: "primary.main" }} /> {/* 2. Fixed color string */}
      
      <Typography gutterBottom variant="h3">
        Ooops - we could not find what you are looking for
      </Typography>

      {/* 3. Pass RouterLink to the component prop */}
      <Button component={RouterLink} to='/activities' variant="contained" sx={{ mt: 2 }}>
        Return to the activities page
      </Button>
    </Paper>
  );
}