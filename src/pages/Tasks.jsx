import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import api from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
export default function Tasks() {
    const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // const token = localStorage.getItem("token");
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        setMessage(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  //   handleDelete method
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure ?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully");
      navigate("/tasks");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tasks</h1>
          <Link
            to={`/task/add`}
            className="px-3 py-1 bg-blue-400 text-white text-lg rounded hover:bg-yellow-500 transition"
          >
            + Add Task
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading Tasks.....</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No Task Found</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Name
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {task.project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.due_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      
                      <Link
                        to={`/task/edit/${task.id}`}
                        className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
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
