import React from "react";

const EmptyState = ({ title = "Nothing here yet", description = "Check back later or try a different filter.", action }) => {
  return (
    <div className="w-full text-center py-16 px-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/40 dark:bg-slate-900/40">
      <div className="text-5xl mb-3">🗂️</div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
