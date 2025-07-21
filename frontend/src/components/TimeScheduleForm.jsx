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
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-[#388087] mb-6">
        ⏰ {blogId ? "Edit" : "Set"} Your Weekly Availability
      </h2>
      <Divider className="mb-6" />

      <div className="flex flex-col gap-4">
        <TextField
          label="Service Charge (in ₹)"
          type="number"
          value={serviceCharge}
          onChange={(e) => setServiceCharge(e.target.value)}
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

        <Button
          variant="outlined"
          onClick={handleAddSlot}
          className="!text-sm !py-2"
        >
          {editIndex !== null ? "✏️ Update Slot" : "➕ Add Slot"}
        </Button>
      </div>

      <div className="mt-8">
        <Typography variant="h6" fontWeight={600}>
          🗓️ Added Time Slots
        </Typography>
        <div className="flex flex-col gap-2 mt-4">
          {availability.map((slot, i) => (
            <div
              key={i}
              className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex justify-between items-center"
            >
              <span className="font-medium">
                {slot.day}: {slot.from} - {slot.to}
              </span>
              <div>
                <IconButton onClick={() => handleEdit(slot, i)} color="primary">
                  <Pencil size={18} />
                </IconButton>
                <IconButton onClick={() => handleDelete(i)} color="error">
                  <Trash2 size={18} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        className="w-full !bg-[#388087] !text-white !mt-6 !font-semibold"
      >
        ✅ Save Schedule
      </Button>
    </div>
  );
};

export default TimeScheduleForm;
