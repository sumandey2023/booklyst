import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
  Divider,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  Heading1,
  Heading2,
  ImageIcon,
  Text,
  Send,
  Trash2,
  UploadCloud,
  Eye,
  Plus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserFromStore from "../store/useUserFromStore.js";
import useAdminStore from "../store/useAdminStore.js";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const primaryColor = "#388087";
const lightPrimary = "#5ca8b2";

const blockOptions = [
  { type: "title", label: "H1 Title", icon: <Heading1 size={18} /> },
  { type: "subtitle", label: "H2 Subtitle", icon: <Heading2 size={18} /> },
  { type: "text", label: "Text", icon: <Text size={18} /> },
  { type: "image", label: "Image", icon: <ImageIcon size={18} /> },
];

const BlockItem = React.memo(
  ({ item, index, updateValue, removeBlock, handleImage }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 2,
        position: "relative",
        borderRadius: 3,
        border: `1px solid ${lightPrimary}`,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <IconButton
        onClick={() => removeBlock(item.id)}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          bgcolor: "#ffe6e6",
          "&:hover": { bgcolor: "#ffcccc" },
        }}
      >
        <Trash2 size={18} />
      </IconButton>

      {item.type === "image" ? (
        <>
          <Typography fontWeight={600} gutterBottom>
            📷 Image #{index + 1}
          </Typography>
          {item.value && (
            <Box
              component="img"
              src={item.value}
              alt="preview"
              sx={{
                height: 180,
                width: "auto",
                borderRadius: 2,
                border: `1px solid ${lightPrimary}`,
                mb: 2,
                display: "block",
              }}
            />
          )}
          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<UploadCloud size={18} />}
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                textTransform: "none",
              }}
            >
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImage(item.id, e.target.files[0])}
              />
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography fontWeight={600} gutterBottom>
            ✏️ {item.type.charAt(0).toUpperCase() + item.type.slice(1)} #
            {index + 1}
          </Typography>
          <TextField
            fullWidth
            multiline={item.type === "text"}
            minRows={item.type === "text" ? 4 : 1}
            placeholder={`Enter ${item.type}`}
            value={item.value}
            onChange={(e) => updateValue(item.id, e.target.value)}
            error={item.value?.trim?.() === ""}
            helperText={
              item.value?.trim?.() === ""
                ? `This ${item.type} field is required.`
                : ""
            }
            sx={{ mt: 1 }}
          />
        </>
      )}
    </Paper>
  )
);

const SetupForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location.state?.blogId;
  const restoredContent = location.state?.content;
  const restoredPreviews = location.state?.previews;
  const passedType = location.state?.type || "personal";

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const {
    form,
    content,
    images,
    previews,
    selectedBlock,
    typeError,
    setForm,
    setSelectedData,
    setTypeError,
    addData,
    updateValue,
    handleImage,
    removeBlock,
    resetForm,
    createUserSetup,
    setPreviews,
    initializeFromLiveView,
  } = useUserFromStore();

  const { fetchBlogById, sendForUPdateBLogs } = useAdminStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUser();

  useEffect(() => {
    if (restoredContent?.length) {
      resetForm(); // reset before initializing
      setForm({ type: passedType });
      setPreviews(restoredPreviews || {});
      restoredContent.forEach((block) => {
        const id = block.id || crypto.randomUUID();
        addData(block.type, id, block.value || "");
      });
    } else if (blogId) {
      fetchBlog();
    } else {
      resetForm();
      setForm({ type: passedType });
    }
  }, [blogId, location.key]); // IMPORTANT: use location.key instead of restoredContent

  const handleSelectChange = (e) => {
    const type = e.target.value;
    if (!type) return;
    setSelectedData(type);
    addData(type);
    setSelectedData("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.type) {
      setTypeError(true);
      return;
    }

    const formData = new FormData();
    const cleanContent = content.map((item) => {
      if (item.type === "image") {
        if (images[item.id]) return { id: item.id, type: "image" };
        else if (item.value)
          return { id: item.id, type: "image", value: item.value };
        else return { id: item.id, type: "image" };
      } else {
        return { id: item.id, type: item.type, value: item.value };
      }
    });

    formData.append("type", form.type);
    formData.append("content", JSON.stringify(cleanContent));
    formData.append("authorName", user?.fullName || "Unknown");
    formData.append(
      "authorEmail",
      user?.emailAddresses?.[0]?.emailAddress || "unknown@example.com"
    );

    Object.entries(images).forEach(([id, file]) => {
      formData.append("images", file, id);
    });

    try {
      setLoading(true);
      if (blogId) {
        await sendForUPdateBLogs(blogId, formData);
      } else {
        await createUserSetup(formData);
      }
      setLoading(false);
      resetForm();
      navigate("/accountsetup/form/schedule", {
        state: {
          authorName: user?.fullName || "Unknown",
          authorEmail:
            user?.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
        },
      });
    } catch (err) {
      console.error("Submit error:", err);
      setLoading(false);
      toast.error("❌ Failed to submit blog. Please try again.");
    }
  };

  const hasTitle = content.some((item) => item.type === "title");

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={fetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ py: 5, maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          gutterBottom
          sx={{ mt: isMobile ? 1 : 3, color: primaryColor }}
        >
          📄 Content Block Builder
        </Typography>

        <Divider sx={{ my: 3, borderColor: lightPrimary }} />

        <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
          <TextField
            label="Blog Type"
            value={form.type}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Author Name"
            value={user?.fullName || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Author Email"
            value={user?.emailAddresses?.[0]?.emailAddress || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Stack>

        <Stack spacing={2}>
          {content.map((item, index) => (
            <BlockItem
              key={item.id}
              item={item}
              index={index}
              updateValue={updateValue}
              removeBlock={removeBlock}
              handleImage={handleImage}
            />
          ))}
        </Stack>

        <Box mt={3} textAlign="right">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Add Block</InputLabel>
            <Select
              value={selectedBlock}
              onChange={handleSelectChange}
              label="Add Block"
              IconComponent={Plus}
            >
              {blockOptions.map((opt) => (
                <MenuItem
                  key={opt.type}
                  value={opt.type}
                  disabled={opt.type !== "title" && !hasTitle}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {content.length > 0 && (
          <Stack direction={isMobile ? "column" : "row"} spacing={2} mt={4}>
            <Button
              fullWidth
              onClick={handleSubmit}
              startIcon={<Send size={20} />}
              variant="contained"
              disabled={loading}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                bgcolor: primaryColor,
                "&:hover": { bgcolor: lightPrimary },
              }}
            >
              Submit
            </Button>
            {!blogId && (
              <Button
                fullWidth
                onClick={() =>
                  navigate("/accountsetup/form/liveview", {
                    state: { content, previews, type: form.type },
                  })
                }
                startIcon={<Eye size={20} />}
                variant="outlined"
                disabled={loading}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: "white",
                  color: primaryColor,
                  borderColor: primaryColor,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Live View
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default SetupForm;
