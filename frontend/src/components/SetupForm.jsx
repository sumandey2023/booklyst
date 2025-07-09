import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Send } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const primaryColor = "#388087";
const lightPrimary = "#5ca8b2";

const SetupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, service } = location.state || {};

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    serviceCategory: service || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (type === "business" && !formData.businessName)
      newErrors.businessName = "Business Name is required.";
    if (type === "service" && !formData.serviceCategory)
      newErrors.serviceCategory = "Please select a service category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    try {
      // Simulate submit
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("✅ Account setup completed!");
      navigate("/dashboard"); // or any other page
    } catch (error) {
      toast.error("❌ Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={submitting}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ py: 5, maxWidth: "800px", mx: "auto" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          gutterBottom
          sx={{ mt: isMobile ? 1 : 3, color: primaryColor }}
        >
          📝 Setup Your {type === "business" ? "Business" : "Service"} Profile
        </Typography>

        <Divider sx={{ my: 3, borderColor: lightPrimary }} />

        <Stack spacing={3}>
          <TextField
            label="Your Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email Address"
            fullWidth
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          {type === "business" && (
            <TextField
              label="Business Name"
              fullWidth
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              error={!!errors.businessName}
              helperText={errors.businessName}
            />
          )}

          {type === "service" && (
            <FormControl fullWidth error={!!errors.serviceCategory}>
              <InputLabel>Service Category</InputLabel>
              <Select
                value={formData.serviceCategory}
                label="Service Category"
                onChange={(e) =>
                  handleChange("serviceCategory", e.target.value)
                }
              >
                <MenuItem value="">Select Service</MenuItem>
                {[
                  "Electrician",
                  "Plumber",
                  "Mechanic",
                  "Carpenter",
                  "Painter",
                  "AC Technician",
                  "Gardener",
                  "House Cleaner",
                ].map((srv) => (
                  <MenuItem key={srv} value={srv}>
                    {srv}
                  </MenuItem>
                ))}
              </Select>
              {errors.serviceCategory && (
                <FormHelperText>{errors.serviceCategory}</FormHelperText>
              )}
            </FormControl>
          )}
        </Stack>

        <Stack mt={4}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            startIcon={<Send />}
            disabled={submitting}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              bgcolor: primaryColor,
              "&:hover": { bgcolor: lightPrimary },
            }}
          >
            Finish Setup
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SetupForm;
