export const userList = [
  {
    id: "user_1",
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "Admin",
  },
];

export const Teams = [
  {
    id: "team_1",
    name: "Development Team",
    createdBy: "user_1",
    members: [
      { id: "member_1", name: "Riya", role: "Frontend Developer", capacity: 3 },
      {
        id: "member_2",
        name: "Farhan",
        role: "Backend Developer",
        capacity: 4,
      },
      { id: "member_3", name: "Sarah", role: "UI/UX Designer", capacity: 3 },
      { id: "member_4", name: "Mike", role: "DevOps", capacity: 5 },
    ],
  },
  {
    id: "team_2",
    name: "Marketing Team",
    createdBy: "user_1",
    members: [
      { id: "member_5", name: "Alex", role: "Content Writer", capacity: 4 },
      {
        id: "member_6",
        name: "Emma",
        role: "Social Media Manager",
        capacity: 3,
      },
    ],
  },
];

export const Projects = [
  {
    id: "project_1",
    name: "E-commerce Platform",
    description: "Building a new e-commerce platform",
    teamId: "team_1",
    createdBy: "user_1",
  },
  {
    id: "project_2",
    name: "Mobile App Redesign",
    description: "Redesigning the mobile application",
    teamId: "team_1",
    createdBy: "user_1",
  },
  {
    id: "project_3",
    name: "Brand Campaign",
    description: "Q4 marketing campaign",
    teamId: "team_2",
    createdBy: "user_1",
  },
];

export const Tasks = [
  {
    id: "task_1",
    title: "Design Homepage",
    description: "Create wireframes and mockups for homepage",
    projectId: "project_1",
    assignedTo: "member_3",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "task_2",
    title: "Setup Database",
    description: "Initialize database schema",
    projectId: "project_1",
    assignedTo: "member_2",
    priority: "High",
    status: "Done",
  },
  {
    id: "task_3",
    title: "API Integration",
    description: "Integrate payment gateway API",
    projectId: "project_1",
    assignedTo: "member_2",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "task_4",
    title: "Build Product Catalog",
    description: "Develop product listing component",
    projectId: "project_1",
    assignedTo: "member_1",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "task_5",
    title: "UI Design Research",
    description: "Research modern UI patterns",
    projectId: "project_2",
    assignedTo: "member_3",
    priority: "Low",
    status: "Pending",
  },
  {
    id: "task_6",
    title: "Create Social Posts",
    description: "Design 10 social media posts",
    projectId: "project_3",
    assignedTo: "member_6",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "task_7",
    title: "Write Blog Articles",
    description: "Write 5 SEO-optimized articles",
    projectId: "project_3",
    assignedTo: "member_5",
    priority: "Medium",
    status: "Pending",
  },
];

export const ActivityLog = [
  {
    id: "log_1",
    taskId: "task_3",
    taskTitle: "API Integration",
    fromMember: "Riya",
    toMember: "Farhan",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];
