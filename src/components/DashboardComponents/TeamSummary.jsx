import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, AlertCircle } from "lucide-react";

export default function TeamSummary({ teamStats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
        {teamStats?.length > 0 ? (
          teamStats.map((team) => (
            <div key={team.id} className="space-y-2">
              <h4 className="font-semibold">{team.name}</h4>

              <div className="space-y-1">
                {team.stats.map((member) => (
                  <div
                    key={member.id}
                    className={`flex justify-between items-center p-2 rounded ${
                      member.isOverloaded ? "bg-destructive/10" : "bg-muted"
                    }`}
                  >
                    <span className="text-sm">{member.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {member.currentTasks} / {member.capacity}
                      </span>
                      {member.isOverloaded && (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No summary yet</p>
        )}
      </CardContent>
    </Card>
  );
}
