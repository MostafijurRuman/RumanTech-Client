"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartColors = ["#116149", "#c98a2e", "#2563eb", "#dc2626", "#7c3aed", "#0891b2"];

function ChartFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card/90 p-4 shadow-sm backdrop-blur">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="h-72">{children}</div>
    </div>
  );
}

export function RevenueLineChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <ChartFrame title="Revenue trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#116149" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function SalesBarChart({ data }: { data: { month: string; orders: number }[] }) {
  return (
    <ChartFrame title="Monthly sales">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="#c98a2e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function OrdersPieChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ChartFrame title="Orders by status">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" innerRadius={58} outerRadius={92} paddingAngle={3}>
            {data.map((_, index) => (
              <Cell key={index} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function UserGrowthAreaChart({ data }: { data: { month: string; users: number }[] }) {
  return (
    <ChartFrame title="User growth">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="users" stroke="#2563eb" fill="#2563eb" fillOpacity={0.16} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
