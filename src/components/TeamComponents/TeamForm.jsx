import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TeamForm({ isOpen, setIsOpen, editingTeam, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (editingTeam) {
      reset({ name: editingTeam.name });
    } else {
      reset({ name: "" });
    }
  }, [editingTeam, isOpen, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
    setIsOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{editingTeam ? "Edit Team" : "New Team"}</DialogTitle>
        <DialogDescription>
          {editingTeam
            ? "Update team name"
            : "Create a new team for your projects"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name</Label>
          <Input id="teamName" {...register("name", { required: true })} />
        </div>
        <Button type="submit" className="w-full">
          {editingTeam ? "Update Team" : "Create Team"}
        </Button>
      </form>
    </DialogContent>
  );
}
