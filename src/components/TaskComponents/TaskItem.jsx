import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

export default function TaskItem({ task, projects, teams, onEdit, onDelete }) {
  const project = projects.find((p) => p.id === task.projectId);
  const team = project ? teams.find((t) => t.id === project.teamId) : null;
  const assignee = team?.members.find((m) => m.id === task.assignedTo);

  const getPriorityColor = (priority) => {
    if (priority === "High") return "bg-destructive text-white";
    if (priority === "Medium") return "bg-yellow-500 text-white";
    return "bg-sky-400 text-white";
  };

  const getStatusColor = (status) => {
    if (status === "Done") return "bg-green-600 text-primary-foreground";
    if (status === "In Progress") return "bg-primary text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
              <Pencil className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{project?.name}</Badge>
          <Badge variant="outline">{assignee?.name || "Unassigned"}</Badge>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
