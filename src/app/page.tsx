"use client";

import { LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const revenueData = [
  { date: "01/01", revenue: 1000 },
  { date: "01/02", revenue: 1200 },
  { date: "01/03", revenue: 800 },
  { date: "01/04", revenue: 1000 },
];

const productData = [
  { name: "Product 01", value: 33.3, color: "#007bff" },
  { name: "Product 02", value: 22.2, color: "#ff7300" },
  { name: "Product 03", value: 22.2, color: "#ffcc00" },
  { name: "Product 04", value: 22.2, color: "#28a745" },
];

export default function Dashboard() {

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent>
              <p className="text-sm">Total revenue (month)</p>
              <h2 className="text-2xl font-bold">R$ 1.000,00</h2>
              <p className="text-red-500">-13.5% less than last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm">Orders (month)</p>
              <h2 className="text-2xl font-bold">37</h2>
              <p className="text-red-500">-5.9% less than last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm">Orders (day)</p>
              <h2 className="text-2xl font-bold">4</h2>
              <p className="text-green-500">50% more than last day</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p className="text-sm mb-2">Revenue per day</p>
              <LineChart width={400} height={200} data={revenueData}>
                <Line type="monotone" dataKey="revenue" stroke="#f59e0b" />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p className="text-sm mb-2">Most ordered products</p>
              <PieChart width={200} height={200}>
                <Pie data={productData} dataKey="value" outerRadius={80}>
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
