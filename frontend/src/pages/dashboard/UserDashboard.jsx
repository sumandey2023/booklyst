import React from "react";
import MotionFade from "../../components/motion/MotionFade";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";

const UserDashboard = () => {
  // TODO: Wire to data
  const isLoading = false;
  const businesses = [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <MotionFade>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Discover Businesses</h1>
      </MotionFade>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <EmptyState title="No businesses yet" description="Once businesses sign up, they will appear here for you to explore and book." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <div key={biz.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">{biz.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
