import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function RecentAsignment({ activityLog }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Recent Reassignments
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 flex-wrap">
          {activityLog?.length > 0 ? (
            activityLog.map((log) => (
              <div key={log.id} className="border-l-2 border-primary pl-3">
                <p className="text-sm font-medium">{log.taskTitle}</p>

                <p className="text-xs text-muted-foreground">
                  From <span className="font-medium">{log.fromMember}</span> to
                  <span className="font-medium ml-0.5">{log.toMember}</span>
                </p>

                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <p>{new Date(log.timestamp).toDateString()},</p>
                  <p>
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No reassignments yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
