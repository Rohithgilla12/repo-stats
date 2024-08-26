"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { StatsData } from "@/types/repo-stats";

export function CodeStatsGraph({ codeStats }: { codeStats: StatsData }) {
  const { theme } = useTheme();

  const processData = (data: any[], limit: number) => {
    const topData = data.slice(0, limit);
    const otherData = data.slice(limit);
    const otherSum = otherData.reduce((sum, item) => sum + item.value, 0);

    if (otherSum > 0) {
      topData.push({ name: "Other", value: otherSum });
    }

    return topData;
  };

  const fileCountData = processData(
    Object.entries(codeStats)
      .filter(([key]) => key !== "SUM" && key !== "header")
      .map(([language, stats]) => ({
        name: language,
        value: stats.nFiles,
      }))
      .sort((a, b) => b.value - a.value),
    5
  );

  const lineCountData = processData(
    Object.entries(codeStats)
      .filter(([key]) => key !== "SUM" && key !== "header")
      .map(([language, stats]) => ({
        name: language,
        value: stats.code,
      }))
      .sort((a, b) => b.value - a.value),
    5
  );

  const COLORS = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#14b8a6", // teal-500
    "#f97316", // orange-500
  ];

  const isDarkMode = theme === "dark";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Languages by File Count</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fileCountData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {fileCountData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number of Files by Language</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fileCountData}>
              <XAxis dataKey="name" stroke={isDarkMode ? "#fff" : "#000"} />
              <YAxis stroke={isDarkMode ? "#fff" : "#000"} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value">
                {fileCountData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Languages by Line Count</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={lineCountData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {lineCountData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// Updated CustomTooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className={`p-2 border rounded shadow ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      >
        <p className="font-bold">{data.name}</p>
        <p>{`${payload[0].name}: ${data.value}`}</p>
      </div>
    );
  }
  return null;
};
