"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Values() {
  const [values, setValues] = useState({});
  const [editingValuesId, setEditingValuesId] = useState(null);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/values",
        );
        const data = await response.json();
        setValues(data);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchValues();
  }, []);

  const handleEditClick = (id) => {
    setEditingValuesId(id);
  };

  const updateValues = async (updatedValues) => {
    try {
      const response = await fetch(
        `https://iphonecaseoberab-production.up.railway.app/values/${values._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedValues),
        },
      );

      if (response.ok) {
        toast.success("¡Valores actualizados!");
      } else {
        toast.error("Error al actualizar");
      }
    } catch (error) {
      console.error("Error updating values:", error);
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setValues((prev) => ({
      ...prev,
      [field]: value === "" ? "" : Number(value), // 🔥 evita strings
    }));
  };

  const handleSaveClick = async () => {
    await updateValues(values);
    setEditingValuesId(null);
  };

  return (
    <div>
      <ToastContainer />

      <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th>Dólar</th>
              <th>Margen</th>
              <th>IVA</th>
              <th>Rentas</th>
              <th>MP</th>
              <th>Flete</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            <tr key={values._id} className='text-sm'>
              {/* DOLAR */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.dolar || ""}
                    onChange={(e) => handleInputChange(e, "dolar")}
                    className='input'
                  />
                ) : (
                  values.dolar
                )}
              </td>

              {/* MARGEN */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    step='0.01'
                    value={values.margen || ""}
                    onChange={(e) => handleInputChange(e, "margen")}
                    className='input'
                  />
                ) : (
                  values.margen
                )}
              </td>

              {/* IVA */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    step='0.01'
                    value={values.iva || ""}
                    onChange={(e) => handleInputChange(e, "iva")}
                    className='input'
                  />
                ) : (
                  values.iva
                )}
              </td>

              {/* RENTAS */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    step='0.01'
                    value={values.rentas || ""}
                    onChange={(e) => handleInputChange(e, "rentas")}
                    className='input'
                  />
                ) : (
                  values.rentas
                )}
              </td>

              {/* MP */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    step='0.01'
                    value={values.mp || ""}
                    onChange={(e) => handleInputChange(e, "mp")}
                    className='input'
                  />
                ) : (
                  values.mp
                )}
              </td>

              {/* FLETE */}
              <td>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.flete || ""}
                    onChange={(e) => handleInputChange(e, "flete")}
                    className='input'
                  />
                ) : (
                  values.flete
                )}
              </td>

              {/* ACCION */}
              <td>
                {editingValuesId === values._id ? (
                  <button
                    onClick={handleSaveClick}
                    className='text-xs bg-green-500 text-white px-2 py-1 rounded'
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(values._id)}
                    className='text-xs bg-blue-500 text-white px-2 py-1 rounded'
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
