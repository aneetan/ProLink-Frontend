import { FiBarChart2, FiFileText, FiSettings, FiUsers, FiPlus, FiTrendingUp, FiClock, FiCheckCircle } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const projectData = [
    { name: 'Jan', projects: 4 },
    { name: 'Feb', projects: 7 },
    { name: 'Mar', projects: 5 },
    { name: 'Apr', projects: 8 },
    { name: 'May', projects: 6 },
    { name: 'Jun', projects: 10 },
  ];

  const statusData = [
    { name: 'Completed', value: 48 },
    { name: 'In Progress', value: 4 },
    { name: 'Pending', value: 15 },
    { name: 'Draft', value: 2 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 18900 },
    { month: 'Mar', revenue: 14200 },
    { month: 'Apr', revenue: 21000 },
    { month: 'May', revenue: 16800 },
    { month: 'Jun', revenue: 24500 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  const recentActivities = [
    { id: 1, icon: FiUsers, title: 'New client registration', description: 'ABC Corporation signed up', time: '2 hours ago', type: 'user' },
    { id: 2, icon: FiFileText, title: 'Quotation sent', description: 'Project: Website Redesign', time: '5 hours ago', type: 'quotation' },
    { id: 3, icon: FiCheckCircle, title: 'Project completed', description: 'Mobile App Development', time: '1 day ago', type: 'completion' },
    { id: 4, icon: FiTrendingUp, title: 'Quotation accepted', description: 'E-commerce Platform', time: '2 days ago', type: 'acceptance' },
  ];

  const getActivityIconColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-600 bg-blue-100';
      case 'quotation': return 'text-green-600 bg-green-100';
      case 'completion': return 'text-purple-600 bg-purple-100';
      case 'acceptance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your projects today.</p>
          </div>
          <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FiPlus className="w-5 h-5" />
            New Quotation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { title: 'Total Projects', value: '69', change: '+12%', icon: FiFileText, color: 'blue' },
          { title: 'Pending Quotes', value: '15', change: '-2%', icon: FiClock, color: 'yellow' },
          { title: 'Completed', value: '48', change: '+8%', icon: FiCheckCircle, color: 'green' },
          { title: 'In Progress', value: '4', change: '+1%', icon: FiTrendingUp, color: 'purple' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'text-blue-600 bg-blue-100',
            green: 'text-green-600 bg-green-100',
            yellow: 'text-yellow-600 bg-yellow-100',
            purple: 'text-purple-600 bg-purple-100',
          }[stat.color];

          const changeColor = stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600';

          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${changeColor}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Projects Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Projects Overview</h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Last quarter</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {statusData.map((status, index) => (
              <div key={status.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-gray-600">{status.name}</span>
                <span className="text-sm font-semibold ml-auto">{status.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Last quarter</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { icon: FiPlus, label: 'Create Quotation', color: 'blue', description: 'Generate new quote' },
              { icon: FiUsers, label: 'Add Client', color: 'green', description: 'Register new client' },
              { icon: FiFileText, label: 'New Project', color: 'purple', description: 'Start project' },
              { icon: FiBarChart2, label: 'View Reports', color: 'orange', description: 'Analytics & insights' },
              { icon: FiSettings, label: 'Settings', color: 'gray', description: 'Platform settings' },
            ].map((action, index) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
                green: 'text-green-600 bg-green-100 hover:bg-green-200',
                purple: 'text-purple-600 bg-purple-100 hover:bg-purple-200',
                orange: 'text-orange-600 bg-orange-100 hover:bg-orange-200',
                gray: 'text-gray-600 bg-gray-100 hover:bg-gray-200',
              }[action.color];

              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${colorClasses} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">{action.label}</span>
                    <span className="text-xs text-gray-500">{action.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                  <div className={`p-2 rounded-lg ${getActivityIconColor(activity.type)} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;