import { useData } from "../contexts/DataContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash2, UserPlus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import TeamForm from "../components/TeamComponents/TeamForm";
import MemberForm from "../components/TeamComponents/MemberForm";

export default function Teams() {
  const { teams, addTeam, updateTeam, deleteTeam } = useData();
  const { currentUser } = useAuth();

  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Handle Team form submit
  const handleTeamSubmit = (data) => {
    if (editingTeam) {
      updateTeam(editingTeam.id, { name: data.name });
      toast.success("Team updated successfully!");
    } else {
      addTeam({ name: data.name, members: [], createdBy: currentUser.id });
      toast.success("Team created successfully!");
    }
  };

  // Handle Member form submit
  const handleMemberSubmit = (data) => {
    const team = teams.find((t) => t.id === selectedTeam);
    if (!team) return;

    const newMember = { id: `member_${Date.now()}`, ...data };
    updateTeam(selectedTeam, { members: [...team.members, newMember] });
    toast.success("Member added successfully!");
  };

  const handleRemoveMember = (teamId, memberId) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;
    updateTeam(teamId, {
      members: team.members.filter((m) => m.id !== memberId),
    });
    toast.success("Member removed successfully!");
  };

  const handleDeleteTeam = (id) => {
    deleteTeam(id);
    toast.success("Team deleted successfully!");
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-5 px-8 border-b">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" /> Teams
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your teams and members
          </p>
        </div>

        <Dialog open={isTeamOpen} onOpenChange={setIsTeamOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Team
            </Button>
          </DialogTrigger>

          <TeamForm
            isOpen={isTeamOpen}
            setIsOpen={setIsTeamOpen}
            editingTeam={editingTeam}
            onSubmit={handleTeamSubmit}
          />
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-6 p-8 pt-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {team.name}
                    <Badge variant="secondary">
                      {team.members.length} members
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Team workspace
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingTeam(team);
                      setIsTeamOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTeam(team.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {team.members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Capacity: {m.capacity}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(team.id, m.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}

              <Dialog
                open={isMemberOpen && selectedTeam === team.id}
                onOpenChange={setIsMemberOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setSelectedTeam(team.id)}
                  >
                    <UserPlus className="h-4 w-4" /> Add Member
                  </Button>
                </DialogTrigger>

                <MemberForm
                  isOpen={isMemberOpen}
                  setIsOpen={setIsMemberOpen}
                  team={team}
                  onSubmit={handleMemberSubmit}
                />
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
