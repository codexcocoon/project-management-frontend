import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../axios";
export default function ProjectDetails() {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState([]);

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectDetails(response.data);
      } catch (error) {
        console.log("Error loading project : ", error);
      }
    };
    fetchProject();
  }, [id]);
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Project Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {projectDetails?.name}
          </h2>
          <p className="text-gray-600 mb-4">{projectDetails?.description}</p>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="text-sm text-gray-500">Due Date</span>
              <p className="text-gray-800 font-medium">
                {projectDetails?.due_date}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {projectDetails.tasks?.length == 0 ? (
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                No Tasks Found
              </h1>
              <Link
                to={`/task/add`}
                className="px-3 py-1 bg-blue-400 text-white text-lg rounded hover:bg-yellow-500 transition"
              >
                + Add Task
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {projectDetails.tasks?.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>
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
                      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                        View
                      </button>
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
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
