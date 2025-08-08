import React from "react";
import MotionFade from "../motion/MotionFade";

const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <MotionFade>{children}</MotionFade>
      </div>
    </div>
  );
};

export default PageContainer;
