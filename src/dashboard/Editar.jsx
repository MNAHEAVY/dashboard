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
          "https://iphonecaseoberab-production.up.railway.app/values"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        }
      );

      if (response.ok) {
        toast.success("¡Values actualizados!");
      } else {
        toast.error("¡Falló la actualización!");
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating values:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: e.target.value,
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
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                dolarBlue
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                costoGeneral
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                flete
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                profit
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                obercoins
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                mp
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                comision
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                tasa
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                rentas
              </th>

              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            <tr key={values._id} className='text-sm'>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.dolarBlue}
                    onChange={(e) => handleInputChange(e, "dolarBlue")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.dolarBlue}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.costoGeneral}
                    onChange={(e) => handleInputChange(e, "costoGeneral")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.costoGeneral}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.flete}
                    onChange={(e) => handleInputChange(e, "flete")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.flete}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.profit}
                    onChange={(e) => handleInputChange(e, "profit")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.profit}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.obercoins}
                    onChange={(e) => handleInputChange(e, "obercoins")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.obercoins}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.mp}
                    onChange={(e) => handleInputChange(e, "mp")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.mp}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.comision}
                    onChange={(e) => handleInputChange(e, "comision")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.comision}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.tasa}
                    onChange={(e) => handleInputChange(e, "tasa")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.tasa}</p>
                )}
              </td>
              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <input
                    type='number'
                    value={values.rentas}
                    onChange={(e) => handleInputChange(e, "rentas")}
                    className='w-16 text-sm leading-5 text-gray-900 border-gray-300 rounded-md shadow-sm px-2 py-1'
                  />
                ) : (
                  <p className='text-sm leading-5 text-gray-900'>{values.rentas}</p>
                )}
              </td>

              <td className='px-3 py-2 whitespace-nowrap'>
                {editingValuesId === values._id ? (
                  <button
                    onClick={() => handleSaveClick(values._id)}
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
