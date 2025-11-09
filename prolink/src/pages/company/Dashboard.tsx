import { 
  BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, 
  LineChart
} from 'recharts';

const dashboardData = {
  performance: {
    totalRevenue: 8450,
    acceptanceRate: 42,
    activeProjects: 12,
    avgRating: 4.8,
    revenueChange: 18,
    acceptanceChange: 5,
  },
  quoteFunnel: [
    { stage: 'New Requests', count: 25 },
    { stage: 'Proposals Sent', count: 18 },
    { stage: 'Pending Review', count: 10 },
    { stage: 'Accepted', count: 7 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 3800 },
    { month: 'Apr', revenue: 6100 },
    { month: 'May', revenue: 8450 },
  ],
  serviceDistribution: [
    { name: 'Plumbing', value: 35 },
    { name: 'Electrical', value: 25 },
    { name: 'Design', value: 20 },
    { name: 'Other', value: 20 },
  ],
};


export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Page Title */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm">Welcome back! Here's your business overview.</p>
      </div>

      {/* Performance Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${dashboardData.performance.totalRevenue.toLocaleString()}`}
          change={dashboardData.performance.revenueChange}
          subtitle="+18% from last month"
        />
        <MetricCard
          title="Acceptance Rate"
          value={`${dashboardData.performance.acceptanceRate}%`}
          change={dashboardData.performance.acceptanceChange}
          subtitle="+5% from last month"
        />
        <MetricCard
          title="Active Projects"
          value={dashboardData.performance.activeProjects.toString()}
        />
        <MetricCard
          title="Average Rating"
          value={`${dashboardData.performance.avgRating}`}
          subtitle="128 reviews"
        />
      </div>

      {/* Charts and Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
        {/* Quote Funnel Chart */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Pipeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.quoteFunnel}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="stage" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Conversion Rate: <span className="font-semibold">28%</span>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for metric cards
interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  subtitle?: string;
}

function MetricCard({ title, value, change, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}