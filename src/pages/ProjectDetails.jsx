import React from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function ProjectDetails() {
  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Project Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Website Redesign
          </h2>
          <p className="text-gray-600 mb-4">
            Redesign the company website using React and TailwindCSS for a
            modern, responsive UI.
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <span className="text-sm text-gray-500">Due Date</span>
              <p className="text-gray-800 font-medium">2025-09-30</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status</span>
              <p className="text-green-600 font-medium">In Progress</p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
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
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Wireframe Design
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Create wireframes for the homepage and product pages.
                </td>
                <td className="px-6 py-4 text-yellow-600 font-medium">
                  Pending
                </td>
                <td className="px-6 py-4 text-gray-700">2025-09-20</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Homepage UI
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Develop homepage layout using TailwindCSS.
                </td>
                <td className="px-6 py-4 text-blue-600 font-medium">
                  In Progress
                </td>
                <td className="px-6 py-4 text-gray-700">2025-09-25</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">3</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  Contact Page
                </td>
                <td className="px-6 py-4 text-gray-700">
                  Build contact form with validation.
                </td>
                <td className="px-6 py-4 text-green-600 font-medium">
                  Completed
                </td>
                <td className="px-6 py-4 text-gray-700">2025-09-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
