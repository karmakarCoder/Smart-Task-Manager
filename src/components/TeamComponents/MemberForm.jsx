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

export default function MemberForm({ isOpen, setIsOpen, team, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", role: "", capacity: 3 },
  });

  useEffect(() => {
    if (team) reset({ name: "", role: "", capacity: 3 });
  }, [team, isOpen, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
    setIsOpen(false);
  };
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to {team?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="memberName">Name</Label>
            <Input id="memberName" {...register("name", { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memberRole">Role</Label>
            <Input id="memberRole" {...register("role", { required: true })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="memberCapacity">Capacity (0-5)</Label>
            <Input
              id="memberCapacity"
              type="number"
              min="0"
              max="5"
              {...register("capacity", { required: true, valueAsNumber: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Member
          </Button>
        </form>
      </DialogContent>
    </div>
  );
}
