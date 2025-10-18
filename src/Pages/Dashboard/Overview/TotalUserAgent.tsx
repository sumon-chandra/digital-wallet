import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { TotalUserAgentProps } from "@/types/overview.type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const TotalUserAgent: React.FC<TotalUserAgentProps> = ({
  users,
  agents,
  transactions,
  commissions,
}) => {
  const stats = [
    { label: "Users", value: users.length, color: "#E60076" },
    { label: "Agents", value: agents.length, color: "#FF7F50" },
    { label: "Transactions", value: transactions, color: "#4CAF50" },
    {
      label: "Agents Total Commission",
      value: commissions.reduce((sum, c) => sum + c.amount, 0),
      color: "#2196F3",
    },
  ];

  const chartData = {
    labels: stats.map((s) => s.label),
    datasets: [
      {
        label: "Count",
        data: stats.map((s) => s.value),
        backgroundColor: stats.map((s) => s.color),
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Admin Overview" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Card className="bg-card text-card-foreground shadow-md p-4">
      <CardHeader>
        <CardTitle>Admin Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-card text-card-foreground shadow-sm"
            >
              <CardHeader>
                <CardTitle>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {stat.value}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart.js Bar Chart */}
        <div className="mt-6">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalUserAgent;
