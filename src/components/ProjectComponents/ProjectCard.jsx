import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Trash2, Pencil, Users } from "lucide-react";

export const ProjectCard = ({ project, handleEdit, handleDelete, teams }) => {
  const team = teams.find((t) => t.id === project.teamId);
  return (
    <Card
      key={project.id}
      className="shadow-md hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{project.name}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(project)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(project.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{team?.name}</span>
        </div>
      </CardContent>
    </Card>
  );
};
