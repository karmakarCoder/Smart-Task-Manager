import { useState } from "react";

import { toast } from "sonner";

import { FolderKanban } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { ProjectForm } from "../components/ProjectComponents/ProjectForm";
import { ProjectCard } from "../components/ProjectComponents/ProjectCard";

export default function Projects() {
  const { projects, teams, addProject, updateProject, deleteProject } =
    useData();
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleSubmit = (data) => {
    if (editingProject) {
      updateProject(editingProject, data);
      toast.success("Project updated successfully!");
    } else {
      addProject({ ...data, createdBy: currentUser.id });
      toast.success("Project created successfully!");
    }
    setIsOpen(false);
    setEditingProject(null);
  };

  // handle edit
  const handleEdit = (project) => {
    setEditingProject(project.id);
    setIsOpen(true);
  };

  // handle delete
  const handleDelete = (id) => {
    deleteProject(id);
    toast.success("Project deleted successfully!");
  };

  // default value
  const defaultValues = editingProject
    ? projects.find((p) => p.id === editingProject)
    : { name: "", description: "", teamId: "" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-8 py-5 border-b sticky top-0 left-0 bg-white z-50">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FolderKanban className="h-8 w-8 text-primary" />
            Projects
          </h1>
          <p className="text-muted-foreground mt-1">Manage your projects</p>
        </div>

        <ProjectForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editingProject={editingProject}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          teams={teams}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 p-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            teams={teams}
          />
        ))}
      </div>
    </div>
  );
}
