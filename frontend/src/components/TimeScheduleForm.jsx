import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  IconButton,
  Divider,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import useScheduleStore from "../store/useScheduleStore";
import useAdminStore from "../store/useAdminStore";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const to12HourFormat = (time) => {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

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
  const { blogId, authorName, authorEmail } = location.state || {};

  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true); // 🔄 Loader state

  const {
    availability,
    serviceCharge,
    setServiceCharge,
    addAvailabilitySlot,
    submitSchedule,
    setAuthorInfo,
    resetSchedule,
    removeAvailabilitySlot,
    updateAvailabilitySlot,
    setAvailability,
    isalradyschedule,
    isAlradySchedule,
  } = useScheduleStore();

  const { serviceAdminData, fetchServiceAdminData } = useAdminStore();

  // 🔃 Initial mount: fetch and check schedule
  useEffect(() => {
    (async () => {
      setLoading(true); // start loading
      await fetchServiceAdminData();
      await isalradyschedule();
      setLoading(false); // stop after check
    })();
  }, [blogId]);

  // 🧠 Load existing data if editing
  useEffect(() => {
    const loadExistingSchedule = async () => {
      setLoading(true);
      await fetchServiceAdminData();
      const data = serviceAdminData[0];

      if (data) {
        setServiceCharge(data.schedules[0]?.serviceCharge || 0);
        setAvailability(data.schedules[0]?.availability || []);
        setAuthorInfo({
          name: data.author?.name || "",
          email: data.author?.email || "",
        });
      }

      setLoading(false); // ✅ data fully loaded, stop spinner
    };

    if (blogId || isAlradySchedule) {
      loadExistingSchedule();
    } else {
      if (authorName && authorEmail) {
        setAuthorInfo({ name: authorName, email: authorEmail });
      }
      setLoading(false); // ✅ for non-edit case, stop loading
    }
  }, [
    blogId,
    authorName,
    authorEmail,
    fetchServiceAdminData,
    isAlradySchedule,
  ]);

  const handleAddSlot = () => {
    if (!selectedDay || !fromTime || !toTime) {
      toast.error("Please fill all fields.");
      return;
    }

    const formattedFrom = to12HourFormat(fromTime);
    const formattedTo = to12HourFormat(toTime);

    const slot = { day: selectedDay, from: formattedFrom, to: formattedTo };

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
      await submitSchedule(blogId);
      toast.success("✅ Schedule saved successfully!");
      resetSchedule();
      navigate("/admin");
    } catch (err) {
      console.error("Schedule submission error:", err);
      toast.error("❌ Failed to save schedule.");
    }
  };

  // ⏳ Show loading spinner while fetching data
  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 6, px: 2 }}>
      <Typography variant="h4" fontWeight={800} sx={{ color: "primary.main", letterSpacing: -0.5, mb: 1 }}>
        {blogId ? "Edit" : "Set"} Your Weekly Availability
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Add your working days, preferred hours, and service charge.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
        <TextField
          label="Service Charge (₹)"
          type="number"
          value={serviceCharge}
          onChange={(e) => setServiceCharge(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Select Day</InputLabel>
          <Select value={selectedDay} label="Select Day" onChange={(e) => setSelectedDay(e.target.value)}>
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="From Time" type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField label="To Time" type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} InputLabelProps={{ shrink: true }} />
      </Box>

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button variant="contained" onClick={handleAddSlot} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}>
          {editIndex !== null ? "Update Slot" : "Add Slot"}
        </Button>
        {editIndex !== null && (
          <Button variant="text" color="inherit" onClick={() => setEditIndex(null)} sx={{ textTransform: "none" }}>
            Cancel Edit
          </Button>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700}>
          Added Time Slots
        </Typography>
        <Box sx={{ mt: 2, display: "grid", gap: 1.5 }}>
          {availability.map((slot, i) => (
            <Box key={i} sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
              <span className="font-medium">
                {slot.day}: {slot.from} - {slot.to}
              </span>
              <Box>
                <IconButton onClick={() => handleEdit(slot, i)} color="primary" size="small">
                  <Pencil size={18} />
                </IconButton>
                <IconButton onClick={() => handleDelete(i)} color="error" size="small">
                  <Trash2 size={18} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Button variant="contained" onClick={handleSubmit} sx={{ width: "100%", mt: 3, fontWeight: 800, borderRadius: 2 }}>
        Save Schedule
      </Button>
    </Box>
  );
};

export default TimeScheduleForm;
