import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
export default function EditTask() {
  const { token } = useAuth();
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   fetch project data from backend api
  useEffect(() => {
    const fetchTaskAndProjects = async () => {
      try {
        // const token = localStorage.getItem("token");
        // Fetch all projects

        const projectResponse = await api.get("projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(projectResponse.data);
        // Get Task Data
        const taskResponse = await api.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(taskResponse.data.title);
        setDescription(taskResponse.data.description);
        setStatus(taskResponse.data.status);
        setDueDate(taskResponse.data.due_date);
        setProjectId(taskResponse.data.project_id);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTaskAndProjects();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/tasks/${id}`,
        {
          project_id: projectId,
          title: title,
          description: description,
          due_date: dueDate,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Task updated successfully");
      navigate("/tasks");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Task
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4 w-full">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>
            {/* project */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              >
                <option value="">...Select Project...</option>
                {projects.map((project) => (
                  <option value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              ></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
