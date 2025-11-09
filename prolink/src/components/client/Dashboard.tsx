import { FiBarChart2, FiFileText, FiSettings, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, John!
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Projects', value: '2'},
          { title: 'Pending', value: '15' },
          { title: 'Completed', value: '48' },
          { title: 'In Progress', value: '4' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FiUsers, label: 'Add Requirement', color: 'blue' },
              { icon: FiFileText, label: 'New Project', color: 'green' },
              { icon: FiBarChart2, label: 'Reports', color: 'purple' },
              { icon: FiSettings, label: 'Settings', color: 'gray' },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className={`w-6 h-6 text-${action.color}-600 mb-2`} />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State for Demo */}
      <div className="mt-8 bg-gray-50 rounded-xl p-8 text-center">
        <p className="text-gray-500">Dashboard content will be added here...</p>
      </div>
    </div>
  );
};

export default Dashboard