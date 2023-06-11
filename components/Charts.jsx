import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const MyPieChart = () => {
  const data = [
    { name: 'Page A', views: 4000 },
    { name: 'Page B', views: 3000 },
    { name: 'Page C', views: 2000 },
    { name: 'Page D', views: 2780 },
    { name: 'Page E', views: 1890 },
    { name: 'Page F', views: 2390 },
    { name: 'Page G', views: 3490 },
  ]
  return (
    <ResponsiveContainer aspect={1.5}>
      <PieChart width="80%" height="80%">
        <Pie
          dataKey="views"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
export const MyBarChart = () => {
  const data = [
    { name: 'Page A', views: 4000, Sales: 2400, amt: 2400 },
    { name: 'Page B', views: 3000, Sales: 1398, amt: 2210 },
    { name: 'Page C', views: 2000, Sales: 9800, amt: 2290 },
    { name: 'Page D', views: 2780, Sales: 3908, amt: 2000 },
    { name: 'Page E', views: 1890, Sales: 4800, amt: 2181 },
    { name: 'Page F', views: 2390, Sales: 3800, amt: 2500 },
    { name: 'Page G', views: 3490, Sales: 4300, amt: 2100 },
  ]
  return (
    <ResponsiveContainer aspect={1.5}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="views" barSize={10} fill="#587fdb" />
        <Bar dataKey="Sales" barSize={10} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export const MyLineChart = () => {
  const data = [
    { name: 'Page A', views: 4000, Sales: 2400, amt: 2400 },
    { name: 'Page B', views: 3000, Sales: 1398, amt: 2210 },
    { name: 'Page C', views: 2000, Sales: 9800, amt: 2290 },
    { name: 'Page D', views: 2780, Sales: 3908, amt: 2000 },
    { name: 'Page E', views: 1890, Sales: 4800, amt: 2181 },
    { name: 'Page F', views: 2390, Sales: 3800, amt: 2500 },
    { name: 'Page G', views: 3490, Sales: 4300, amt: 2100 },
  ]
  return (
    <ResponsiveContainer aspect={1.5}>
      <LineChart width={400} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amt" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
