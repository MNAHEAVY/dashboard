import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const sortedProductos = productos
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    setFilteredProductos(sortedProductos);
  }, [searchTerm, productos]);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://iphonecaseoberab-production.up.railway.app/product/${id}`,
        {
          method: "DELETE", // Cambia el método a DELETE
        }
      );

      if (response.ok) {
        toast.success("¡Producto borrado!");
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto._id !== id)
        );
      } else {
        toast.error("¡Error al borrar el producto!");
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    await deleteProduct(id); // Llama a la función deleteProduct en lugar de updateProduct
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      <ToastContainer />
      <div className='mb-4 flex justify-center'>
        <input
          type='text'
          placeholder='Buscar por nombre...'
          value={searchTerm}
          onChange={handleSearchChange}
          className=' p-2 border border-gray-300 rounded-md w-full max-w-sm'
        />
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Imagen
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Nombre
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Disponibilidad
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Borrar
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredProductos.map((producto) => (
              <tr key={producto._id} className='text-sm'>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <img
                    alt={producto.nombre}
                    src={producto.imagenGeneral?.[0]}
                    className='h-10 w-10 rounded-full bg-gray-50'
                  />
                </td>
                <td className='px-3 py-2 whitespace-nowrap'>{producto.nombre}</td>

                <td className='px-3 py-2 whitespace-nowrap text-sm'>
                  {producto.stockGeneral}
                </td>

                <td className='px-3 py-2 whitespace-nowrap text-sm'>
                  {producto.disponible ? "Si" : "No"}
                </td>

                <td className='px-3 py-2 whitespace-nowrap'>
                  <button
                    onClick={() => handleDeleteClick(producto._id)}
                    className='text-xs bg-red-500 text-white px-2 py-1 rounded'
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
