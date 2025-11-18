// components/tasks/TaskForm.jsx
import { useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useData } from "../../contexts/DataContext";

export default function TaskForm({
  isOpen,
  setIsOpen,
  editingTask,
  projects,
  teams,
}) {
  const { addTask, updateTask, tasks } = useData();

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      projectId: "",
      assignedTo: "",
      priority: "Medium",
      status: "Pending",
    },
  });

  // Load edit data
  useEffect(() => {
    if (editingTask) {
      reset(editingTask);
    } else {
      reset();
    }
  }, [editingTask, isOpen, reset]);

  const selectedProjectId = watch("projectId");

  const getProjectTeam = (pid) => {
    const project = projects.find((p) => p.id === pid);
    return project ? teams.find((t) => t.id === project.teamId) : null;
  };

  const team = selectedProjectId ? getProjectTeam(selectedProjectId) : null;

  const onSubmit = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      toast.success("Task updated!");
    } else {
      addTask(data);
      toast.success("Task created!");
    }

    setIsOpen(false);
    reset();
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{editingTask ? "Edit Task" : "New Task"}</DialogTitle>
        <DialogDescription>
          {editingTask ? "Update task details" : "Create a new task"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Task Title</Label>
          <Input {...register("title")} />
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea {...register("description")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Project</Label>

            <Select
              onValueChange={(v) => {
                setValue("projectId", v);
                setValue("assignedTo", "");
              }}
              value={watch("projectId")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Assign To</Label>

            <div className="flex gap-2">
              <Select
                disabled={!selectedProjectId}
                onValueChange={(v) => setValue("assignedTo", v)}
                value={watch("assignedTo")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {team?.members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Select
              value={watch("priority")}
              onValueChange={(v) => setValue("priority", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 w-full">
            <Label>Status</Label>
            <Select
              value={watch("status")}
              onValueChange={(v) => setValue("status", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {editingTask ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </DialogContent>
  );
}
