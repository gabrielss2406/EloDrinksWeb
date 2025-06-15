"use client";

import { ResponsivePie } from '@nivo/pie';
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/shared/Header";
import { useOrderStatistics } from "@/hooks/useOrders";

const COLORS = ["#f97316", "#10b981", "#3b82f6", "#6366f1", "#ec4899"];

export default function Dashboard() {
  const { data, isLoading } = useOrderStatistics();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-blue-100 to-purple-100">
        <div className="flex flex-col items-center gap-4 p-8 bg-white/80 rounded-xl shadow-lg">
          <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span className="text-lg font-semibold text-gray-700">Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span>Nenhum dado disponível.</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Conteúdo Principal */}
      <div className="flex-1">
        <Header name={"Dashboard"} />
        <div className="pl-6">

          {/* Cards com dados principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 pr-6">
            <Card className="shadow-xl rounded-2xl bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-orange-500 text-white p-3 rounded-full shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.104 0-2 .896-2 2v4h4v-4c0-1.104-.896-2-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Valor médio a do pedido (mês)</p>
                  <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    R$ {data.avg_order_value.toFixed(2)}
                  </h2>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl rounded-2xl bg-gradient-to-r from-green-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-green-500 text-white p-3 rounded-full shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 21h6m2 0a2 2 0 002-2v-5H5v5a2 2 0 002 2h10zM6 10V5a2 2 0 012-2h8a2 2 0 012 2v5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Pedidos (mês)</p>
                  <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {data.month_order_count}
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Gráficos de Pizza com Nivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gráfico: Top 5 produtos mais pedidos */}
            <Card className="shadow-xl rounded-2xl">
              <CardContent>
                <p className="text-sm font-semibold text-gray-700 mb-4">Top 5 produtos mais pedidos</p>
                <div className="h-[320px]">
                  <ResponsivePie
                    data={data.top5_items.map((item: { name: string; quantity: number }, index: number) => ({
                      id: item.name,
                      label: item.name,
                      value: item.quantity,
                      color: COLORS[index % COLORS.length],
                    }))}
                    colors={{ datum: 'data.color' }}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={1}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
                    tooltip={({ datum }) => (
                      <div className="bg-white p-2 rounded shadow text-sm">
                        <strong>{datum.label}</strong>: {datum.value}
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gráfico: Estrutura do bar */}
            <Card className="shadow-xl rounded-2xl">
              <CardContent>
                <p className="text-sm font-semibold text-gray-700 mb-4">Estrutura do bar (percentual)</p>
                <div className="h-[320px]">
                  <ResponsivePie
                    data={data.bar_structure_percentage.map((item: { name: string; percentage: number }, index: number) => ({
                      id: item.name,
                      label: item.name,
                      value: item.percentage,
                      color: COLORS[index % COLORS.length],
                    }))}
                    colors={{ datum: 'data.color' }}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={1}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['brighter', 2]] }}
                    tooltip={({ datum }) => (
                      <div className="bg-white p-2 rounded shadow text-sm">
                        <strong>{datum.label}</strong>: {datum.value}%
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
