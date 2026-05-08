// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

// export default function Crear() {
//   const initialFormState = {
//     categorias: "",
//     subCategoria: "",
//     nombre: "",
//     marca: "",
//     descripcion: "",
//     imagenGeneral: [],
//     stockGeneral: 0,
//     estado: "",
//     precioBase: 0,
//     disponible: false,
//     tipo: "",
//     color: [{ nombre: "", imageColor: "", stockColor: 0, estado: "" }],
//     almacenamiento: [],
//     modelo: [],
//   };
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [inputForm, setInputForm] = useState(initialFormState);

//   function handleChange(e) {
//     setInputForm({
//       ...inputForm,
//       [e.target.name]: e.target.value,
//     });
//   }

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "bvtkpxxl");

//     try {
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/deqxuoyrc/image/upload`,
//         formData
//       );
//       setSelectedImage(res.data.secure_url); // ImagenGeneral subida exitosamente
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast.error("Error al subir la imagenGeneral, intente de nuevo");
//     } finally {
//       setLoading(false); // Finaliza el loading
//     }
//   };

//   const addImageToProduct = () => {
//     if (selectedImage) {
//       setInputForm({
//         ...inputForm,
//         imagenGeneral: [...inputForm.imagenGeneral, selectedImage],
//       });

//       setSelectedImage(null);
//     }
//   };
//   const removeImageFromProduct = (indexToRemove) => {
//     setInputForm({
//       ...inputForm,
//       imagenGeneral: inputForm.imagenGeneral.filter(
//         (_, index) => index !== indexToRemove
//       ),
//     });
//   };

//   /*manejadores de color*/
//   const handleImageUploadColor = (index, event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "bvtkpxxl");

//     axios
//       .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
//       .then((response) => {
//         const imageUrl = response.data.secure_url;
//         handleColorChangeB(index, "imageColor", imageUrl);
//       })
//       .catch((error) => {
//         console.error("Error uploading image", error);
//       });
//   };
//   const handleColorChangeB = (index, name, value) => {
//     const newColor = [...inputForm.color];
//     newColor[index][name] = value;
//     setInputForm({ ...inputForm, color: newColor });
//   };
//   const handleColorChange = (index, event) => {
//     const newColor = [...inputForm.color];
//     newColor[index][event.target.name] = event.target.value;
//     setInputForm({ ...inputForm, color: newColor });
//   };
//   const addColor = () => {
//     setInputForm({
//       ...inputForm,
//       color: [
//         ...inputForm.color,
//         { nombre: "", imageColor: "", stockColor: 0, estado: "" },
//       ],
//     });
//   };
//   const removeColor = (index) => {
//     const newColor = [...inputForm.color];
//     newColor.splice(index, 1);
//     setInputForm({ ...inputForm, color: newColor });
//   };

//   /*manejadores de modelo*/
//   const handleImageUploadModel = (index, event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "bvtkpxxl");

//     axios
//       .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
//       .then((response) => {
//         const imageUrl = response.data.secure_url;
//         handleModelChangeB(index, "imageModel", imageUrl);
//       })
//       .catch((error) => {
//         console.error("Error uploading image", error);
//       });
//   };

//   const handleModelChange = (index, event) => {
//     const newModel = [...inputForm.modelo];
//     newModel[index][event.target.name] = event.target.value;
//     setInputForm({ ...inputForm, modelo: newModel });
//   };
//   const handleModelChangeB = (index, name, value) => {
//     const newModel = [...inputForm.modelo];
//     newModel[index][name] = value;
//     setInputForm({ ...inputForm, modelo: newModel });
//   };
//   const addModel = () => {
//     setInputForm({
//       ...inputForm,
//       modelo: [
//         ...inputForm.modelo,
//         {
//           nombre: "",
//           precio: 0,
//           stockModel: 0,
//           disponible: false,
//           imageModel: "",
//         },
//       ],
//     });
//   };
//   const removeModel = (index) => {
//     const newModel = [...inputForm.modelo];
//     newModel.splice(index, 1);
//     setInputForm({ ...inputForm, modelo: newModel });
//   };

//   /*manejadores de alamcenamiento*/
//   const handleStorageChange = (index, event) => {
//     const newStorage = [...inputForm.almacenamiento];
//     newStorage[index][event.target.name] = event.target.value;
//     setInputForm({ ...inputForm, almacenamiento: newStorage });
//   };
//   const handleStorageChangeB = (index, name, value) => {
//     const newStorage = [...inputForm.almacenamiento];
//     newStorage[index][name] = value;
//     setInputForm({ ...inputForm, almacenamiento: newStorage });
//   };
//   const addStorage = () => {
//     setInputForm({
//       ...inputForm,
//       almacenamiento: [
//         ...inputForm.almacenamiento,
//         {
//           capacidad: "",
//           precio: 0,
//           stockStorage: 0,
//           disponible: false,
//           estado: "",
//         },
//       ],
//     });
//   };
//   const removeStorage = (index) => {
//     const newStorage = [...inputForm.almacenamiento];
//     newStorage.splice(index, 1);
//     setInputForm({ ...inputForm, almacenamiento: newStorage });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         "https://backend-reino-production.up.railway.app/products",
//         inputForm
//       );
//       toast.success("Producto creado con éxito.");
//       setInputForm(initialFormState);
//     } catch (error) {
//       toast.error("Error al crear el producto.");
//     }
//   };

//   return (
//     <div className='relative isolate overflow-hidden bg-white px-6 pb-6 lg:overflow-visible lg:px-0'>
//       <h2 className='text-center font-semibold leading-7 text-gray-900 '>
//         Agregar producto Nuevo
//       </h2>
//       <p className='text-center mt-1 text-sm leading-6 text-gray-600'>
//         Verifica bien los datos antes de guardar.
//       </p>
//       <div className='flex flex-col px-6 pt-6 gap-3 items-center  '>
//         <label htmlFor='formFile' className='block font-medium py-2'>
//           Imagen/es del Producto
//         </label>
//         <div className='flex gap-3 items-center'>
//           <input
//             className='block w-auto h-8 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
//             type='file'
//             id='formFile'
//             onChange={handleImageUpload}
//           />
//           <button
//             type='button'
//             className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded'
//             onClick={addImageToProduct}
//             disabled={loading} // Deshabilitar el botón mientras carga
//           >
//             {loading ? "Subiendo..." : "Agregar imagen al producto"}
//           </button>
//         </div>
//       </div>

//       {/* Galería de imágenes */}
//       <div className='flex flex-wrap justify-center items-center gap-4 mt-4 py-4'>
//         {inputForm?.imagenGeneral.map((imgUrl, index) => (
//           <div key={index} className='image-item'>
//             {" "}
//             <img
//               key={index}
//               src={imgUrl}
//               alt='Uploaded'
//               className='w-[120px] h-[150px] object-cover border border-gray-300 rounded-lg'
//             />{" "}
//             <button
//               onClick={() => removeImageFromProduct(index)}
//               className='top-4 right-4 flex items-center justify-center w-6 h-6 text-white rounded-full bg-red-600'
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//       <hr></hr>
//       <ToastContainer />

//       <form
//         className='px-24'
//         onSubmit={(e) => {
//           handleSubmit(e);
//         }}
//       >
//         <div className='space-y-12'>
//           <div className='border-b border-gray-900/10 pb-12'>
//             <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4'>
//               {/* Categoria */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='categoria'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Categoría
//                 </label>
//                 <div className='mt-2'>
//                   <select
//                     id='categoria'
//                     name='categoria'
//                     value={inputForm.categorias}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   >
//                     <option disabled>Elige</option>
//                     <option value={"Iphone"}>iPhone</option>
//                     <option value={"Accesorios"}>iPad</option>
//                     <option value={"Watch"}>Mac</option>
//                     <option value={"Airpods"}>AirPods</option>
//                     <option value={"Baterias"}>Apple Watch</option>
//                     <option value={"Modulos"}>Accesorios</option>
//                     <option value={"Tapa trasera"}>Otros</option>
//                   </select>
//                 </div>
//               </div>
//               {/* SubCategoria */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='categoria'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   SubCategoría
//                 </label>
//                 <div className='mt-2'>
//                   <select
//                     id='subCategoria'
//                     name='subCategoria'
//                     value={inputForm.subCategoria}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   >
//                     <option disabled>Elige</option>
//                     <option value={"iPhone 16"}>iPhone 16</option>
//                     <option value={"iPhone 15"}>iPhone 15</option>
//                     <option value={"iPhone 14"}>iPhone 14</option>
//                     <option value={"iPhone SE"}>iPhone SE</option>
//                     <option value={"iPhone 13"}>iPhone 13</option>
//                     <option value={"iPad Pro"}>iPad Pro</option>
//                     <option value={"iPad Air"}>iPad Air</option>
//                     <option value={"iPad"}>iPad</option>
//                     <option value={"iPad mini"}>iPad mini</option>
//                     <option value={"MacBook Air"}>MacBook Air</option>
//                     <option value={"MacBook Pro"}>MacBook Pro</option>
//                     <option value={"iMac"}>iMac</option>
//                     <option value={"Mac mini"}>Mac mini</option>
//                     <option value={"Mac Studio"}>Mac Studio</option>
//                     <option value={"Mac Pro"}>Mac Pro</option>
//                     <option value={"Apple Watch Series 9"}>Apple Watch Series 9</option>
//                     <option value={"Apple Watch Ultra"}>Apple Watch Ultra</option>
//                     <option value={"Apple Watch SE"}>Apple Watch SE</option>
//                     <option value={"AirPods Pro"}>AirPods Pro</option>
//                     <option value={"AirPods (3ª generación)"}>
//                       AirPods (3ª generación)
//                     </option>
//                     <option value={"AirPods Max"}>AirPods Max</option>
//                     <option value={"Fundas"}>Fundas y protectores</option>
//                     <option value={"Glass"}>Glass</option>
//                     <option value={"Energia y Cables"}>Cargadores y adaptadores</option>
//                     <option value={"Correas"}>Correas para Apple Watch</option>
//                     <option value={"Teclados, ratones y trackpads"}>
//                       Teclados, ratones y trackpads
//                     </option>
//                     <option value={"AirTag"}>AirTag</option>{" "}
//                   </select>
//                 </div>
//               </div>
//               {/* Nombre */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='nombre'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Nombre
//                 </label>
//                 <div className='mt-2'>
//                   <input
//                     id='nombre'
//                     type='text'
//                     name='nombre'
//                     placeholder='Por Ej. iPhone 15 Pro Max'
//                     value={inputForm.nombre}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   />
//                 </div>
//               </div>
//               {/* Marca */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='marca'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Marca
//                 </label>
//                 <div className='mt-2'>
//                   <input
//                     id='marca'
//                     type='text'
//                     name='marca'
//                     placeholder='Por Ej. Apple'
//                     value={inputForm.marca}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   />
//                 </div>
//               </div>
//               {/* Descripcion */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='nombre'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Descripcion
//                 </label>
//                 <div className='mt-2'>
//                   <input
//                     id='descripcion'
//                     type='text'
//                     name='descripcion'
//                     placeholder='Por Ej. Apple'
//                     value={inputForm.descripcion}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   />
//                 </div>
//               </div>
//               {/* Stock */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='nombre'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Stock
//                 </label>
//                 <div className='mt-2'>
//                   <input
//                     id='stockGeneral'
//                     type='number'
//                     name='stockGeneral'
//                     placeholder='Por Ej. Apple'
//                     value={inputForm.stockGeneral}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   />
//                 </div>
//               </div>
//               {/* Estado */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='estado'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Estado
//                 </label>
//                 <div className='mt-2'>
//                   <select
//                     id='estado'
//                     name='estado'
//                     value={inputForm.estados}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   >
//                     <option disabled>Elige</option>
//                     <option value={"nuevo"}>Nuevo</option>
//                     <option value={"swap"}>Swap</option>
//                   </select>
//                 </div>
//               </div>
//               {/* Precio */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='precioBase'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Precio
//                 </label>
//                 <div className='mt-2'>
//                   <input
//                     id='precioBase'
//                     type='number'
//                     name='precioBase'
//                     placeholder='Por Ej. 23'
//                     value={inputForm.precioBase}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   />
//                 </div>
//               </div>
//               {/* Disponible */}
//               <div className='sm:col-span-1'>
//                 <label
//                   htmlFor='disponible'
//                   className='block text-sm font-medium leading-6 text-gray-900'
//                 >
//                   Disponible
//                 </label>
//                 <div className='mt-2'>
//                   <select
//                     id='disponible'
//                     name='disponible'
//                     value={inputForm.disponible}
//                     onChange={(e) => handleChange(e)}
//                     className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
//                   >
//                     <option disabled>Elige</option>
//                     <option value={true}>Si</option>
//                     <option value={false}>No</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <strong className='text-center block mb-2'>Seccion color del producto</strong>
//           <p className='text-sm mb-4'>
//             *Detalle según el título el color que quiere disponer
//           </p>
//         </div>

//         {inputForm.color.map((color, index) => (
//           <div className='mb-4 flex flex-col space-y-2' key={index}>
//             <label className='text-sm font-medium'>Nombre</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='text'
//               name='nombre'
//               value={color.nombre}
//               onChange={(event) => handleColorChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Imagen</label>
//             <input
//               type='file'
//               className='border border-gray-300 rounded p-2'
//               onChange={(event) => handleImageUploadColor(index, event)}
//             />

//             {color.imageColor && (
//               <div className='mt-2'>
//                 <img
//                   src={color.imageColor}
//                   alt='Uploaded'
//                   className='w-24 h-24 object-cover rounded'
//                 />
//               </div>
//             )}

//             <label className='text-sm font-medium'>Stock</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='number'
//               name='stockColor'
//               value={color.stockColor}
//               onChange={(event) => handleColorChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Estado</label>
//             <select
//               className='border border-gray-300 rounded p-2'
//               name='estado'
//               value={color.estado}
//               onChange={(event) => handleColorChange(index, event)}
//             >
//               <option>Seleccione</option>
//               <option value='nuevo'>Nuevo</option>
//               <option value='swap'>Swap</option>
//             </select>

//             <button
//               className='bg-red-500 text-white rounded py-2 mt-2'
//               type='button'
//               onClick={() => removeColor(index)}
//             >
//               Eliminar color
//             </button>
//           </div>
//         ))}

//         <button
//           className='bg-green-500 text-white rounded py-2 mt-4'
//           type='button'
//           onClick={addColor}
//         >
//           Añadir color
//         </button>

//         <div className='mt-6'>
//           <strong className='text-center block mb-2'>Seccion modelo del producto</strong>
//           <p className='text-sm mb-4'>
//             *En caso que el producto cuente con uno o varios modelos pulse añadir, de lo
//             contrario omita.
//           </p>
//         </div>

//         {inputForm.modelo.map((model, index) => (
//           <div className='mb-4 flex flex-col space-y-2' key={index}>
//             <label className='text-sm font-medium'>Modelo</label>
//             <select
//               className='border border-gray-300 rounded p-2'
//               value={model.nombre}
//               name='nombre'
//               onChange={(event) => handleModelChange(index, event)}
//             >
//               <option disabled>Seleccione</option>
//               <option value='Generico'>Generico</option>
//               <option value='14 Pro Max'>16 Pro Max</option>
//               <option value='14 Pro Max'>16 Pro</option>
//               <option value='14 Pro Max'>16 </option>
//               <option value='14 Pro Max'>15 Pro Max</option>
//               <option value='14 Pro Max'>15 Pro</option>
//               <option value='14 Pro Max'>15 </option>
//               <option value='14 Pro Max'>14 Pro Max</option>
//               <option value='14 Pro'>14 Pro</option>
//               <option value='14 Plus'>14 Plus</option>
//               <option value='14'>14</option>
//               <option value='13 Pro Max'>13 Pro Max</option>
//               <option value='13 Pro'>13 Pro</option>
//               <option value='13 Mini'>13 Mini</option>
//               <option value='13'>13</option>
//               <option value='12 Pro Max'>12 Pro Max</option>
//               <option value='12 Pro'>12 Pro</option>
//               <option value='12 Mini'>12 Mini</option>
//               <option value='12'>12</option>
//               <option value='11 Pro Max'>11 Pro Max</option>
//               <option value='11 Pro'>11 Pro</option>
//               <option value='11'>11</option>
//               <option value='SE(3rd)'>SE(3rd)</option>
//               <option value='SE(2rd)'>SE(2rd)</option>
//               <option value='iPhone XS'>iPhone-XS</option>
//               <option value='iPhone XS Max'>iPhone-XS Max</option>
//               <option value='iPhone XR'>iPhone-XR</option>
//             </select>

//             <label className='text-sm font-medium'>Precio</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='number'
//               name='precio'
//               value={model.precio}
//               onChange={(event) => handleModelChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Stock</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='number'
//               name='stockModel'
//               value={model.stockModel}
//               onChange={(event) => handleModelChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Disponible</label>
//             <input
//               className='form-checkbox'
//               type='checkbox'
//               name='disponible'
//               checked={model.disponible}
//               onChange={(event) =>
//                 handleModelChangeB(index, event.target.name, event.target.checked)
//               }
//             />

//             <label className='text-sm font-medium'>Imagen</label>
//             <input
//               type='file'
//               className='border border-gray-300 rounded p-2'
//               onChange={(event) => handleImageUploadModel(index, event)}
//             />

//             {model.imageModel && (
//               <div className='mt-2'>
//                 <img
//                   src={model.imageModel}
//                   alt='Uploaded'
//                   className='w-24 h-24 object-cover rounded'
//                 />
//               </div>
//             )}

//             <button
//               className='bg-red-500 text-white rounded py-2 mt-2'
//               type='button'
//               onClick={() => removeModel(index)}
//             >
//               Eliminar modelo
//             </button>
//           </div>
//         ))}

//         <button
//           className='bg-green-500 text-white rounded py-2 mt-4'
//           type='button'
//           onClick={addModel}
//         >
//           Añadir modelo
//         </button>

//         <div className='mt-6'>
//           <strong className='text-center block mb-2'>
//             Seccion capacidad del producto
//           </strong>
//           <p className='text-sm mb-4'>
//             *En caso que el producto cuente con almacenamiento pulse añadir, de lo
//             contrario omita.
//           </p>
//         </div>

//         {inputForm.almacenamiento.map((storage, index) => (
//           <div className='mb-4 flex flex-col space-y-2' key={index}>
//             <label className='text-sm font-medium'>Capacidad</label>
//             <select
//               className='border border-gray-300 rounded p-2'
//               name='capacidad'
//               value={storage.capacidad}
//               onChange={(event) => handleStorageChange(index, event)}
//             >
//               <option disabled>Seleccione</option>
//               <option value='64 GB'>64GB</option>
//               <option value='128 GB'>128GB</option>
//               <option value='256 GB'>256GB</option>
//               <option value='512 GB'>512GB</option>
//               <option value='1024 GB'>1024GB</option>
//             </select>

//             <label className='text-sm font-medium'>Precio</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='number'
//               name='precio'
//               value={storage.precio}
//               onChange={(event) => handleStorageChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Stock</label>
//             <input
//               className='border border-gray-300 rounded p-2'
//               type='number'
//               name='stockStorage'
//               value={storage.stockStorage}
//               onChange={(event) => handleStorageChange(index, event)}
//             />

//             <label className='text-sm font-medium'>Disponible</label>
//             <input
//               className='form-checkbox'
//               type='checkbox'
//               name='disponible'
//               checked={storage.disponible}
//               onChange={(event) =>
//                 handleStorageChangeB(index, event.target.name, event.target.checked)
//               }
//             />

//             <label className='text-sm font-medium'>Estado</label>
//             <select
//               className='border border-gray-300 rounded p-2'
//               name='estado'
//               value={storage.estado}
//               onChange={(event) => handleStorageChange(index, event)}
//             >
//               <option disabled> Seleccione</option>
//               <option value='nuevo'>Nuevo</option>
//               <option value='swap'>Swap</option>
//             </select>

//             <button
//               className='bg-red-500 text-white rounded py-2 mt-2'
//               type='button'
//               onClick={() => removeStorage(index)}
//             >
//               Eliminar almacenamiento
//             </button>
//           </div>
//         ))}

//         <button
//           className='bg-green-500 text-white rounded py-2 mt-4'
//           type='button'
//           onClick={addStorage}
//         >
//           Añadir almacenamiento
//         </button>

//         <div className='mt-6 flex items-center justify-end gap-x-6'>
//           <button
//             type='submit'
//             className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
//           >
//             Crear Producto
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";

function slugify(text) {
  return (
    text
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "") || "producto"
  );
}

function normalizeText(value = "") {
  return String(value).trim();
}

function buildSku({ name, color, model, storage, index }) {
  const base = normalizeText(name).toUpperCase().replace(/\s+/g, "-").slice(0, 12);

  const parts = [
    base,
    color ? normalizeText(color).toUpperCase().replace(/\s+/g, "-") : null,
    model ? normalizeText(model).toUpperCase().replace(/\s+/g, "-") : null,
    storage ? normalizeText(storage).toUpperCase().replace(/\s+/g, "-") : null,
    index + 1,
  ].filter(Boolean);

  return parts.join("-");
}

export default function Crear() {
  const initialFormState = {
    category: "",
    subCategory: "",
    name: "",
    brand: "Apple",
    description: "",
    images: [],
    basePrice: 0,
    baseStock: 0,
    status: "nuevo",

    colors: [
      {
        colorKey: "",
        colorLabel: "",
        imageColor: "",
        stockColor: 0,
        estado: "nuevo",
      },
    ],
    storages: [],
    models: [],

    variants: [],
  };
  const colorTranslations = {
    black: "Negro",
    white: "Blanco",
    gray: "Gris",
    blue: "Azul",
    green: "Verde",
    red: "Rojo",
    yellow: "Amarillo",
    pink: "Rosa",
    purple: "Morado",
    orange: "Naranja",
    brown: "Marrón",
    beige: "Beige",
    transparent: "Transparente",
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(initialFormState);

  function buildCompatibleWith(variants) {
    const models = [
      ...new Set(variants.map((v) => v?.attributes?.model).filter(Boolean)),
    ];

    return models.map((model) => ({
      device: model,
      type: "iphone",
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "iphonecase");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ds19bznoo/image/upload",
        formData,
      );
      setSelectedImage(res.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  const addImageToProduct = () => {
    if (!selectedImage) return;

    setInputForm((prev) => ({
      ...prev,
      images: [...prev.images, selectedImage],
    }));

    setSelectedImage(null);
  };

  const removeImageFromProduct = (indexToRemove) => {
    setInputForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const uploadCloudinaryImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/deqxuoyrc/image/upload",
      formData,
    );

    return response.data.secure_url;
  };

  const handleVariantImageChange = (index, imageUrl) => {
    setInputForm((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        images: imageUrl ? [imageUrl] : [],
      };

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const handleVariantImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadCloudinaryImage(file);
      handleVariantImageChange(index, imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Error al subir imagen de variante");
    }
  };
  const handleColorChange = (index, event) => {
    const { name, value } = event.target;

    setInputForm((prev) => {
      const newColors = [...prev.colors];
      newColors[index] = { ...newColors[index], [name]: value };
      return { ...prev, colors: newColors };
    });
  };

  const handleColorChangeB = (index, name, value) => {
    setInputForm((prev) => {
      const newColors = [...prev.colors];
      newColors[index] = { ...newColors[index], [name]: value };
      return { ...prev, colors: newColors };
    });
  };

  const handleImageUploadColor = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadCloudinaryImage(file);
      handleColorChangeB(index, "imageColor", imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Error al subir imagen de color");
    }
  };

  const addColor = () => {
    setInputForm((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          colorKey: "",
          colorLabel: "",
          imageColor: "",
          stockColor: 0,
          estado: "nuevo",
        },
      ],
    }));
  };

  const removeColor = (index) => {
    setInputForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleModelChange = (index, event) => {
    const { name, value } = event.target;

    setInputForm((prev) => {
      const newModels = [...prev.models];
      newModels[index] = { ...newModels[index], [name]: value };
      return { ...prev, models: newModels };
    });
  };

  const handleModelChangeB = (index, name, value) => {
    setInputForm((prev) => {
      const newModels = [...prev.models];
      newModels[index] = { ...newModels[index], [name]: value };
      return { ...prev, models: newModels };
    });
  };

  const addModel = () => {
    setInputForm((prev) => ({
      ...prev,
      models: [
        ...prev.models,
        {
          nombre: "",
          precio: 0,
          stockModel: 0,
          disponible: false,
          imageModel: "",
        },
      ],
    }));
  };

  const removeModel = (index) => {
    setInputForm((prev) => ({
      ...prev,
      models: prev.models.filter((_, i) => i !== index),
    }));
  };

  const handleImageUploadModel = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadCloudinaryImage(file);
      handleModelChangeB(index, "imageModel", imageUrl);
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error("Error al subir imagen de modelo");
    }
  };

  const handleStorageChange = (index, event) => {
    const { name, value } = event.target;

    setInputForm((prev) => {
      const newStorages = [...prev.storages];
      newStorages[index] = { ...newStorages[index], [name]: value };
      return { ...prev, storages: newStorages };
    });
  };

  const handleStorageChangeB = (index, name, value) => {
    setInputForm((prev) => {
      const newStorages = [...prev.storages];
      newStorages[index] = { ...newStorages[index], [name]: value };
      return { ...prev, storages: newStorages };
    });
  };

  const addStorage = () => {
    setInputForm((prev) => ({
      ...prev,
      storages: [
        ...prev.storages,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "nuevo",
        },
      ],
    }));
  };

  const removeStorage = (index) => {
    setInputForm((prev) => ({
      ...prev,
      storages: prev.storages.filter((_, i) => i !== index),
    }));
  };
  const addManualVariant = () => {
    setInputForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: buildSku({
            name: prev.name,
            index: prev.variants.length,
          }),
          price: Number(prev.basePrice) || 0,
          stock: Number(prev.baseStock) || 0,
          attributes: {
            color: "",
            model: "",
            storage: "",
          },
          images: prev.images?.length ? [prev.images[0]] : [],
          available: (Number(prev.baseStock) || 0) > 0,
        },
      ],
    }));

    toast.success("Variante manual agregada.");
  };

  const generateVariants = () => {
    const cleanColors = inputForm.colors.filter((c) => normalizeText(c.colorLabel));
    const cleanModels = inputForm.models.filter((m) => normalizeText(m.nombre));
    const cleanStorages = inputForm.storages.filter((s) => normalizeText(s.capacidad));

    const variants = [];

    if (cleanColors.length && cleanModels.length && cleanStorages.length) {
      cleanModels.forEach((model) => {
        cleanColors.forEach((color) => {
          cleanStorages.forEach((storage, index) => {
            variants.push({
              sku: buildSku({
                name: inputForm.name,
                color: color.colorLabel,
                model: model.nombre,
                storage: storage.capacidad,
                index,
              }),
              price:
                Number(storage.precio) ||
                Number(model.precio) ||
                Number(inputForm.basePrice) ||
                0,
              stock:
                Number(storage.stockStorage) ||
                Number(model.stockModel) ||
                Number(color.stockColor) ||
                Number(inputForm.baseStock) ||
                0,
              attributes: {
                color: color.colorLabel,
                model: model.nombre,
                storage: storage.capacidad,
              },
              images: [
                color.imageColor || model.imageModel || inputForm.images[0] || "",
              ].filter(Boolean),
              available:
                (Number(storage.stockStorage) ||
                  Number(model.stockModel) ||
                  Number(color.stockColor) ||
                  Number(inputForm.baseStock) ||
                  0) > 0,
            });
          });
        });
      });
    } else if (cleanColors.length && cleanModels.length) {
      cleanModels.forEach((model) => {
        cleanColors.forEach((color, index) => {
          variants.push({
            sku: buildSku({
              name: inputForm.name,
              color: color.colorLabel,
              model: model.nombre,
              index,
            }),
            price: Number(model.precio) || Number(inputForm.basePrice) || 0,
            stock:
              Number(model.stockModel) ||
              Number(color.stockColor) ||
              Number(inputForm.baseStock) ||
              0,
            attributes: {
              color: color.colorLabel,
              model: model.nombre,
            },
            images: [
              color.imageColor || model.imageModel || inputForm.images[0] || "",
            ].filter(Boolean),
            available:
              (Number(model.stockModel) ||
                Number(color.stockColor) ||
                Number(inputForm.baseStock) ||
                0) > 0,
          });
        });
      });
    } else if (cleanColors.length && cleanStorages.length) {
      cleanColors.forEach((color) => {
        cleanStorages.forEach((storage, index) => {
          variants.push({
            sku: buildSku({
              name: inputForm.name,
              color: color.colorLabel,
              storage: storage.capacidad,
              index,
            }),
            price: Number(storage.precio) || Number(inputForm.basePrice) || 0,
            stock:
              Number(storage.stockStorage) ||
              Number(color.stockColor) ||
              Number(inputForm.baseStock) ||
              0,
            attributes: {
              color: color.colorLabel,
              storage: storage.capacidad,
            },
            images: [color.imageColor || inputForm.images[0] || ""].filter(Boolean),
            available:
              (Number(storage.stockStorage) ||
                Number(color.stockColor) ||
                Number(inputForm.baseStock) ||
                0) > 0,
          });
        });
      });
    } else if (cleanModels.length && cleanStorages.length) {
      cleanModels.forEach((model) => {
        cleanStorages.forEach((storage, index) => {
          variants.push({
            sku: buildSku({
              name: inputForm.name,
              model: model.nombre,
              storage: storage.capacidad,
              index,
            }),
            price:
              Number(storage.precio) ||
              Number(model.precio) ||
              Number(inputForm.basePrice) ||
              0,
            stock:
              Number(storage.stockStorage) ||
              Number(model.stockModel) ||
              Number(inputForm.baseStock) ||
              0,
            attributes: {
              model: model.nombre,
              storage: storage.capacidad,
            },
            images: [model.imageModel || inputForm.images[0] || ""].filter(Boolean),
            available:
              (Number(storage.stockStorage) ||
                Number(model.stockModel) ||
                Number(inputForm.baseStock) ||
                0) > 0,
          });
        });
      });
    } else if (cleanColors.length) {
      cleanColors.forEach((color, index) => {
        variants.push({
          sku: buildSku({
            name: inputForm.name,
            color: color.colorLabel,
            index,
          }),
          price: Number(inputForm.basePrice) || 0,
          stock: Number(color.stockColor) || Number(inputForm.baseStock) || 0,
          attributes: {
            color: color.colorLabel,
          },
          images: [color.imageColor || inputForm.images[0] || ""].filter(Boolean),
          available: (Number(color.stockColor) || Number(inputForm.baseStock) || 0) > 0,
        });
      });
    } else if (cleanModels.length) {
      cleanModels.forEach((model, index) => {
        variants.push({
          sku: buildSku({
            name: inputForm.name,
            model: model.nombre,
            index,
          }),
          price: Number(model.precio) || Number(inputForm.basePrice) || 0,
          stock: Number(model.stockModel) || Number(inputForm.baseStock) || 0,
          attributes: {
            model: model.nombre,
          },
          images: [model.imageModel || inputForm.images[0] || ""].filter(Boolean),
          available: (Number(model.stockModel) || Number(inputForm.baseStock) || 0) > 0,
        });
      });
    } else if (cleanStorages.length) {
      cleanStorages.forEach((storage, index) => {
        variants.push({
          sku: buildSku({
            name: inputForm.name,
            storage: storage.capacidad,
            index,
          }),
          price: Number(storage.precio) || Number(inputForm.basePrice) || 0,
          stock: Number(storage.stockStorage) || Number(inputForm.baseStock) || 0,
          attributes: {
            storage: storage.capacidad,
          },
          images: inputForm.images,
          available:
            (Number(storage.stockStorage) || Number(inputForm.baseStock) || 0) > 0,
        });
      });
    } else {
      variants.push({
        sku: buildSku({
          name: inputForm.name,
          index: 0,
        }),
        price: Number(inputForm.basePrice) || 0,
        stock: Number(inputForm.baseStock) || 0,
        attributes: {},
        images: inputForm.images,
        available: Number(inputForm.baseStock) > 0,
      });
    }

    setInputForm((prev) => ({
      ...prev,
      variants,
    }));

    toast.success("Variantes generadas.");
  };
  const handleVariantChange = (index, field, value) => {
    setInputForm((prev) => {
      const updatedVariants = [...prev.variants];
      const current = { ...updatedVariants[index] };

      current[field] =
        field === "price" || field === "stock" ? Number(value) || 0 : value;

      if (field === "stock") {
        current.available = (Number(value) || 0) > 0;
      }

      updatedVariants[index] = current;

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const handleVariantAttributeChange = (index, field, value) => {
    setInputForm((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        attributes: {
          ...updatedVariants[index].attributes,
          [field]: value,
        },
      };

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const removeVariant = (index) => {
    setInputForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalStock = inputForm.variants.reduce(
        (acc, variant) => acc + (Number(variant.stock) || 0),
        0,
      );

      const payload = {
        name: normalizeText(inputForm.name),
        slug: slugify(inputForm.name),
        brand: normalizeText(inputForm.brand) || "Apple",
        category: normalizeText(inputForm.category).toLowerCase(),
        subCategory: normalizeText(inputForm.subCategory).toLowerCase(),
        description: normalizeText(inputForm.description),
        images: inputForm.images,
        variants: inputForm.variants,
        totalStock,
        available: totalStock > 0,
        compatibleWith: buildCompatibleWith(inputForm.variants),
        seo: {
          title: normalizeText(inputForm.name),
          description: normalizeText(inputForm.description).slice(0, 150),
        },
      };

      await axios.post(`${API_BASE_URL}/products`, payload);

      toast.success("Producto creado con éxito.");
      setInputForm(initialFormState);
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto.");
    }
  };

  return (
    <div className='relative isolate overflow-hidden bg-white px-6 pb-6 lg:overflow-visible lg:px-0'>
      <h2 className='text-center font-semibold leading-7 text-gray-900'>
        Agregar producto nuevo
      </h2>

      <p className='mt-1 text-center text-sm leading-6 text-gray-600'>
        Verifica bien los datos antes de guardar.
      </p>

      <div className='flex flex-col items-center gap-3 px-6 pt-6'>
        <label htmlFor='formFile' className='block py-2 font-medium'>
          Imagen/es del Producto
        </label>

        <div className='flex items-center gap-3'>
          <input
            className='block h-8 w-auto cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none'
            type='file'
            id='formFile'
            onChange={handleImageUpload}
          />

          <button
            type='button'
            className='rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500'
            onClick={addImageToProduct}
            disabled={loading}
          >
            {loading ? "Subiendo..." : "Agregar imagen al producto"}
          </button>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-center gap-4 py-4'>
        {inputForm.images.map((imgUrl, index) => (
          <div key={index} className='image-item'>
            <img
              src={imgUrl}
              alt='Uploaded'
              className='h-[150px] w-[120px] rounded-lg border border-gray-300 object-cover'
            />
            <button
              type='button'
              onClick={() => removeImageFromProduct(index)}
              className='top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white'
            >
              X
            </button>
          </div>
        ))}
      </div>

      <hr />
      <ToastContainer />

      <form className='px-24' onSubmit={handleSubmit}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4'>
              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Categoría
                </label>
                <div className='mt-2'>
                  <select
                    name='category'
                    value={inputForm.category}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option value=''>Elige</option>
                    <option value='iphone'>iPhone</option>
                    <option value='ipad'>iPad</option>
                    <option value='mac'>Mac</option>
                    <option value='airpods'>AirPods</option>
                    <option value='watch'>Apple Watch</option>
                    <option value='accessorios'>Accesorios</option>
                    <option value='otros'>Otros</option>
                  </select>
                </div>
              </div>

              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  SubCategoría
                </label>
                <div className='mt-2'>
                  <select
                    type='text'
                    name='subCategory'
                    value={inputForm.subCategory}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  >
                    <option value=''>Elige</option>
                    <option value='smartphone'>Smartphone</option>
                    <option value='ipad'>iPad</option>
                    <option value='mac'>Mac</option>
                    <option value='airpods'>AirPods</option>
                    <option value='watch'>Apple Watch</option>
                    <option value='fundas'>Fundas</option>
                    <option value='accessorios'>Energia y cables</option>
                    <option value='accessorios'>Glass</option>
                    <option value='otros'>Otros</option>
                  </select>
                </div>
              </div>

              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Nombre
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Por ej. iPhone 15 Pro Max'
                    value={inputForm.name}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Marca
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='brand'
                    placeholder='Por ej. Apple'
                    value={inputForm.brand}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Descripción
                </label>
                <div className='mt-2'>
                  <textarea
                    name='description'
                    value={inputForm.description}
                    onChange={handleChange}
                    rows={4}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Precio base
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='basePrice'
                    value={inputForm.basePrice}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>
                  Stock base
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    name='baseStock'
                    value={inputForm.baseStock}
                    onChange={handleChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-indigo-600 sm:text-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <strong className='mb-2 block text-center'>Sección color del producto</strong>
          <p className='mb-4 text-sm'>
            Agrega colores si el producto tiene variantes por color.
          </p>
        </div>

        {inputForm.colors.map((color, index) => (
          <div className='mb-4 flex flex-col space-y-2 rounded border p-4' key={index}>
            <label className='text-sm font-medium'>Color técnico</label>

            <select
              className='rounded border border-gray-300 p-2'
              value={color.colorKey}
              onChange={(event) => {
                handleColorChangeB(index, "colorKey", event.target.value);
              }}
            >
              <option value=''>Seleccionar color</option>
              <option value='black'>Negro</option>
              <option value='white'>Blanco</option>
              <option value='gray'>Gris</option>
              <option value='blue'>Azul</option>
              <option value='green'>Verde</option>
              <option value='red'>Rojo</option>
              <option value='yellow'>Amarillo</option>
              <option value='pink'>Rosa</option>
              <option value='purple'>Morado</option>
              <option value='orange'>Naranja</option>
              <option value='brown'>Marrón</option>
              <option value='beige'>Beige</option>
              <option value='transparent'>Transparente</option>
            </select>

            <label className='text-sm font-medium'>Nombre visible</label>

            <input
              type='text'
              className='rounded border border-gray-300 p-2'
              placeholder='Ej: Titanio Negro'
              name='colorLabel'
              value={color.colorLabel}
              onChange={(event) => handleColorChange(index, event)}
            />

            <label className='text-sm font-medium'>Imagen</label>

            <input
              type='file'
              className='rounded border border-gray-300 p-2'
              onChange={(event) => handleImageUploadColor(index, event)}
            />

            {color.imageColor && (
              <div className='mt-2'>
                <img
                  src={color.imageColor}
                  alt='Uploaded'
                  className='h-24 w-24 rounded object-cover'
                />
              </div>
            )}

            <label className='text-sm font-medium'>Stock</label>

            <input
              className='rounded border border-gray-300 p-2'
              type='number'
              name='stockColor'
              value={color.stockColor}
              onChange={(event) => handleColorChange(index, event)}
            />

            <button
              className='mt-2 rounded bg-red-500 py-2 text-white'
              type='button'
              onClick={() => removeColor(index)}
            >
              Eliminar color
            </button>
          </div>
        ))}

        <button
          className='mt-4 rounded bg-green-500 py-2 text-white'
          type='button'
          onClick={addColor}
        >
          Añadir color
        </button>

        <div className='mt-6'>
          <strong className='mb-2 block text-center'>Sección modelo del producto</strong>
          <p className='mb-4 text-sm'>
            Agrega modelos si el producto tiene compatibilidad o variantes por modelo.
          </p>
        </div>

        {inputForm.models.map((model, index) => (
          <div className='mb-4 flex flex-col space-y-2' key={index}>
            <label className='text-sm font-medium'>Modelo</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='text'
              name='nombre'
              value={model.nombre}
              onChange={(event) => handleModelChange(index, event)}
              placeholder='Por ej. iPhone 14 Pro Max'
            />

            <label className='text-sm font-medium'>Precio</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='number'
              name='precio'
              value={model.precio}
              onChange={(event) => handleModelChange(index, event)}
            />

            <label className='text-sm font-medium'>Stock</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='number'
              name='stockModel'
              value={model.stockModel}
              onChange={(event) => handleModelChange(index, event)}
            />

            <label className='text-sm font-medium'>Imagen</label>
            <input
              type='file'
              className='rounded border border-gray-300 p-2'
              onChange={(event) => handleImageUploadModel(index, event)}
            />

            {model.imageModel && (
              <div className='mt-2'>
                <img
                  src={model.imageModel}
                  alt='Uploaded'
                  className='h-24 w-24 rounded object-cover'
                />
              </div>
            )}

            <button
              className='mt-2 rounded bg-red-500 py-2 text-white'
              type='button'
              onClick={() => removeModel(index)}
            >
              Eliminar modelo
            </button>
          </div>
        ))}

        <button
          className='mt-4 rounded bg-green-500 py-2 text-white'
          type='button'
          onClick={addModel}
        >
          Añadir modelo
        </button>

        <div className='mt-6'>
          <strong className='mb-2 block text-center'>
            Sección almacenamiento del producto
          </strong>
          <p className='mb-4 text-sm'>
            Agrega capacidades si el producto tiene variantes por almacenamiento.
          </p>
        </div>

        {inputForm.storages.map((storage, index) => (
          <div className='mb-4 flex flex-col space-y-2' key={index}>
            <label className='text-sm font-medium'>Capacidad</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='text'
              name='capacidad'
              value={storage.capacidad}
              onChange={(event) => handleStorageChange(index, event)}
              placeholder='Por ej. 128 GB'
            />

            <label className='text-sm font-medium'>Precio</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='number'
              name='precio'
              value={storage.precio}
              onChange={(event) => handleStorageChange(index, event)}
            />

            <label className='text-sm font-medium'>Stock</label>
            <input
              className='rounded border border-gray-300 p-2'
              type='number'
              name='stockStorage'
              value={storage.stockStorage}
              onChange={(event) => handleStorageChange(index, event)}
            />

            <button
              className='mt-2 rounded bg-red-500 py-2 text-white'
              type='button'
              onClick={() => removeStorage(index)}
            >
              Eliminar almacenamiento
            </button>
          </div>
        ))}

        <button
          className='mt-4 rounded bg-green-500 py-2 text-white'
          type='button'
          onClick={addStorage}
        >
          Añadir almacenamiento
        </button>

        <div className='mt-8 rounded border border-gray-200 bg-gray-50 p-4'>
          <div className='flex items-center justify-between gap-3 flex-wrap'>
            <h3 className='font-semibold text-gray-900'>Variantes</h3>

            <div className='flex gap-2 flex-wrap'>
              <button
                type='button'
                onClick={generateVariants}
                className='rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500'
              >
                Generar variantes
              </button>

              <button
                type='button'
                onClick={addManualVariant}
                className='rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600'
              >
                Agregar variante manual
              </button>
            </div>
          </div>

          <p className='mt-2 text-sm text-gray-600'>
            Variantes creadas: {inputForm.variants.length}
          </p>
          <p className='text-sm text-gray-600'>
            Stock total:{" "}
            {inputForm.variants.reduce(
              (acc, variant) => acc + (Number(variant.stock) || 0),
              0,
            )}
          </p>

          <div className='mt-4 space-y-4'>
            {inputForm.variants.map((variant, index) => (
              <div key={index} className='rounded border border-gray-300 bg-white p-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
                  <div>
                    <label className='block text-sm font-medium'>SKU</label>
                    <input
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.sku || ""}
                      onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium'>Color</label>
                    <input
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.attributes?.color || ""}
                      onChange={(e) =>
                        handleVariantAttributeChange(index, "color", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium'>Modelo</label>
                    <input
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.attributes?.model || ""}
                      onChange={(e) =>
                        handleVariantAttributeChange(index, "model", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium'>Storage</label>
                    <input
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.attributes?.storage || ""}
                      onChange={(e) =>
                        handleVariantAttributeChange(index, "storage", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium'>Precio</label>
                    <input
                      type='number'
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.price || 0}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium'>Stock</label>
                    <input
                      type='number'
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.stock || 0}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Imagen</label>
                    <input
                      type='file'
                      className='w-full rounded border border-gray-300 p-2'
                      onChange={(e) => handleVariantImageUpload(index, e)}
                    />

                    {variant.images?.[0] && (
                      <img
                        src={variant.images[0]}
                        alt='Variante'
                        className='mt-2 h-20 w-20 rounded object-cover border'
                      />
                    )}
                  </div>
                  <div className='lg:col-span-4 flex items-end'>
                    <button
                      type='button'
                      onClick={() => removeVariant(index)}
                      className='rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600'
                    >
                      Eliminar variante
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
          >
            Crear Producto
          </button>
        </div>
      </form>

      <>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Cómo cargar un producto
        </h2>

        <div className='space-y-5 text-sm text-gray-700'>
          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              1. Completar los datos principales
            </h3>
            <p>Primero se cargan los datos base del producto:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>
                <strong>Categoría:</strong> tipo general del producto. Ej.: iPhone, iPad,
                Mac, AirPods, Accesorios.
              </li>
              <li>
                <strong>Subcategoría:</strong> grupo más específico. Ej.: fundas,
                cargadores, cables, glass.
              </li>
              <li>
                <strong>Nombre:</strong> nombre comercial del producto. Ej.: Clear Case
                iPhone 14 Pro Max.
              </li>
              <li>
                <strong>Marca</strong>
              </li>
              <li>
                <strong>Descripción</strong>
              </li>
              <li>
                <strong>Imágenes generales</strong> del producto
              </li>
            </ul>
            <p className='mt-2'>Estos datos describen el producto en general.</p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              2. Definir si el producto tiene variantes
            </h3>
            <p>
              Después hay que revisar si el producto cambia según alguna opción, por
              ejemplo:
            </p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Color</li>
              <li>Modelo compatible</li>
              <li>Almacenamiento</li>
            </ul>
            <p className='mt-2'>
              Si no cambia por ninguna de esas opciones, se carga como producto simple.
            </p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              3. Cargar variantes cuando existan
            </h3>
            <p>Si el producto tiene opciones, se agregan como variantes.</p>
            <p className='mt-2'>Cada variante puede tener:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Color</li>
              <li>Modelo</li>
              <li>Almacenamiento</li>
              <li>Precio</li>
              <li>Stock</li>
              <li>Imagen propia de esa variante</li>
            </ul>
            <p className='mt-2'>
              <strong>Ejemplo:</strong> una funda puede tener variantes por color (negro,
              azul) y por modelo (iPhone 14, iPhone 14 Pro). Cada combinación tendrá su
              propio stock.
            </p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              4. Cómo pensar la carga correctamente
            </h3>
            <p>El producto debe cargarse así:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>
                <strong>Producto base:</strong> información general
              </li>
              <li>
                <strong>Variantes:</strong> combinaciones que cambian precio, stock o
                imagen
              </li>
            </ul>
            <p className='mt-2'>
              <strong>Ejemplo:</strong>
            </p>
            <p>Producto base: Silicone Case</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Negro / iPhone 14 / stock 3</li>
              <li>Negro / iPhone 14 Pro / stock 2</li>
              <li>Azul / iPhone 14 / stock 4</li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              5. Cuándo usar imágenes generales y cuándo imágenes de variante
            </h3>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>
                <strong>Imágenes generales:</strong> sirven para mostrar el producto en
                general.
              </li>
              <li>
                <strong>Imágenes de variante:</strong> se usan cuando una opción
                específica cambia visualmente.
              </li>
            </ul>
            <p className='mt-2'>Ej.: un color distinto o un modelo con imagen propia.</p>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>
              6. Reglas importantes al cargar
            </h3>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Si una variante tiene stock, debe tener también precio.</li>
              <li>
                Si un producto no tiene variantes, debe cargarse al menos con un precio y
                stock base.
              </li>
              <li>
                Los nombres de color, modelo y almacenamiento deben escribirse de forma
                consistente.
              </li>
              <li>No duplicar variantes iguales.</li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-1'>7. Resultado final</h3>
            <p>Con esta forma de carga, el sistema podrá:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Mostrar bien el producto</li>
              <li>Calcular el stock total</li>
              <li>Filtrar por color, modelo o almacenamiento</li>
              <li>Mostrar el precio correcto según la variante elegida</li>
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}
