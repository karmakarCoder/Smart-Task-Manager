import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const ProjectForm = ({
  isOpen,
  setIsOpen,
  editingProject,
  defaultValues,
  onSubmit,
  teams,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  // Reset form when dialog closes
  const handleDialogChange = (open) => {
    setIsOpen(open);
    if (!open) {
      reset(defaultValues);
    }
  };

  // Populate form when editing
  if (editingProject && defaultValues) {
    setValue("name", defaultValues.name);
    setValue("description", defaultValues.description);
    setValue("teamId", defaultValues.teamId);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingProject ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogDescription>
            {editingProject
              ? "Update project details"
              : "Add a new project to your workspace"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Project name is required" })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <Select
              {...register("teamId", { required: "Team is required" })}
              onValueChange={(value) => setValue("teamId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {editingProject ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
