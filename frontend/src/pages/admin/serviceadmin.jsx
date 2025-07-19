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
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f0f2f5",
        }}
      >
        <Typography variant="h5" color="primary">
          Loading service data...
        </Typography>
      </Box>
    );
  }

  const data = serviceAdminData[0];

  const renderContent = (content) =>
    content.map((block) => {
      switch (block.type) {
        case "title":
          return (
            <Typography
              key={block._id}
              variant="h4"
              fontWeight="700"
              color="#3f51b5"
              gutterBottom
              sx={{ mt: 3 }}
            >
              {block.value}
            </Typography>
          );
        case "subtitle":
          return (
            <Typography
              key={block._id}
              variant="h6"
              color="#5c6bc0"
              fontWeight="600"
              gutterBottom
              sx={{ mt: 2 }}
            >
              {block.value}
            </Typography>
          );
        case "text":
          return (
            <Typography
              key={block._id}
              variant="body1"
              color="#333"
              sx={{ my: 2, lineHeight: 1.7, textAlign: "justify" }}
            >
              {block.value}
            </Typography>
          );
        case "image":
          return (
            <Box
              key={block._id}
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={block.value}
                alt="service"
                sx={{
                  width: "100%",
                  maxWidth: 600,
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 8px 20px rgba(63, 81, 181, 0.3)",
                }}
              />
            </Box>
          );

        default:
          return null;
      }
    });

  const renderSchedule = (schedules) => (
    <Paper
      elevation={8}
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 4,
        bgcolor: "#e8eaf6",
        boxShadow: "0 12px 24px rgba(63,81,181,0.15)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="700"
        color="#3949ab"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 3 }}
      >
        <CalendarToday sx={{ mr: 1.5, fontSize: 30 }} /> Availability & Charges
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {schedules.map((sch) => (
        <Box key={sch._id} sx={{ mb: 5 }}>
          <Chip
            label={`Service Charge: ₹${sch.serviceCharge}`}
            color="secondary"
            sx={{
              fontWeight: "700",
              fontSize: "1.1rem",
              px: 2,
              py: 1,
              mb: 2,
              boxShadow: "0 4px 10px rgba(156,39,176,0.3)",
            }}
          />
          <Table
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#673ab7",
                }}
              >
                <TableCell
                  sx={{ color: "white", fontWeight: "700", fontSize: 16 }}
                >
                  Day
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "700", fontSize: 16 }}
                >
                  <AccessTime sx={{ verticalAlign: "middle", mr: 0.8 }} />
                  From
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "700", fontSize: 16 }}
                >
                  <AccessTime sx={{ verticalAlign: "middle", mr: 0.8 }} />
                  To
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sch.availability.map((slot, idx) => (
                <TableRow
                  key={slot._id}
                  sx={{
                    bgcolor: idx % 2 === 0 ? "#ede7f6" : "white",
                    "&:hover": { bgcolor: "#d1c4e9" },
                    cursor: "default",
                  }}
                >
                  <TableCell sx={{ fontWeight: "600" }}>{slot.day}</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>{slot.from}</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>{slot.to}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Edit />}
          sx={{
            fontWeight: "700",
            boxShadow: "0 6px 15px rgba(156,39,176,0.6)",
            "&:hover": {
              bgcolor: "#4a148c",
              boxShadow: "0 8px 20px rgba(106,27,154,0.8)",
            },
          }}
          onClick={() => {
            console.log("Edit Schedule Clicked");
          }}
        >
          Edit Schedule
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        bgcolor: "#ede7f6",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Hero Banner */}

      <Grid container justifyContent="center">
        <Box
          sx={{
            bgcolor: "#ede7f6",
            minHeight: "100vh",
            width: "100%",
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 8 },
          }}
        >
          <Card
            sx={{
              borderRadius: 5,

              p: { xs: 4, md: 6 },
              bgcolor: "#e8eaf6",
              boxShadow: "0 12px 24px rgba(63,81,181,0.15)",
              mb: 8,
            }}
          >
            <Typography
              variant="h5"
              color="#512da8"
              fontWeight="900"
              gutterBottom
              sx={{ mb: 4, letterSpacing: 1.2 }}
            >
              Service Type:{" "}
              <Box component="span" color="#7e57c2" fontWeight="700">
                {data.ServiceType}
              </Box>
            </Typography>

            {renderContent(data.content)}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 5,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                size="large"
                sx={{
                  fontWeight: "700",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 8px 30px rgba(63,81,181,0.5)",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#283593",
                    boxShadow: "0 10px 40px rgba(48,63,159,0.7)",
                  },
                }}
                onClick={() =>
                  navigate("/accountsetup/form", {
                    state: { blogId: data._id },
                  })
                }
              >
                Update Details
              </Button>
            </Box>
          </Card>

          {renderSchedule(data.schedules)}
        </Box>
      </Grid>
    </Box>
  );
};

export default ServiceAdmin;
