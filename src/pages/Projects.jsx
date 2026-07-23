import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import api from "../axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProjects, deleteProject } from "../services/ProjectService";
export default function Projects() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const token = localStorage.getItem("token");
        const response = await getProjects(token);
        setProjects(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  //   handleDelete method
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure ?");
    if (!confirmDelete) return;
    try {
      //   const token = localStorage.getItem("token");
      await deleteProjects(id, token);
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project deleted successfully");
      navigate("/projects");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Projects
          </h1>
          <Link
            to={`/project/add`}
            className="px-3 py-1 bg-blue-400 text-white text-lg rounded hover:bg-yellow-500 transition"
          >
            + Add Project
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading Projects.....</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">No Projects Found</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {project.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {project.due_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <Link
                        to={`/project-detail/${project.id}`}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                      >
                        View
                      </Link>
                      <Link
                        to={`/project/edit/${project.id}`}
                        className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
