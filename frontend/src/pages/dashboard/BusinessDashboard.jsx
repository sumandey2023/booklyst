import React from "react";
import MotionFade from "../../components/motion/MotionFade";
import EmptyState from "../../components/ui/EmptyState";
import Skeleton from "../../components/ui/Skeleton";

const Stat = ({ label, value }) => (
  <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
    <div className="text-slate-500 text-sm">{label}</div>
    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</div>
  </div>
);

const BusinessDashboard = () => {
  // TODO: Wire to data
  const isLoading = false;
  const stats = null; // { bookings: 0, revenue: 0, views: 0 }
  const bookings = [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <MotionFade>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Business Dashboard</h1>
      </MotionFade>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Bookings" value={stats.bookings} />
          <Stat label="Revenue" value={`$${stats.revenue}`} />
          <Stat label="Views" value={stats.views} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Bookings" value={0} />
          <Stat label="Revenue" value={0} />
          <Stat label="Views" value={0} />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Recent Bookings</h2>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings yet" description="Bookings will show up here as users book your services." />
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Booking #{b.id}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
