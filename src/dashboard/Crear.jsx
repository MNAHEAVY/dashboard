import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Crear() {
  const initialFormState = {
    categorias: "",
    subCategoria: "",
    nombre: "",
    marca: "",
    descripcion: "",
    imagenGeneral: [],
    stockGeneral: 0,
    estado: "",
    precioBase: 0,
    disponible: false,
    tipo: "",
    color: [{ nombre: "", imageColor: "", stockColor: 0, estado: "" }],
    almacenamiento: [],
    modelo: [],
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(initialFormState);
  console.log(inputForm);

  function handleChange(e) {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  }

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
      setInputForm({
        ...inputForm,
        imagenGeneral: [...inputForm.imagenGeneral, selectedImage],
      });

      setSelectedImage(null);
    }
  };
  const removeImageFromProduct = (indexToRemove) => {
    setInputForm({
      ...inputForm,
      imagenGeneral: inputForm.imagenGeneral.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  /*manejadores de color*/
  const handleImageUploadColor = (index, event) => {
    const file = event.target.files[0];
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
    const newColor = [...inputForm.color];
    newColor[index][name] = value;
    setInputForm({ ...inputForm, color: newColor });
  };
  const handleColorChange = (index, event) => {
    const newColor = [...inputForm.color];
    newColor[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, color: newColor });
  };
  const addColor = () => {
    setInputForm({
      ...inputForm,
      color: [
        ...inputForm.color,
        { nombre: "", imageColor: "", stockColor: 0, estado: "" },
      ],
    });
  };
  const removeColor = (index) => {
    const newColor = [...inputForm.color];
    newColor.splice(index, 1);
    setInputForm({ ...inputForm, color: newColor });
  };

  /*manejadores de modelo*/
  const handleImageUploadModel = (index, event) => {
    const file = event.target.files[0];
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

  const handleModelChange = (index, event) => {
    const newModel = [...inputForm.modelo];
    newModel[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, modelo: newModel });
  };
  const handleModelChangeB = (index, name, value) => {
    const newModel = [...inputForm.modelo];
    newModel[index][name] = value;
    setInputForm({ ...inputForm, modelo: newModel });
  };
  const addModel = () => {
    setInputForm({
      ...inputForm,
      modelo: [
        ...inputForm.modelo,
        {
          nombre: "",
          precio: 0,
          stockModel: 0,
          disponible: false,
          imageModel: "",
        },
      ],
    });
  };
  const removeModel = (index) => {
    const newModel = [...inputForm.modelo];
    newModel.splice(index, 1);
    setInputForm({ ...inputForm, modelo: newModel });
  };

  /*manejadores de alamcenamiento*/
  const handleStorageChange = (index, event) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };
  const handleStorageChangeB = (index, name, value) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage[index][name] = value;
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };
  const addStorage = () => {
    setInputForm({
      ...inputForm,
      almacenamiento: [
        ...inputForm.almacenamiento,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "",
        },
      ],
    });
  };
  const removeStorage = (index) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage.splice(index, 1);
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página

    try {
      // Envío de datos al backend
      await axios.post(
        "https://iphonecaseoberab-production.up.railway.app/products",
        inputForm
      );

      // Mostrar éxito
      toast.success("Producto creado con éxito.");

      // Resetear formulario solo si es exitoso
      setInputForm(initialFormState);
    } catch (error) {
      // Manejar error
      toast.error("Error al crear el producto.");
    }
  };

  return (
    <div className='relative isolate overflow-hidden bg-white px-6 pb-6 lg:overflow-visible lg:px-0'>
      <h2 className='text-center font-semibold leading-7 text-gray-900 '>
        Agregar producto Nuevo
      </h2>
      <p className='text-center mt-1 text-sm leading-6 text-gray-600'>
        Verifica bien los datos antes de guardar.
      </p>
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
        {inputForm?.imagenGeneral.map((imgUrl, index) => (
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
      <ToastContainer />

      <form
        className='px-24'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4'>
              {/* Categoria */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='categorias'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Categoría
                </label>
                <div className='mt-2'>
                  <select
                    id='categorias'
                    name='categorias'
                    value={inputForm.categorias}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option>Elige</option>
                    <option value={"Iphone"}>iPhone</option>
                    <option value={"Accesorios"}>iPad</option>
                    <option value={"Watch"}>Mac</option>
                    <option value={"Airpods"}>AirPods</option>
                    <option value={"Airpods"}>EarPods</option>
                    <option value={"Baterias"}>Apple Watch</option>
                    <option value={"Modulos"}>Accesorios</option>
                    <option value={"Tapa trasera"}>Otros</option>
                  </select>
                </div>
              </div>
              {/* SubCategoria */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='categoria'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  SubCategoría
                </label>
                <div className='mt-2'>
                  <select
                    id='subCategoria'
                    name='subCategoria'
                    value={inputForm.subCategoria}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option>Elige</option>
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
                    <option value={"AirPods (3ª generación)"}>
                      AirPods (3ª generación)
                    </option>
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
              </div>
              {/* Nombre */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='nombre'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <input
                    id='nombre'
                    type='text'
                    name='nombre'
                    placeholder='Por Ej. iPhone 15 Pro Max'
                    value={inputForm.nombre}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
              {/* Marca */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='marca'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Marca
                </label>
                <div className='mt-2'>
                  <input
                    id='marca'
                    type='text'
                    name='marca'
                    placeholder='Por Ej. Apple'
                    value={inputForm.marca}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
              {/* Descripcion */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='nombre'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Descripcion
                </label>
                <div className='mt-2'>
                  <input
                    id='descripcion'
                    type='text'
                    name='descripcion'
                    placeholder='Por Ej. Apple'
                    value={inputForm.descripcion}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
              {/* Stock */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='nombre'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Stock
                </label>
                <div className='mt-2'>
                  <input
                    id='stockGeneral'
                    type='number'
                    name='stockGeneral'
                    placeholder='Por Ej. Apple'
                    value={inputForm.stockGeneral}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
              {/* Estado */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='estado'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Estado
                </label>
                <div className='mt-2'>
                  <select
                    id='estado'
                    name='estado'
                    value={inputForm.estados}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option>Elige</option>
                    <option value={"nuevo"}>Nuevo</option>
                    <option value={"swap"}>Swap</option>
                  </select>
                </div>
              </div>
              {/* Precio */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='precioBase'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Precio
                </label>
                <div className='mt-2'>
                  <input
                    id='precioBase'
                    type='number'
                    name='precioBase'
                    placeholder='Por Ej. 23'
                    value={inputForm.precioBase}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
              {/* Disponible */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='disponible'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Disponible
                </label>
                <div className='mt-2'>
                  <select
                    id='disponible'
                    name='disponible'
                    value={inputForm.disponible}
                    onChange={(e) => handleChange(e)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option>Elige</option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <strong className='text-center block mb-2'>Seccion color del producto</strong>
          <p className='text-sm mb-4'>
            *Detalle según el título el color que quiere disponer
          </p>
        </div>

        {inputForm.color.map((color, index) => (
          <div className='mb-4 flex flex-col space-y-2' key={index}>
            <label className='text-sm font-medium'>Nombre</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='text'
              name='nombre'
              value={color.nombre}
              onChange={(event) => handleColorChange(index, event)}
            />

            <label className='text-sm font-medium'>Imagen</label>
            <input
              type='file'
              className='border border-gray-300 rounded p-2'
              onChange={(event) => handleImageUploadColor(index, event)}
            />

            {color.imageColor && (
              <div className='mt-2'>
                <img
                  src={color.imageColor}
                  alt='Uploaded'
                  className='w-24 h-24 object-cover rounded'
                />
              </div>
            )}

            <label className='text-sm font-medium'>Stock</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='number'
              name='stockColor'
              value={color.stockColor}
              onChange={(event) => handleColorChange(index, event)}
            />

            <label className='text-sm font-medium'>Estado</label>
            <select
              className='border border-gray-300 rounded p-2'
              name='estado'
              value={color.estado}
              onChange={(event) => handleColorChange(index, event)}
            >
              <option>Seleccione</option>
              <option value='nuevo'>Nuevo</option>
              <option value='swap'>Swap</option>
            </select>

            <button
              className='bg-red-500 text-white rounded py-2 mt-2'
              type='button'
              onClick={() => removeColor(index)}
            >
              Eliminar color
            </button>
          </div>
        ))}

        <button
          className='bg-green-500 text-white rounded py-2 mt-4'
          type='button'
          onClick={addColor}
        >
          Añadir color
        </button>

        <div className='mt-6'>
          <strong className='text-center block mb-2'>Seccion modelo del producto</strong>
          <p className='text-sm mb-4'>
            *En caso que el producto cuente con uno o varios modelos pulse añadir, de lo
            contrario omita.
          </p>
        </div>

        {inputForm.modelo.map((model, index) => (
          <div className='mb-4 flex flex-col space-y-2' key={index}>
            <label className='text-sm font-medium'>Modelo</label>
            <select
              className='border border-gray-300 rounded p-2'
              value={model.nombre}
              name='nombre'
              onChange={(event) => handleModelChange(index, event)}
            >
              <option>Seleccione</option>
              <option value='Generico'>Generico</option>
              <option value='14 Pro Max'>16 Pro Max</option>
              <option value='14 Pro Max'>16 Pro</option>
              <option value='14 Pro Max'>16 </option>
              <option value='14 Pro Max'>15 Pro Max</option>
              <option value='14 Pro Max'>15 Pro</option>
              <option value='14 Pro Max'>15 </option>
              <option value='14 Pro Max'>14 Pro Max</option>
              <option value='14 Pro'>14 Pro</option>
              <option value='14 Plus'>14 Plus</option>
              <option value='14'>14</option>
              <option value='13 Pro Max'>13 Pro Max</option>
              <option value='13 Pro'>13 Pro</option>
              <option value='13 Mini'>13 Mini</option>
              <option value='13'>13</option>
              <option value='12 Pro Max'>12 Pro Max</option>
              <option value='12 Pro'>12 Pro</option>
              <option value='12 Mini'>12 Mini</option>
              <option value='12'>12</option>
              <option value='11 Pro Max'>11 Pro Max</option>
              <option value='11 Pro'>11 Pro</option>
              <option value='11'>11</option>
              <option value='SE(3rd)'>SE(3rd)</option>
              <option value='SE(2rd)'>SE(2rd)</option>
              <option value='iPhone XS'>iPhone-XS</option>
              <option value='iPhone XS Max'>iPhone-XS Max</option>
              <option value='iPhone XR'>iPhone-XR</option>
            </select>

            <label className='text-sm font-medium'>Precio</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='number'
              name='precio'
              value={model.precio}
              onChange={(event) => handleModelChange(index, event)}
            />

            <label className='text-sm font-medium'>Stock</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='number'
              name='stockModel'
              value={model.stockModel}
              onChange={(event) => handleModelChange(index, event)}
            />

            <label className='text-sm font-medium'>Disponible</label>
            <input
              className='form-checkbox'
              type='checkbox'
              name='disponible'
              checked={model.disponible}
              onChange={(event) =>
                handleModelChangeB(index, event.target.name, event.target.checked)
              }
            />

            <label className='text-sm font-medium'>Imagen</label>
            <input
              type='file'
              className='border border-gray-300 rounded p-2'
              onChange={(event) => handleImageUploadModel(index, event)}
            />

            {model.imageModel && (
              <div className='mt-2'>
                <img
                  src={model.imageModel}
                  alt='Uploaded'
                  className='w-24 h-24 object-cover rounded'
                />
              </div>
            )}

            <button
              className='bg-red-500 text-white rounded py-2 mt-2'
              type='button'
              onClick={() => removeModel(index)}
            >
              Eliminar modelo
            </button>
          </div>
        ))}

        <button
          className='bg-green-500 text-white rounded py-2 mt-4'
          type='button'
          onClick={addModel}
        >
          Añadir modelo
        </button>

        <div className='mt-6'>
          <strong className='text-center block mb-2'>
            Seccion capacidad del producto
          </strong>
          <p className='text-sm mb-4'>
            *En caso que el producto cuente con almacenamiento pulse añadir, de lo
            contrario omita.
          </p>
        </div>

        {inputForm.almacenamiento.map((storage, index) => (
          <div className='mb-4 flex flex-col space-y-2' key={index}>
            <label className='text-sm font-medium'>Capacidad</label>
            <select
              className='border border-gray-300 rounded p-2'
              name='capacidad'
              value={storage.capacidad}
              onChange={(event) => handleStorageChange(index, event)}
            >
              <option>Seleccione</option>
              <option value='64 GB'>64GB</option>
              <option value='128 GB'>128GB</option>
              <option value='256 GB'>256GB</option>
              <option value='512 GB'>512GB</option>
              <option value='1024 GB'>1024GB</option>
            </select>

            <label className='text-sm font-medium'>Precio</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='number'
              name='precio'
              value={storage.precio}
              onChange={(event) => handleStorageChange(index, event)}
            />

            <label className='text-sm font-medium'>Stock</label>
            <input
              className='border border-gray-300 rounded p-2'
              type='number'
              name='stockStorage'
              value={storage.stockStorage}
              onChange={(event) => handleStorageChange(index, event)}
            />

            <label className='text-sm font-medium'>Disponible</label>
            <input
              className='form-checkbox'
              type='checkbox'
              name='disponible'
              checked={storage.disponible}
              onChange={(event) =>
                handleStorageChangeB(index, event.target.name, event.target.checked)
              }
            />

            <label className='text-sm font-medium'>Estado</label>
            <select
              className='border border-gray-300 rounded p-2'
              name='estado'
              value={storage.estado}
              onChange={(event) => handleStorageChange(index, event)}
            >
              <option> Seleccione</option>
              <option value='nuevo'>Nuevo</option>
              <option value='swap'>Swap</option>
            </select>

            <button
              className='bg-red-500 text-white rounded py-2 mt-2'
              type='button'
              onClick={() => removeStorage(index)}
            >
              Eliminar almacenamiento
            </button>
          </div>
        ))}

        <button
          className='bg-green-500 text-white rounded py-2 mt-4'
          type='button'
          onClick={addStorage}
        >
          Añadir almacenamiento
        </button>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}
