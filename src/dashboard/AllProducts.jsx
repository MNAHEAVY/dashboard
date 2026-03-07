import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getDisplayPrice(producto) {
  if (!producto?.variants?.length) return 0;

  const prices = producto.variants.map((v) => Number(v?.price) || 0).filter((p) => p > 0);

  return prices.length ? Math.min(...prices) : 0;
}

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/products",
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
        producto?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    setFilteredProductos(sortedProductos);
  }, [searchTerm, productos]);

  const handleEditClick = (id) => {
    setEditingProductId(id);
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;

    setProductos((prev) => {
      const updated = [...prev];
      const current = { ...updated[index] };

      if (field === "name" || field === "brand") {
        current[field] = value;
      }

      if (field === "totalStock") {
        current.totalStock = Number(value) || 0;
      }

      if (field === "displayPrice") {
        const newPrice = Number(value) || 0;
        current.variants = (current.variants || []).map((variant) => ({
          ...variant,
          price: newPrice,
        }));
      }

      updated[index] = current;
      return updated;
    });
  };

  const handleSelectChange = (e, index, field) => {
    const boolValue = e.target.value === "true";

    setProductos((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: boolValue,
      };
      return updated;
    });
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const payload = {
        ...updatedProduct,
        totalStock:
          updatedProduct.totalStock ??
          (updatedProduct.variants || []).reduce(
            (acc, variant) => acc + (Number(variant.stock) || 0),
            0,
          ),
      };

      const response = await fetch(
        `https://iphonecaseoberab-production.up.railway.app/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        toast.success("¡Producto actualizado!");
      } else {
        toast.error("¡Falló la actualización!");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
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
          className='w-full max-w-sm rounded-md border border-gray-300 p-2'
        />
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Imagen
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Nombre
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Marca
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Stock
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Precio
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Disponibilidad
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Acción
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 bg-white'>
            {filteredProductos.map((producto, index) => (
              <tr key={producto._id} className='text-sm'>
                <td className='whitespace-nowrap px-3 py-2'>
                  <a
                    href={"/edit/" + producto._id}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      alt={producto.name}
                      src={producto.images?.[0] || producto.variants?.[0]?.images?.[0]}
                      className='h-10 w-10 rounded-full bg-gray-50 object-cover'
                    />
                  </a>
                </td>

                <td className='whitespace-nowrap px-3 py-2'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.name || ""}
                      onChange={(e) => handleInputChange(e, index, "name")}
                      className='w-40 rounded-md border-gray-300 px-2 py-1 text-sm font-semibold leading-5 text-gray-900 shadow-sm'
                    />
                  ) : (
                    <p className='text-sm font-semibold leading-5 text-gray-900'>
                      {producto.name}
                    </p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.brand || ""}
                      onChange={(e) => handleInputChange(e, index, "brand")}
                      className='w-28 rounded-md border-gray-300 px-2 py-1 text-sm leading-5 text-gray-900 shadow-sm'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>{producto.brand}</p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2 text-sm'>
                  {editingProductId === producto._id ? (
                    <input
                      type='number'
                      value={producto.totalStock ?? 0}
                      onChange={(e) => handleInputChange(e, index, "totalStock")}
                      className='w-16 rounded-md border-gray-300 px-2 py-1 text-sm leading-5 text-gray-900 shadow-sm'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      {producto.totalStock ?? 0}
                    </p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2 text-sm'>
                  {editingProductId === producto._id ? (
                    <input
                      type='number'
                      value={getDisplayPrice(producto)}
                      onChange={(e) => handleInputChange(e, index, "displayPrice")}
                      className='w-24 rounded-md border-gray-300 px-2 py-1 text-sm leading-5 text-gray-900 shadow-sm'
                    />
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      ${getDisplayPrice(producto)}
                    </p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2 text-sm'>
                  {editingProductId === producto._id ? (
                    <select
                      value={String(producto.available)}
                      onChange={(e) => handleSelectChange(e, index, "available")}
                      className='w-28 rounded-md border-gray-300 px-2 py-1 text-sm leading-5 text-gray-900 shadow-sm'
                    >
                      <option value='true'>Sí</option>
                      <option value='false'>No</option>
                    </select>
                  ) : (
                    <p className='text-sm leading-5 text-gray-900'>
                      {producto.available ? "Sí" : "No"}
                    </p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2'>
                  {editingProductId === producto._id ? (
                    <button
                      onClick={() => handleSaveClick(producto._id)}
                      className='rounded bg-green-500 px-2 py-1 text-xs text-white'
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(producto._id)}
                      className='rounded bg-blue-500 px-2 py-1 text-xs text-white'
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
