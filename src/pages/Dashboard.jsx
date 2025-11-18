import { toast } from "sonner";

import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import StatsCard from "../components/DashboardComponents/StatsCard";
import TeamSummary from "../components/DashboardComponents/TeamSummary";
import RecentAsignment from "../components/DashboardComponents/RecentAsignment";
import { useData } from "../contexts/DataContext";

export default function Dashboard() {
  const { teams, projects, tasks, activityLog, reassignTasks } = useData();
  console.log(teams);

  const handleReassign = () => {
    reassignTasks();
    toast.success("Tasks reassigned successfully!");
  };

  // Stats
  const stats = {
    totalProjects: projects.length,
    totalTasks: tasks.length,
    activeTasks: tasks.filter((t) => t.status !== "Done").length,
    completedTasks: tasks.filter((t) => t.status === "Done").length,
  };

  // Team stats
  const teamStats = teams.map((team) => {
    const teamProjects = projects.filter((p) => p.teamId === team.id);
    const teamTasks = tasks.filter(
      (t) =>
        teamProjects.some((p) => p.id === t.projectId) && t.status !== "Done"
    );

    return {
      ...team,
      stats: team.members.map((member) => {
        const memberTasks = teamTasks.filter((t) => t.assignedTo === member.id);
        return {
          ...member,
          currentTasks: memberTasks.length,
          isOverloaded: memberTasks.length > member.capacity,
        };
      }),
    };
  });

  return (
    <div className="space-y-6">
      <DashboardHeader onReassign={handleReassign} />

      <StatsCard stats={stats} />

      <div className="grid grid-cols-2 gap-6">
        <TeamSummary teamStats={teamStats} />
        <RecentAsignment activityLog={activityLog} />
      </div>
    </div>
  );
}
