import React from "react";

const Skeleton = ({ className = "h-4 w-full" }) => (
  <div className={`bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse ${className}`} />
);

export default Skeleton;
