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

  const handleEditClick = (id) => {
    setEditingProductId(id);
  };

  const handleInputChange = (e, index, field) => {
    const updatedValue =
      field === "precioBase" ? parseFloat(e.target.value) : e.target.value;
    const updatedProducts = [...productos];
    updatedProducts[index] = { ...updatedProducts[index], [field]: updatedValue };
    setProductos(updatedProducts);
  };

  const handleSelectChange = (e, index, field) => {
    const updatedProducts = [...productos];
    updatedProducts[index][field] = e.target.value === "true";
    setProductos(updatedProducts);
  };

  const updateProduct = async (id, updatedProduct) => {
    console.log(JSON.stringify(updatedProduct));
    try {
      const response = await fetch(
        `https://iphonecaseoberab-production.up.railway.app/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        toast.success("¡Producto actualizado!");
      } else {
        toast.error("¡Fallo la actualizacion!");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
      // Optionally, fetch the updated product list again
      // fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSaveClick = async (id) => {
    const updatedProduct = productos.find((p) => p._id === id);
    await updateProduct(id, updatedProduct);
    setEditingProductId(null);
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
                Marca
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Precio
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Disponibilidad
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filteredProductos.map((producto, index) => (
              <tr key={producto._id} className='text-sm'>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <a
                    href={"/edit/" + producto._id}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      alt={producto.nombre}
                      src={producto.imagenGeneral?.[0]}
                      className='h-10 w-10 rounded-full bg-gray-50'
                    />
                  </a>
                </td>

                <td className='px-3 py-2 whitespace-nowrap'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.nombre}
                      onChange={(e) => handleInputChange(e, index, "nombre")}
                      className='w-28 text-sm font-semibold leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                    />
                  ) : (
                    <p className='text-sm font-semibold leading-5 text-gray-900'>
                      {producto.nombre}
                    </p>
                  )}
                </td>

                <td className='px-3 py-2 whitespace-nowrap'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.marca}
                      onChange={(e) => handleInputChange(e, index, "marca")}
                      className='w-28 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>{producto.marca}</p>
                  )}
                </td>

                <td className='px-3 py-2 whitespace-nowrap text-sm'>
                  {" "}
                  {editingProductId === producto._id ? (
                    <input
                      type='number'
                      value={producto.stockGeneral}
                      onChange={(e) => handleInputChange(e, index, "stockGeneral")}
                      className='w-12 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      {producto.stockGeneral}
                    </p>
                  )}
                </td>

                <td className='px-3 py-2 whitespace-nowrap text-sm'>
                  {editingProductId === producto._id ? (
                    <input
                      type='number'
                      value={producto.precioBase}
                      onChange={(e) => handleInputChange(e, index, "precioBase")}
                      className='w-24 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      ${producto.precioBase}
                    </p>
                  )}
                </td>

                <td className='px-3 py-2 whitespace-nowrap text-sm'>
                  {editingProductId === producto._id ? (
                    <select
                      value={producto.disponible}
                      onChange={(e) => handleSelectChange(e, index, "disponible")}
                      className='w-28 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                    >
                      <option disabled>Elige</option>
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      {producto.disponible ? "Si" : "No"}
                    </p>
                  )}
                </td>
                <td className='px-3 py-2 whitespace-nowrap'>
                  {editingProductId === producto._id ? (
                    <button
                      onClick={() => handleSaveClick(producto._id)}
                      className='text-xs bg-green-500 text-white px-2 py-1 rounded'
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(producto._id)}
                      className='text-xs bg-blue-500 text-white px-2 py-1 rounded'
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
