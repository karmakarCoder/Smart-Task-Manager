import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskFilter({
  projects,
  teams,
  filterProject,
  filterMember,
  setFilterProject,
  setFilterMember,
}) {
  return (
    <div className="flex gap-4">
      <Select value={filterProject} onValueChange={setFilterProject}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterMember} onValueChange={setFilterMember}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by member" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Members</SelectItem>
          {teams.flatMap((t) =>
            t.members.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
