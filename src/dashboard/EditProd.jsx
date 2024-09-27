import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProdEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [prodEd, setProdEd] = useState({
    imagenGeneral: [],
    color: [],
    modelo: [],
    almacenamiento: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://iphonecaseoberab-production.up.railway.app/product/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProdEd(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/deqxuoyrc/image/upload`,
        formData
      );
      setSelectedImage(res.data.secure_url); // ImagenGeneral subida exitosamente
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagenGeneral, intente de nuevo");
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  const addImageToProduct = () => {
    if (selectedImage) {
      setProdEd({
        ...prodEd,
        imagenGeneral: [...prodEd.imagenGeneral, selectedImage],
      });

      setSelectedImage(null);
    }
  };
  const removeImageFromProduct = (indexToRemove) => {
    setProdEd({
      ...prodEd,
      imagenGeneral: prodEd.imagenGeneral.filter((_, index) => index !== indexToRemove),
    });
  };

  function handleChange(e) {
    setProdEd({
      ...prodEd,
      [e.target.name]: e.target.value,
    });
  }

  // Manejadores del color
  const handleImageUploadColor = (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    axios
      .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        handleColorChangeB(index, "imageColor", imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };

  const handleColorChangeB = (index, name, value) => {
    const newColor = [...prodEd.color];
    newColor[index] = { ...newColor[index], [name]: value };
    setProdEd({ ...prodEd, color: newColor });
  };

  function handleColorChange(e, index) {
    const updatedColors = [...prodEd.color];
    updatedColors[index] = { ...updatedColors[index], [e.target.name]: e.target.value };
    setProdEd({
      ...prodEd,
      color: updatedColors,
    });
  }

  function handleRemoveColor(index) {
    const updatedColors = [...prodEd.color];
    updatedColors.splice(index, 1);
    setProdEd({
      ...prodEd,
      color: updatedColors,
    });
  }

  function handleAddColor() {
    setProdEd({
      ...prodEd,
      color: [...prodEd.color, { nombre: "", imageColor: "", stockColor: 0, estado: "" }],
    });
  }

  // Manejadores del modelo
  const handleImageUploadModel = (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    axios
      .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        handleModelChangeB(index, "imageModel", imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };

  const handleModelChangeB = (index, name, value) => {
    const newmodel = [...prodEd.modelo];
    newmodel[index] = { ...newmodel[index], [name]: value };
    setProdEd({ ...prodEd, modelo: newmodel });
  };

  function handleModelChange(e, index) {
    const updatedmodels = [...prodEd.modelo];
    updatedmodels[index] = { ...updatedmodels[index], [e.target.name]: e.target.value };
    setProdEd({
      ...prodEd,
      modelo: updatedmodels,
    });
  }

  function handleRemoveModel(index) {
    const updatedmodels = [...prodEd.modelo];
    updatedmodels.splice(index, 1);
    setProdEd({
      ...prodEd,
      modelo: updatedmodels,
    });
  }

  function handleAddModel() {
    setProdEd({
      ...prodEd,
      modelo: [
        ...prodEd.modelo,
        { nombre: "", precio: 0, imageModel: "", stockModel: 0, estado: "" },
      ],
    });
  }

  // Manejadores del almacenamiento
  function handleAlmacenamientoChange(e, index) {
    const updatedAlmacenamientos = [...prodEd.almacenamiento];
    updatedAlmacenamientos[index] = {
      ...updatedAlmacenamientos[index],
      [e.target.name]: e.target.value,
    };
    setProdEd({
      ...prodEd,
      almacenamiento: updatedAlmacenamientos,
    });
  }

  function handleRemoveAlmacenamiento(index) {
    const updatedAlmacenamientos = [...prodEd.almacenamiento];
    updatedAlmacenamientos.splice(index, 1);
    setProdEd({
      ...prodEd,
      almacenamiento: updatedAlmacenamientos,
    });
  }

  function handleAddAlmacenamiento() {
    setProdEd({
      ...prodEd,
      almacenamiento: [
        ...prodEd.almacenamiento,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "",
        },
      ],
    });
  }

  // Función para actualizar el producto
  const updateProduct = async (id, updatedProduct) => {
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
        toast.error("¡Fallo la actualización!");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await updateProduct(id, prodEd); // Llamamos a la función de actualización
  }
  return (
    <div className='mx-auto p-4 bg-slate-200'>
      <ToastContainer />
      <div className='grid grid-cols-1 gap-4'>
        <div>
          <h3 className='text-center text-2xl font-semibold mb-6'>Editor de Productos</h3>
        </div>
      </div>
      <div className='flex flex-col px-6 pt-6 gap-3 items-center  '>
        <label htmlFor='formFile' className='block font-medium py-2'>
          Imagen/es del Producto
        </label>
        <div className='flex gap-3 items-center'>
          <input
            className='block w-auto h-8 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
            type='file'
            id='formFile'
            onChange={handleImageUpload}
          />
          <button
            type='button'
            className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded'
            onClick={addImageToProduct}
            disabled={loading} // Deshabilitar el botón mientras carga
          >
            {loading ? "Subiendo..." : "Agregar imagen al producto"}
          </button>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className='flex flex-wrap justify-center items-center gap-4 mt-4 py-4'>
        {prodEd?.imagenGeneral.map((imgUrl, index) => (
          <div key={index} className='image-item'>
            {" "}
            <img
              key={index}
              src={imgUrl}
              alt='Uploaded'
              className='w-[120px] h-[150px] object-cover border border-gray-300 rounded-lg'
            />{" "}
            <button
              onClick={() => removeImageFromProduct(index)}
              className='top-4 right-4 flex items-center justify-center w-6 h-6 text-white rounded-full bg-red-600'
            >
              X
            </button>
          </div>
        ))}
      </div>
      <hr></hr>
      <div className='flex mx-auto p-4'>
        <div className='mx-auto'>
          <form onSubmit={(e) => handleSubmit(e)} className='space-y-6'>
            <div>
              <label className='block font-medium'>*Categorias</label>
              <select
                className='w-full border border-gray-300 rounded-md p-2'
                value={prodEd.categorias}
                name='categorias'
                onChange={(e) => handleChange(e)}
              >
                <option disabled>Elige</option>
                <option value={"Iphone"}>iPhone</option>
                <option value={"Accesorios"}>iPad</option>
                <option value={"Watch"}>Mac</option>
                <option value={"Airpods"}>AirPods</option>
                <option value={"Baterias"}>Apple Watch</option>
                <option value={"Modulos"}>Accesorios</option>
                <option value={"Tapa trasera"}>Otros</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>*Subcategoria</label>
              <select
                className='w-full border border-gray-300 rounded-md p-2'
                value={prodEd.subCategoria}
                name='subCategoria'
                onChange={(e) => handleChange(e)}
              >
                <option disabled>Elige</option>
                <option value={"iPhone 16"}>iPhone 16</option>
                <option value={"iPhone 15"}>iPhone 15</option>
                <option value={"iPhone 14"}>iPhone 14</option>
                <option value={"iPhone SE"}>iPhone SE</option>
                <option value={"iPhone 13"}>iPhone 13</option>
                <option value={"iPad Pro"}>iPad Pro</option>
                <option value={"iPad Air"}>iPad Air</option>
                <option value={"iPad"}>iPad</option>
                <option value={"iPad mini"}>iPad mini</option>
                <option value={"MacBook Air"}>MacBook Air</option>
                <option value={"MacBook Pro"}>MacBook Pro</option>
                <option value={"iMac"}>iMac</option>
                <option value={"Mac mini"}>Mac mini</option>
                <option value={"Mac Studio"}>Mac Studio</option>
                <option value={"Mac Pro"}>Mac Pro</option>
                <option value={"Apple Watch Series 9"}>Apple Watch Series 9</option>
                <option value={"Apple Watch Ultra"}>Apple Watch Ultra</option>
                <option value={"Apple Watch SE"}>Apple Watch SE</option>
                <option value={"AirPods Pro"}>AirPods Pro</option>
                <option value={"AirPods (3ª generación)"}>AirPods (3ª generación)</option>
                <option value={"AirPods Max"}>AirPods Max</option>
                <option value={"Fundas"}>Fundas y protectores</option>
                <option value={"Glass"}>Glass</option>
                <option value={"Energia y Cables"}>Cargadores y adaptadores</option>
                <option value={"Correas"}>Correas para Apple Watch</option>
                <option value={"Teclados, ratones y trackpads"}>
                  Teclados, ratones y trackpads
                </option>
                <option value={"AirTag"}>AirTag</option>{" "}
              </select>
            </div>

            <div>
              <label className='block font-medium'>Nombre</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2'
                type='text'
                value={prodEd.nombre}
                name='nombre'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className='block font-medium'>Marca</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2'
                type='text'
                value={prodEd.marca}
                name='marca'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className='block font-medium'>Descripcion</label>
              <textarea
                className='w-full border border-gray-300 rounded-md p-2'
                value={prodEd.descripcion}
                name='descripcion'
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>

            <div>
              <label className='block font-medium'>*Stock General</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2'
                type='number'
                value={prodEd.stockGeneral}
                name='stockGeneral'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className='block font-medium'>Estado</label>
              <select
                className='w-full border border-gray-300 rounded-md p-2'
                value={prodEd.estado}
                name='estado'
                onChange={(e) => handleChange(e)}
              >
                <option disabled>Elige</option>
                <option value={"nuevo"}>Nuevo</option>
                <option value={"swap"}>Swap</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Precio</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2'
                type='number'
                value={prodEd.precioBase}
                name='precioBase'
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className='block font-medium'>Disponible</label>
              <select
                className='w-full border border-gray-300 rounded-md p-2'
                value={prodEd.disponible}
                name='disponible'
                onChange={(e) => handleChange(e)}
              >
                <option disabled>Elige</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div>
              <label className='block font-medium'>Tipo</label>
              <input
                className='w-full border border-gray-300 rounded-md p-2'
                type='text'
                value={prodEd.tipo}
                name='tipo'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <hr></hr>
            <div className='mb-6'>
              <strong>Color/es</strong>
              <div className='flex flex-wrap gap-4'>
                {prodEd.color.length > 0 ? (
                  prodEd.color.map((color, index) => (
                    <div
                      key={index}
                      className='p-4 border border-gray-300 rounded-md w-auto'
                    >
                      <label className='block font-medium'>Nombre</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='nombre'
                        value={color.nombre}
                        onChange={(e) => handleColorChange(e, index)}
                      />
                      <label className='block font-medium mt-2'>Imagen</label>
                      <input
                        type='file'
                        className='w-full border border-gray-300 rounded-md p-2'
                        onChange={(e) => handleImageUploadColor(index, e)}
                      />
                      {color.imageColor && (
                        <img
                          src={color.imageColor}
                          alt='Uploaded'
                          className='w-24 mt-2 rounded-md'
                        />
                      )}
                      <label className='block font-medium mt-2'>Stock</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='stockColor'
                        value={color.stockColor}
                        onChange={(e) => handleColorChange(e, index)}
                      />
                      <label className='block font-medium mt-2'>Estado</label>
                      <select
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='estado'
                        value={color.estado}
                        onChange={(e) => handleColorChange(e, index)}
                      >
                        <option disabled>Elige</option>
                        <option value={"nuevo"}>Nuevo</option>
                        <option value={"swap"}>Swap</option>
                      </select>
                      <button
                        className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
                        onClick={() => handleRemoveColor(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay colores disponibles</p>
                )}
              </div>
              <button
                className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-md'
                onClick={handleAddColor}
              >
                Agregar Color
              </button>
            </div>
            <hr></hr>
            <div className='mb-6'>
              <strong>Modelo/s</strong>
              <div className='flex flex-wrap gap-4'>
                {prodEd.modelo.length > 0 ? (
                  prodEd.modelo.map((model, index) => (
                    <div key={index} className='p-4 border border-gray-300 rounded-md'>
                      <label className='block font-medium'>Nombre</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='text'
                        name='nombre'
                        value={model.nombre}
                        onChange={(e) => handleModelChange(e, index)}
                      />
                      <label className='block font-medium mt-2'>Precio</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='precio'
                        value={model.precio}
                        onChange={(e) => handleModelChange(e, index)}
                      />
                      <label className='block font-medium mt-2'>Stock</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='stockModel'
                        value={model.stockModel}
                        onChange={(e) => handleModelChange(e, index)}
                      />
                      <label className='block font-medium mt-2'>Disponible</label>
                      <select
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='disponible'
                        value={model.disponible}
                        onChange={(e) => handleModelChange(e, index)}
                      >
                        <option disabled>Elige</option>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                      <label className='block font-medium mt-2'>Imagen</label>
                      <input
                        type='file'
                        className='w-full border border-gray-300 rounded-md p-2'
                        onChange={(e) => handleImageUploadModel(index, e)}
                      />
                      {model.imageModel && (
                        <img
                          src={model.imageModel}
                          alt='Uploaded'
                          className='w-24 mt-2 rounded-md'
                        />
                      )}
                      <button
                        className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
                        onClick={() => handleRemoveModel(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay modelos disponibles</p>
                )}
              </div>
              <button
                className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-md'
                onClick={handleAddModel}
              >
                Agregar Modelo
              </button>
            </div>
            <hr></hr>
            <div className='mb-6'>
              <strong>Almacenamiento/s</strong>
              <div className='flex flex-wrap gap-4'>
                {prodEd.almacenamiento.length > 0 ? (
                  prodEd.almacenamiento.map((almacenamiento, index) => (
                    <div key={index} className='p-4 border border-gray-300 rounded-md'>
                      <label className='block font-medium'>Capacidad</label>
                      <select
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='capacidad'
                        value={almacenamiento.capacidad}
                        onChange={(e) => handleAlmacenamientoChange(e, index)}
                      >
                        <option disabled>Seleccione</option>
                        <option value='64 GB'>64GB</option>
                        <option value='128 GB'>128GB</option>
                        <option value='256 GB'>256GB</option>
                        <option value='512 GB'>512GB</option>
                        <option value='1024 GB'>1024GB</option>
                      </select>

                      <label className='block font-medium mt-2'>Precio</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='precio'
                        value={almacenamiento.precio}
                        onChange={(e) => handleAlmacenamientoChange(e, index)}
                      />

                      <label className='block font-medium mt-2'>Stock</label>
                      <input
                        className='w-full border border-gray-300 rounded-md p-2'
                        type='number'
                        name='stockStorage'
                        value={almacenamiento.stockStorage}
                        onChange={(e) => handleAlmacenamientoChange(e, index)}
                      />

                      <label className='block font-medium mt-2'>Disponible</label>
                      <select
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='disponible'
                        value={almacenamiento.disponible}
                        onChange={(e) => handleAlmacenamientoChange(e, index)}
                      >
                        <option disabled>Elige</option>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>

                      <label className='block font-medium mt-2'>Estado</label>
                      <select
                        className='w-full border border-gray-300 rounded-md p-2'
                        name='estado'
                        value={almacenamiento.estado}
                        onChange={(e) => handleAlmacenamientoChange(e, index)}
                      >
                        <option disabled>Elige</option>
                        <option value={"nuevo"}>Nuevo</option>
                        <option value={"swap"}>Swap</option>
                      </select>

                      <button
                        className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
                        onClick={() => handleRemoveAlmacenamiento(index)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay almacenamientos disponibles</p>
                )}
              </div>

              <button
                className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-md'
                onClick={handleAddAlmacenamiento}
              >
                Agregar almacenamiento
              </button>
            </div>
            <hr></hr>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button
                className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                type='submit'
              >
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
