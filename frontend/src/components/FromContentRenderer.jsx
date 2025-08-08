import React from "react";
import { Typography, Box } from "@mui/material";

const FromContentRenderer = ({ content, previews }) => {
  return (
    <Box sx={{
      "& h1, & h2, & p": { color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#0f172a' },
    }}>
      {content.map((block) => {
        switch (block.type) {
          case "title":
            return (
              <Typography
                key={block.id}
                variant="h3"
                component="h1"
                sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.5 }}
              >
                {block.value}
              </Typography>
            );
          case "subtitle":
            return (
              <Typography
                key={block.id}
                variant="h5"
                component="h2"
                sx={{ fontWeight: 700, mb: 2, color: (theme) => theme.palette.primary.main }}
              >
                {block.value}
              </Typography>
            );
          case "text":
            return (
              <Typography key={block.id} variant="body1" sx={{ mb: 2, lineHeight: 1.9 }}>
                {block.value}
              </Typography>
            );
          case "image":
            return (
              <Box
                key={block.id}
                component="img"
                src={block.value || previews[block.id]}
                alt="blog visual"
                sx={{ maxWidth: "100%", borderRadius: 3, mb: 3, boxShadow: 3 }}
              />
            );
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default FromContentRenderer;
