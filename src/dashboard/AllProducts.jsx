import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const handleInputChange = (e, productId, field) => {
    const value = e.target.value;

    setProductos((prev) =>
      prev.map((product) => {
        if (product._id !== productId) return product;

        const updatedProduct = { ...product };

        if (field === "name" || field === "brand") {
          updatedProduct[field] = value;
        }

        if (field === "totalStock") {
          updatedProduct.totalStock = Number(value) || 0;
        }

        if (field === "displayPrice") {
          const newPrice = Number(value) || 0;
          updatedProduct.variants = (updatedProduct.variants || []).map((variant) => ({
            ...variant,
            price: newPrice,
          }));
        }

        return updatedProduct;
      }),
    );
  };

  const handleSelectChange = (e, productId, field) => {
    const boolValue = e.target.value === "true";

    setProductos((prev) =>
      prev.map((product) =>
        product._id === productId
          ? {
              ...product,
              [field]: boolValue,
            }
          : product,
      ),
    );
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
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://iphonecaseoberab-production.up.railway.app/product/${id}`,
        {
          method: "DELETE", // Cambia el método a DELETE
        },
      );

      if (response.ok) {
        toast.success("¡Producto borrado!");
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto._id !== id),
        );
      } else {
        toast.error("¡Error al borrar el producto!");
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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
  const handleDeleteClick = async (id) => {
    await deleteProduct(id); // Llama a la función deleteProduct en lugar de updateProduct
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
                Subcategoria
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
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Borrar
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 bg-white'>
            {filteredProductos.map((producto, index) => (
              <tr key={producto._id} className='text-sm'>
                <td className='whitespace-nowrap px-3 py-2'>
                  <Link
                    to={`/edit/${producto._id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      alt={producto.name}
                      src={producto.images?.[0] || producto.variants?.[0]?.images?.[0]}
                      className='h-10 w-10 rounded-full bg-gray-50 object-cover'
                    />
                  </Link>
                </td>

                <td className='whitespace-nowrap px-3 py-2'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.name || ""}
                      onChange={(e) => handleInputChange(e, producto._id, "name")}
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
                      value={producto.subCategory || ""}
                      onChange={(e) => handleInputChange(e, producto._id, "subCategory")}
                      className='w-40 rounded-md border-gray-300 px-2 py-1 text-sm font-semibold leading-5 text-gray-900 shadow-sm'
                    />
                  ) : (
                    <p className='text-sm font-semibold leading-5 text-gray-900'>
                      {producto.subCategory}
                    </p>
                  )}
                </td>

                <td className='whitespace-nowrap px-3 py-2'>
                  {editingProductId === producto._id ? (
                    <input
                      type='text'
                      value={producto.brand || ""}
                      onChange={(e) => handleInputChange(e, producto._id, "brand")}
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
                      onChange={(e) => handleInputChange(e, producto._id, "displayPrice")}
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
                      onChange={(e) => handleSelectChange(e, producto._id, "available")}
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
