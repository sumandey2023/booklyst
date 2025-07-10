import React from "react";
import { Typography, Box } from "@mui/material";

const FromContentRenderer = ({ content, previews }) => {
  return (
    <Box>
      {content.map((block) => {
        switch (block.type) {
          case "title":
            return (
              <Typography
                key={block.id}
                variant="h3"
                component="h1"
                sx={{ fontWeight: 700, mb: 2 }}
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
                sx={{ fontWeight: 600, mb: 2 }}
              >
                {block.value}
              </Typography>
            );
          case "text":
            return (
              <Typography key={block.id} variant="body1" sx={{ mb: 2 }}>
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
                sx={{ maxWidth: "100%", borderRadius: 2, mb: 2 }}
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
