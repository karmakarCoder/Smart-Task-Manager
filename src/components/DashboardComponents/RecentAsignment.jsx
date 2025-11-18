import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function RecentAsignment({ activityLog }) {
  const logs = activityLog.slice(0, 5);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Recent Reassignments
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="border-l-2 border-primary pl-3">
              <p className="text-sm font-medium">{log.taskTitle}</p>

              <p className="text-xs text-muted-foreground">
                From <span className="font-medium">{log.fromMember}</span> to{" "}
                <span className="font-medium">{log.toMember}</span>
              </p>

              <p className="text-xs text-muted-foreground">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {logs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No reassignments yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
