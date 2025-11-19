import { createContext, useContext, useState, useEffect } from "react";
import { ActivityLog, Projects, Tasks, Teams } from "../data/staticData";
import { toast } from "sonner";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [teams, setTeams] = useState(() => {
    const stored = localStorage.getItem("teams");
    return stored ? JSON.parse(stored) : Teams;
  });

  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem("projects");
    return stored ? JSON.parse(stored) : Projects;
  });

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : Tasks;
  });

  const [activityLog, setActivityLog] = useState(() => {
    const stored = localStorage.getItem("activityLog");
    return stored ? JSON.parse(stored) : ActivityLog;
  });

  useEffect(() => {
    if (!localStorage.getItem("teams"))
      localStorage.setItem("teams", JSON.stringify(teams));
    if (!localStorage.getItem("projects"))
      localStorage.setItem("projects", JSON.stringify(projects));
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify(tasks));
    if (!localStorage.getItem("activityLog"))
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, []);

  // data set in localstorage
  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("activityLog", JSON.stringify(activityLog));
  }, [teams, projects, tasks, activityLog]);

  //======= team crud =========
  const addTeam = (team) => {
    const newTeam = { ...team, id: `team_${Date.now()}` };
    setTeams([...teams, newTeam]);
  };
  const updateTeam = (id, teamData) =>
    setTeams(teams.map((t) => (t.id === id ? { ...t, ...teamData } : t)));
  const deleteTeam = (id) => setTeams(teams.filter((t) => t.id !== id));

  // project curd
  const addProject = (project) =>
    setProjects([...projects, { ...project, id: `project_${Date.now()}` }]);

  //========= update project ==========
  const updateProject = (id, projectData) =>
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, ...projectData } : p))
    );

  //====== delete project ===========
  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    setTasks(tasks.filter((t) => t.projectId !== id));
  };

  //========== task crud ============
  const addTask = (task) =>
    setTasks([...tasks, { ...task, id: `task_${Date.now()}` }]);
  const updateTask = (id, taskData) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...taskData } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  //========= activity log ==========
  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: `activity_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setActivityLog([newActivity, ...activityLog]);
  };

  const overloadInfo = teams.flatMap((team) =>
    team.members.map((member) => {
      const assignedTasks = tasks.filter(
        (task) => task.assignedTo === member.id && task.status !== "Done"
      );

      const isOverloaded = assignedTasks.length > member.capacity;

      return {
        team: team.name,
        member: member.name,
        assignedTasks: assignedTasks.length,
        capacity: member.capacity,
        isOverloaded,
      };
    })
  );

  // get only overloaded members
  const overloadedMembers = overloadInfo.filter((m) => m.isOverloaded);

  //========== reasign task ==========

  const reassignTasks = () => {
    const updatedTasks = [...tasks];
    const reassignments = [];

    const getTeamTasks = (teamId) =>
      updatedTasks.filter((t) => {
        const project = projects.find((p) => p.id === t.projectId);
        return project?.teamId === teamId && t.status !== "Done";
      });

    teams.forEach((team) => {
      team.members.forEach((member) => {
        const teamTasks = getTeamTasks(team.id);
        const memberTasks = teamTasks.filter((t) => t.assignedTo === member.id);

        const overload = memberTasks.length - member.capacity;

        if (overload <= 0) return;

        const tasksToReassign = memberTasks
          .filter((t) => t.priority !== "High")
          .sort((a, b) => {
            const order = { Low: 0, Medium: 1, High: 2 };
            return order[a.priority] - order[b.priority];
          })
          .slice(0, overload);

        tasksToReassign.forEach((task) => {
          const availableMember = team.members
            .filter((m) => m.id !== member.id)
            .map((m) => ({
              ...m,
              currentLoad: getTeamTasks(team.id).filter(
                (t) => t.assignedTo === m.id
              ).length,
            }))
            .filter((m) => m.currentLoad < m.capacity)
            .sort((a, b) => a.currentLoad - b.currentLoad)[0];

          if (availableMember) {
            const index = updatedTasks.findIndex((t) => t.id === task.id);
            updatedTasks[index] = {
              ...task,
              assignedTo: availableMember.id,
            };

            reassignments.push({
              id: `activity_${Math.random()}`,
              taskId: task.id,
              taskTitle: task?.title,
              fromMember: member.name,
              toMember: availableMember.name,
              timestamp: new Date().toISOString(),
            });
          }
        });
      });
    });

    toast.success("Tasks reassigned successfully!");
    setTasks(updatedTasks);
    setActivityLog([...reassignments, ...activityLog]);
  };

  return (
    <DataContext.Provider
      value={{
        teams,
        projects,
        tasks,
        activityLog,
        addTeam,
        updateTeam,
        deleteTeam,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        addActivity,
        reassignTasks,
        overloadedMembers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
