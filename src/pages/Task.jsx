import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

import { ListChecks, Plus } from "lucide-react";
import { useData } from "../contexts/DataContext";
import TaskFilter from "../components/TaskComponents/TaskFilter";
import TaskItem from "../components/TaskComponents/TaskItem";
import TaskForm from "../components/TaskComponents/TaskForm";

export default function Task() {
  const { tasks, projects, teams, deleteTask } = useData();

  const [isOpen, setIsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterProject, setFilterProject] = useState("all");
  const [filterMember, setFilterMember] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filterProject !== "all" && task.projectId !== filterProject)
      return false;
    if (filterMember !== "all" && task.assignedTo !== filterMember)
      return false;
    return true;
  });

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const handleNew = () => {
    setEditingTask(null);
    setIsOpen(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ListChecks className="h-8 w-8 text-primary" />
            Tasks
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your tasks
          </p>
        </div>

        <Button className="gap-2" onClick={handleNew}>
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilter
        projects={projects}
        teams={teams}
        filterProject={filterProject}
        filterMember={filterMember}
        setFilterProject={setFilterProject}
        setFilterMember={setFilterMember}
      />

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            projects={projects}
            teams={teams}
            onEdit={handleEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {/* Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TaskForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editingTask={editingTask}
          projects={projects}
          teams={teams}
        />
      </Dialog>
    </div>
  );
}
