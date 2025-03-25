import { ActivityItem, Stats } from "../../../types";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface OverviewSectionProps {
  stats: Stats;
  activities: ActivityItem[];
  userName: string;
}

export default function OverviewSection({ stats, activities, userName }: OverviewSectionProps) {
  return (
    <section className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardContent className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Welcome back, {userName}!</h2>
              <p className="mt-1 text-slate-600">Here's what's happening with your projects today.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                Active Client
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Files Stat */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Files</p>
                <p className="text-2xl font-semibold mt-1">{stats.files}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <i className="ri-file-list-3-line text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-emerald-600 flex items-center">
                <i className="ri-arrow-up-line mr-1"></i>
                <span>2 new this week</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Messages Stat */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Messages</p>
                <p className="text-2xl font-semibold mt-1">{stats.messages}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
                <i className="ri-message-3-line text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-emerald-600 flex items-center">
                <i className="ri-arrow-up-line mr-1"></i>
                <span>3 new messages</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Notes Stat */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Notes</p>
                <p className="text-2xl font-semibold mt-1">{stats.notes}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <i className="ri-sticky-note-line text-xl"></i>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-600 flex items-center">
                <i className="ri-time-line mr-1"></i>
                <span>Last updated 2 days ago</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className={`h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center ${activity.textColor} mr-3 flex-shrink-0`}>
                    <i className={activity.icon}></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                    <p className="text-sm text-slate-500">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-500">No recent activities</p>
              </div>
            )}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-200">
            <button className="text-sm text-primary hover:text-primary/90 font-medium flex items-center">
              <span>View all activity</span>
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
