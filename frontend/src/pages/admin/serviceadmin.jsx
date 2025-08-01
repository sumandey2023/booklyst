import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Button,
  IconButton,
  Container,
  Stack,
  Avatar,
  Fade,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import {
  AccessTime,
  CalendarToday,
  Edit,
  Delete,
  Add,
  Phone,
  Schedule,
  Settings,
  BusinessCenter,
} from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ServiceAdmin = () => {
  const { fetchServiceAdminData, serviceAdminData, updatePhoneNumbers } =
    useAdminStore();
  const navigate = useNavigate();
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    fetchServiceAdminData();
  }, [fetchServiceAdminData, updatePhoneNumbers]);

  useEffect(() => {
    if (serviceAdminData?.[0]?.phNo) {
      setPhoneNumbers(serviceAdminData[0].phNo);
    }
  }, [serviceAdminData]);

  if (!serviceAdminData || serviceAdminData.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Card
            sx={{
              p: 6,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <Skeleton variant="circular" width={80} height={80} />
              <Stack spacing={1}>
                <Skeleton variant="text" width={300} height={40} />
                <Skeleton variant="text" width={200} height={24} />
              </Stack>
            </Stack>
          </Card>
        </Container>
      </Box>
    );
  }

  const data = serviceAdminData[0];

  const handleAddPhone = async () => {
    try {
      const trimmed = newPhone.trim();
      if (!trimmed || phoneNumbers.includes(trimmed)) return;

      const updated = [...phoneNumbers, trimmed];
      setPhoneNumbers(updated);
      await updatePhoneNumbers(updated);

      setNewPhone("");
    } catch (err) {
      console.error("Error adding phone number:", err);
      alert(
        "❌ Failed to add phone number. Please check the format or try again."
      );
    }
  };

  const handleDeletePhone = async (phone) => {
    try {
      const updated = phoneNumbers.filter((p) => p !== phone);
      setPhoneNumbers(updated);
      await updatePhoneNumbers(updated);

      await fetchServiceAdminData();
    } catch (err) {
      console.error("Error deleting phone number:", err);
      alert("❌ Failed to delete phone number.");
    }
  };

  const renderPhoneSection = () => (
    <Fade in timeout={800}>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            p: 3,
            color: "white",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                width: 48,
                height: 48,
              }}
            >
              <Phone />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600">
                Contact Numbers
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Manage your service contact information
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: 3 }}>
          {phoneNumbers.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                color: "text.secondary",
              }}
            >
              <Phone sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                No phone numbers added yet
              </Typography>
              <Typography variant="body2">
                Add your first contact number below
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2} sx={{ mb: 3 }}>
              {phoneNumbers.map((phone, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.200",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Phone sx={{ mr: 2, color: "primary.main", fontSize: 20 }} />
                  <Typography
                    sx={{
                      flex: 1,
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {phone}
                  </Typography>
                  <IconButton
                    onClick={() => handleDeletePhone(phone)}
                    size="small"
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        bgcolor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="end"
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Add New Number
              </Typography>
              <PhoneInput
                country={"in"}
                value={newPhone}
                onChange={(phone) => setNewPhone(phone)}
                inputStyle={{
                  height: 48,
                  width: "100%",
                  borderRadius: 8,
                  border: "2px solid #e0e0e0",
                  fontSize: 16,
                  background: "#fafafa",
                  transition: "all 0.2s ease",
                }}
                containerStyle={{
                  width: "100%",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleAddPhone}
              startIcon={<Add />}
              sx={{
                height: 48,
                px: 3,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(102, 126, 234, 0.6)",
                },
              }}
            >
              Add Number
            </Button>
          </Stack>
        </Box>
      </Card>
    </Fade>
  );

  const renderContent = (content) =>
    content.map((block) => {
      switch (block.type) {
        case "title":
          return (
            <Typography
              key={block._id}
              variant="h4"
              fontWeight="700"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {block.value}
            </Typography>
          );
        case "subtitle":
          return (
            <Typography
              key={block._id}
              variant="h6"
              color="text.primary"
              fontWeight="600"
              gutterBottom
              sx={{ mt: 2, mb: 1 }}
            >
              {block.value}
            </Typography>
          );
        case "text":
          return (
            <Typography
              key={block._id}
              variant="body1"
              color="text.secondary"
              sx={{
                my: 2,
                lineHeight: 1.7,
                textAlign: "justify",
                fontSize: "1.1rem",
              }}
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
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Box>
          );
        default:
          return null;
      }
    });

  const renderSchedule = (schedules) => (
    <Fade in timeout={1200}>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)",
            p: 3,
            color: "white",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                width: 48,
                height: 48,
              }}
            >
              <Schedule />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600">
                Service Schedule & Pricing
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Availability times and service charges
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ p: 3 }}>
          {schedules.map((sch, index) => (
            <Box
              key={sch._id}
              sx={{ mb: index === schedules.length - 1 ? 0 : 4 }}
            >
              <Box sx={{ mb: 3, textAlign: "center" }}>
                <Chip
                  label={`Service Charge: ₹${sch.serviceCharge}`}
                  sx={{
                    background:
                      "linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    py: 0.5,
                    height: 40,
                    boxShadow: "0 4px 12px rgba(255, 154, 86, 0.4)",
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "1rem",
                          py: 2,
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarToday fontSize="small" />
                          <span>Day</span>
                        </Stack>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "1rem",
                          py: 2,
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccessTime fontSize="small" />
                          <span>From</span>
                        </Stack>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: "1rem",
                          py: 2,
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccessTime fontSize="small" />
                          <span>To</span>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sch.availability.map((slot, idx) => (
                      <TableRow
                        key={slot._id}
                        sx={{
                          bgcolor: idx % 2 === 0 ? "grey.50" : "white",
                          "&:hover": {
                            bgcolor: "primary.light",
                            "& .MuiTableCell-root": {
                              color: "white",
                            },
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500, py: 2 }}>
                          {slot.day}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, py: 2 }}>
                          {slot.from}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, py: 2 }}>
                          {slot.to}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          ))}

          <Box
            sx={{
              textAlign: "right",
              mt: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() =>
                navigate("/accountsetup/form/schedule", {
                  state: { blogId: data._id },
                })
              }
              sx={{
                background: "linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%)",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(255, 154, 86, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(255, 154, 86, 0.6)",
                },
              }}
            >
              Edit Schedule
            </Button>
          </Box>
        </Box>
      </Card>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header Card */}
          <Fade in timeout={400}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  p: 3,
                  color: "white",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    <BusinessCenter />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5 }}>
                      {data.ServiceType}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Service Management Dashboard
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box sx={{ p: 4 }}>
                {renderContent(data.content)}
                <Box
                  sx={{
                    textAlign: "right",
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid",
                    borderColor: "grey.200",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Settings />}
                    size="large"
                    onClick={() =>
                      navigate("/accountsetup/form", {
                        state: { blogId: data._id },
                      })
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(102, 126, 234, 0.6)",
                      },
                    }}
                  >
                    Update Service Details
                  </Button>
                </Box>
              </Box>
            </Card>
          </Fade>

          {/* Phone Section */}
          {renderPhoneSection()}

          {/* Schedule Section */}
          {renderSchedule(data.schedules)}
        </Stack>
      </Container>
    </Box>
  );
};

export default ServiceAdmin;
