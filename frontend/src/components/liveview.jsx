import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogContentRenderer from "./FromContentRenderer";
import useUserFromStore from "../store/useUserFromStore";

const LiveView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { content, previews, initializeFromLiveView } = useUserFromStore();

  const locationContent = location.state?.content || [];
  const locationPreviews = location.state?.previews || {};
  const locationType = location.state?.type || ""; // ✅ use correct key: 'type'

  useEffect(() => {
    initializeFromLiveView({
      content: locationContent,
      previews: locationPreviews,
      type: locationType,
    });
  }, []);

  const handleBackToEditor = () => {
    navigate("/accountsetup/form", {
      state: {
        content,
        previews,
        type: locationType, // ✅ send the original blog type
      },
    });
  };

  return (
    content.length > 0 && (
      <Box sx={{ mt: 4, px: { xs: 2, sm: 3, md: 6 }, mx: "auto", maxWidth: "1200px", width: "100%" }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToEditor}
            sx={{
              borderColor: (t) => t.palette.primary.main,
              color: (t) => t.palette.primary.main,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                bgcolor: (t) => t.palette.primary.main,
                color: "#ffffff",
              },
            }}
          >
            Back to Editor
          </Button>
          <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 700 }}>
            Live Preview
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4, md: 6 }, borderRadius: 4 }}>
          <Box
            sx={{
              fontFamily: "'Georgia', serif",
              lineHeight: 1.9,
              overflowWrap: "break-word",
              wordBreak: "break-word",
              "& img": {
                display: "block",
                margin: "24px auto",
                maxWidth: "100%",
                width: { xs: "100%", sm: "80%", md: "70%" },
                height: "auto",
                borderRadius: 3,
                boxShadow: 2,
              },
            }}
          >
            <BlogContentRenderer content={content} previews={previews} />
          </Box>
          <Divider sx={{ mt: 6, mb: 3 }} />
          <Typography variant="caption" display="block" textAlign="center" sx={{ color: "text.secondary", fontStyle: "italic" }}>
            © {new Date().getFullYear()} Booklyst. All rights reserved.
          </Typography>
        </Paper>
      </Box>
    )
  );
};

export default LiveView;
