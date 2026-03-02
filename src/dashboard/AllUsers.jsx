import { useEffect, useState } from "react";
import UserDetailModal from "./Userdetail";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]); // 🔥 iniciar como array
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/users",
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const stateColors = {
    new: "bg-gray-100 text-gray-600",
    active: "bg-blue-100 text-blue-700",
    recurrent: "bg-green-100 text-green-700",
    vip: "bg-purple-100 text-purple-700",
    inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className='p-6 bg-white rounded-2xl shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-xl font-semibold'>Usuarios</h2>

        <input
          placeholder='Buscar usuario...'
          className='px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-black/10'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-auto'>
        <table className='w-full text-sm'>
          <thead className='text-left text-gray-500 border-b'>
            <tr>
              <th className='py-3'>Usuario</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Pedidos</th>
              <th>Última compra</th>
              <th>Carrito</th>
              <th>Nivel</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr key={user._id} className='border-b hover:bg-gray-50 transition'>
                {/* Usuario */}
                <td className='py-4 flex items-center gap-3'>
                  <img
                    src={user.picture || "https://i.pravatar.cc/40"}
                    className='w-9 h-9 rounded-full object-cover'
                  />

                  <div>
                    <p className='font-medium'>{user.name}</p>
                    <p className='text-gray-400 text-xs'>{user.email}</p>
                  </div>
                </td>

                {/* Estado */}
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      stateColors[user.customerState] || stateColors.new
                    }`}
                  >
                    {user.customerState || "new"}
                  </span>
                </td>

                {/* Total */}
                <td className='font-semibold'>${user.stats?.totalSpent || 0}</td>

                {/* Orders */}
                <td>{user.stats?.totalOrders || 0}</td>

                {/* Last purchase */}
                <td className='text-gray-500'>
                  {user.stats?.lastPurchaseAt
                    ? new Date(user.stats.lastPurchaseAt).toLocaleDateString()
                    : "—"}
                </td>

                {/* Cart */}
                <td>
                  {user.behavior?.abandonedCart ? (
                    <span className='text-red-500 font-medium'>Abandonado</span>
                  ) : (
                    <span className='text-gray-400'>—</span>
                  )}
                </td>

                {/* Level */}
                <td>
                  <span className='px-2 py-1 text-xs rounded-lg bg-black text-white'>
                    {user.suscribedLevel || 0}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <button
                    onClick={() => setSelectedUser(user)}
                    className='text-xs px-3 py-1 rounded-lg border hover:bg-gray-100'
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
