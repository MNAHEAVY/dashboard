import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Sells() {
  // 🔥 Datos mock (después conectás con backend)
  const kpis = {
    revenueToday: 230000,
    ordersToday: 34,
    averageTicket: 6700,
    newCustomers: 12,
  };

  const salesData = [
    { date: "Lun", revenue: 12000 },
    { date: "Mar", revenue: 18000 },
    { date: "Mié", revenue: 15000 },
    { date: "Jue", revenue: 22000 },
    { date: "Vie", revenue: 27000 },
    { date: "Sáb", revenue: 32000 },
    { date: "Dom", revenue: 25000 },
  ];

  const topProducts = [
    { name: "Funda iPhone 13", sold: 120, revenue: 600000 },
    { name: "Glass iPhone 14", sold: 95, revenue: 285000 },
    { name: "Cargador MagSafe", sold: 80, revenue: 400000 },
  ];

  const topCustomers = [
    { name: "Juan Perez", spent: 120000 },
    { name: "Maria Gomez", spent: 98000 },
    { name: "Carlos Diaz", spent: 87000 },
  ];

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* 🔥 Título */}
      <h1 className='text-2xl font-bold mb-6'>Dashboard de Ventas</h1>

      {/* ================= KPI CARDS ================= */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <Card title='Ingresos Hoy' value={`$${kpis.revenueToday.toLocaleString()}`} />
        <Card title='Pedidos Hoy' value={kpis.ordersToday} />
        <Card title='Ticket Promedio' value={`$${kpis.averageTicket.toLocaleString()}`} />
        <Card title='Clientes Nuevos' value={kpis.newCustomers} />
      </div>

      {/* ================= GRÁFICO ================= */}
      <div className='bg-white p-6 rounded-xl shadow mb-8'>
        <h2 className='text-lg font-semibold mb-4'>Ventas Últimos 7 Días</h2>

        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='revenue' stroke='#3b82f6' strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= TABLAS ================= */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Top Productos */}
        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-lg font-semibold mb-4'>Top Productos</h2>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left border-b'>
                <th className='pb-2'>Producto</th>
                <th>Vendidos</th>
                <th>Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className='border-b last:border-none'>
                  <td className='py-2'>{product.name}</td>
                  <td>{product.sold}</td>
                  <td>${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Clientes */}
        <div className='bg-white p-6 rounded-xl shadow'>
          <h2 className='text-lg font-semibold mb-4'>Top Clientes</h2>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left border-b'>
                <th className='pb-2'>Cliente</th>
                <th>Gastado</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer, index) => (
                <tr key={index} className='border-b last:border-none'>
                  <td className='py-2'>{customer.name}</td>
                  <td>${customer.spent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 🔥 Componente reutilizable para KPI
function Card({ title, value }) {
  return (
    <div className='bg-white p-4 rounded-xl shadow'>
      <h3 className='text-sm text-gray-500'>{title}</h3>
      <p className='text-2xl font-bold mt-2'>{value}</p>
    </div>
  );
}
