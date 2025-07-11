import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import useScheduleStore from "../store/useScheduleStore"; // adjust path

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Convert 24-hour format to 12-hour format
const to12HourFormat = (time) => {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

// Convert 12-hour format back to 24-hour (needed for editing pre-fill)
const to24HourFormat = (time12) => {
  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

const TimeScheduleForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authorName, authorEmail } = location.state || {};

  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [editIndex, setEditIndex] = useState(null); // New

  const {
    availability,
    timeLimit,
    setTimeLimit,
    addAvailabilitySlot,
    submitSchedule,
    setAuthorInfo,
    resetSchedule,
    removeAvailabilitySlot,
    updateAvailabilitySlot,
  } = useScheduleStore();

  useEffect(() => {
    if (authorName && authorEmail) {
      setAuthorInfo({ name: authorName, email: authorEmail });
    }
  }, [authorName, authorEmail, setAuthorInfo]);

  const handleAddSlot = () => {
    if (!selectedDay || !fromTime || !toTime) {
      toast.error("Please fill all fields.");
      return;
    }

    const formattedFrom = to12HourFormat(fromTime);
    const formattedTo = to12HourFormat(toTime);

    const slot = {
      day: selectedDay,
      from: formattedFrom,
      to: formattedTo,
    };

    if (editIndex !== null) {
      updateAvailabilitySlot(editIndex, slot);
      setEditIndex(null);
      toast.info("Slot updated");
    } else {
      addAvailabilitySlot(slot);
      toast.success("Slot added");
    }

    setSelectedDay("");
    setFromTime("");
    setToTime("");
  };

  const handleEdit = (slot, index) => {
    setEditIndex(index);
    setSelectedDay(slot.day);
    setFromTime(to24HourFormat(slot.from));
    setToTime(to24HourFormat(slot.to));
  };

  const handleDelete = (index) => {
    removeAvailabilitySlot(index);
    toast.warn("Slot removed");
  };

  const handleSubmit = async () => {
    if (availability.length === 0) {
      toast.error("Please add at least one time slot.");
      return;
    }

    try {
      await submitSchedule();
      toast.success("✅ Schedule saved successfully!");
      resetSchedule();
      navigate("/admin");
    } catch (err) {
      console.error("Schedule submission error:", err);
      toast.error("❌ Failed to save schedule.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" fontWeight={700} color="#388087" gutterBottom>
        ⏰ Set Your Weekly Availability
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>
        <TextField
          label="Appointment Duration (in minutes)"
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Select Day</InputLabel>
          <Select
            value={selectedDay}
            label="Select Day"
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="From Time"
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Time"
          type="time"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="outlined" onClick={handleAddSlot}>
          {editIndex !== null ? "✏️ Update Slot" : "➕ Add Slot"}
        </Button>
      </Stack>

      <Box mt={4}>
        <Typography variant="h6" fontWeight={600}>
          🗓️ Added Time Slots
        </Typography>
        <Stack spacing={1} mt={2}>
          {availability.map((slot, i) => (
            <Box
              key={i}
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                bgcolor: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {slot.day}: {slot.from} - {slot.to}
              </span>
              <Box>
                <IconButton onClick={() => handleEdit(slot, i)} color="primary">
                  <Pencil size={18} />
                </IconButton>
                <IconButton onClick={() => handleDelete(i)} color="error">
                  <Trash2 size={18} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 4, bgcolor: "#388087", fontWeight: 600 }}
        fullWidth
      >
        ✅ Save Schedule
      </Button>
    </Box>
  );
};

export default TimeScheduleForm;
