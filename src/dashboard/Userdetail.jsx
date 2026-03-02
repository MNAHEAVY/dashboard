import { useEffect } from "react";

export default function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  // cerrar con ESC
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const estimatedProfit = (user.stats?.totalSpent || 0) * 0.35;

  const frequency =
    user.stats?.totalOrders > 1
      ? "Recurrente"
      : user.stats?.totalOrders === 1
        ? "Único"
        : "Sin compras";

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='w-full max-w-5xl p-6 bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center gap-4 pb-5 mb-6 border-b'>
          <img
            src={user.picture || "https://i.pravatar.cc/60"}
            className='w-14 h-14 rounded-full'
          />
          <div>
            <h2 className='text-xl font-semibold'>{user.name}</h2>
            <p className='text-gray-400 text-sm'>{user.email}</p>
          </div>

          <button
            onClick={onClose}
            className='ml-auto px-3 py-1 text-sm border rounded-lg hover:bg-gray-100'
          >
            Cerrar
          </button>
        </div>

        {/* GRID */}
        <div className='grid gap-6 md:grid-cols-2'>
          {/* 🔹 Resumen financiero */}
          <Section title='Resumen financiero'>
            <Item label='Total gastado' value={`$${user.stats?.totalSpent || 0}`} />
            <Item label='Ganancia estimada' value={`$${estimatedProfit.toFixed(0)}`} />
            <Item label='Frecuencia' value={frequency} />
            <Item
              label='Última compra'
              value={
                user.stats?.lastPurchaseAt
                  ? new Date(user.stats.lastPurchaseAt).toLocaleDateString()
                  : "—"
              }
            />
          </Section>

          {/* 🔹 Productos */}
          <Section title='Productos comprados'>
            <List items={user.appleProfile?.devices} empty='Sin dispositivos' />
            <Divider />
            <Item label='Accesorios comprados' value={user.stats?.accessories || 0} />
            <Item label='Cross-sell potencial' value='Alto' />
          </Section>

          {/* 🔹 Actividad */}
          <Section title='Actividad'>
            <List items={user.behavior?.viewedProducts} empty='Sin vistas' />
            <Divider />
            <Item label='Carrito' value={user.cart?.length ? "Activo" : "Vacío"} />
            <Item label='Favoritos' value={user.favorites?.length || 0} />
          </Section>

          {/* 🔹 Seguridad */}
          <Section title='Seguridad'>
            <Item label='IP registro' value={user.security?.registerIP || "—"} />
            <Item label='Última IP' value={user.security?.lastIP || "—"} />
            <Divider />
            <Item label='Reembolsos' value={user.security?.refunds || 0} />
            <Item label='Cancelaciones' value={user.security?.cancellations || 0} />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ---------- subcomponentes ---------- */

function Section({ title, children }) {
  return (
    <div className='p-4 border rounded-xl'>
      <h3 className='mb-3 font-semibold'>{title}</h3>
      <div className='space-y-2 text-sm'>{children}</div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div className='flex justify-between text-gray-600'>
      <span>{label}</span>
      <span className='font-medium text-gray-800'>{value}</span>
    </div>
  );
}

function List({ items = [], empty }) {
  if (!items?.length) return <p className='text-gray-400'>{empty}</p>;

  return (
    <div className='flex flex-wrap gap-2'>
      {items.slice(0, 6).map((i, idx) => (
        <span key={idx} className='px-2 py-1 text-xs bg-gray-100 rounded-lg'>
          {typeof i === "string" ? i : "producto"}
        </span>
      ))}
    </div>
  );
}

function Divider() {
  return <div className='my-2 border-t' />;
}
