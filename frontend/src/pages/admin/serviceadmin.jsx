import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Fade,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import { AccessTime, CalendarToday, Edit } from "@mui/icons-material";

const ServiceAdmin = () => {
  const { fetchServiceAdminData, serviceAdminData } = useAdminStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceAdminData();
  }, [fetchServiceAdminData]);

  if (!serviceAdminData || serviceAdminData.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Loading service data...</Typography>
      </Box>
    );
  }

  const data = serviceAdminData[0];

  const renderContent = (content) => {
    return content.map((block) => {
      switch (block.type) {
        case "title":
          return (
            <Fade in key={block._id} timeout={500}>
              <Box sx={{ my: 2 }}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{
                    color: "#1a237e",
                    fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
                    wordBreak: "break-word",
                  }}
                >
                  {block.value}
                </Typography>
              </Box>
            </Fade>
          );
        case "subtitle":
          return (
            <Fade in key={block._id} timeout={500}>
              <Box sx={{ my: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    color: "#455a64",
                    fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                    wordBreak: "break-word",
                  }}
                >
                  {block.value}
                </Typography>
              </Box>
            </Fade>
          );
        case "text":
          return (
            <Fade in key={block._id} timeout={500}>
              <Box sx={{ my: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    color: "#424242",
                    lineHeight: 1.7,
                    textAlign: "justify",
                    wordBreak: "break-word",
                  }}
                >
                  {block.value}
                </Typography>
              </Box>
            </Fade>
          );
        case "image":
          return (
            <Fade in key={block._id} timeout={500}>
              <Box
                sx={{
                  my: 3,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={block.value}
                  alt="service-img"
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    height: { xs: 200, sm: 300, md: 350 },
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </Box>
            </Fade>
          );
        default:
          return null;
      }
    });
  };

  const renderSchedule = (schedules) => {
    return (
      <Paper elevation={3} sx={{ mt: 4, overflowX: "auto", p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          <CalendarToday sx={{ mr: 1, verticalAlign: "middle" }} />
          Availability & Charges
        </Typography>
        <Divider />
        {schedules.map((sch) => (
          <Box key={sch._id} sx={{ mt: 2 }}>
            <Chip
              label={`Service Charge: ₹${sch.serviceCharge}`}
              color="primary"
              sx={{ mb: 2 }}
            />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>
                    <AccessTime sx={{ mr: 1, verticalAlign: "middle" }} />
                    From
                  </TableCell>
                  <TableCell>
                    <AccessTime sx={{ mr: 1, verticalAlign: "middle" }} />
                    To
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sch.availability.map((slot) => (
                  <TableRow key={slot._id}>
                    <TableCell>{slot.day}</TableCell>
                    <TableCell>{slot.from}</TableCell>
                    <TableCell>{slot.to}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            color="primary"
            size="small"
            onClick={() => {
              console.log("Edit Schedule Clicked");
            }}
          >
            Edit Schedule
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={11} md={10} lg={9}>
          <Card elevation={6}>
            <CardContent>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                }}
              >
                Service Type:{" "}
                <Box component="span" fontWeight="bold" color="#1976d2">
                  {data.ServiceType}
                </Box>
              </Typography>

              <Divider sx={{ my: 2 }} />

              {renderContent(data.content)}

              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  color="primary"
                  size="small"
                  onClick={() => {
                    navigate("/accountsetup/form", {
                      state: { blogId: data._id },
                    });
                  }}
                >
                  Update Details
                </Button>
              </Box>

              {renderSchedule(data.schedules)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceAdmin;
