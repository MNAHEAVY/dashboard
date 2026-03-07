import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
const CLOUD_NAME = "deqxuoyrc";
const UPLOAD_PRESET = "bvtkpxxl";

async function uploadToCloudinary(file, resourceType = "image") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await axios.post(url, formData);
  return response.data.secure_url;
}

function Banner({ banner, index, onTipoChange, onImagenChange, uploading }) {
  const isVideo = banner.tipo === "video";

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const resourceType = isVideo ? "video" : "image";
    await onImagenChange(banner._id, file, resourceType);
    e.target.value = "";
  };

  return (
    <div className='w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='mb-3 flex items-center justify-between'>
        <h5 className='font-semibold text-gray-900'>Banner {index + 1}</h5>

        <select
          value={banner.tipo}
          onChange={(e) => onTipoChange(banner._id, e.target.value)}
          className='rounded-md border border-gray-300 px-3 py-2 text-sm'
        >
          <option value='imagen'>Imagen</option>
          <option value='video'>Video</option>
        </select>
      </div>

      <div className='mb-4 flex justify-center rounded-lg bg-gray-100 p-3'>
        {isVideo ? (
          <video
            style={{ width: "auto", height: "26vh" }}
            src={banner.imagen}
            controls
            autoPlay
            loop
            className='rounded-md'
          >
            Tu navegador no admite la reproducción de videos.
          </video>
        ) : (
          <img
            style={{ width: "auto", height: "26vh" }}
            src={banner.imagen}
            alt={`Slide ${index + 1}`}
            className='rounded-md object-cover'
          />
        )}
      </div>

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
        <input
          type='file'
          accept={isVideo ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500'
        />

        <span className='text-sm text-gray-500'>
          {uploading ? "Subiendo archivo..." : "Selecciona un archivo para reemplazar"}
        </span>
      </div>
    </div>
  );
}

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState(null);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get(`${API_BASE_URL}/banners`);
        setBanners(response.data);
      } catch (error) {
        console.error("Error al obtener los banners:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  const updateBannerById = async (_id, newData) => {
    try {
      await axios.put(`${API_BASE_URL}/banners/${_id}`, newData);

      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner._id === _id ? { ...banner, ...newData } : banner,
        ),
      );
    } catch (error) {
      console.error("Error al actualizar el banner:", error);
      throw error;
    }
  };

  const handleTipoChange = async (_id, nuevoTipo) => {
    try {
      await updateBannerById(_id, { tipo: nuevoTipo });
    } catch {
      alert("No se pudo actualizar el tipo del banner.");
    }
  };

  const handleImagenChange = async (_id, file, resourceType) => {
    try {
      setUploadingId(_id);

      const secureUrl = await uploadToCloudinary(file, resourceType);
      await updateBannerById(_id, { imagen: secureUrl });

      alert("Banner actualizado correctamente.");
    } catch (error) {
      console.error("Error al cambiar archivo del banner:", error);
      alert("No se pudo subir el archivo.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6 p-12'>
      <div className='text-center'>
        <h4 className='text-xl font-semibold text-gray-900'>Editor de Banners</h4>
        <p className='mt-2 text-sm text-gray-600'>
          Recuerda que cada banner debe tener unas medidas aproximadas de 1280 x 480 px.
        </p>
      </div>

      {loading ? (
        <p>Cargando banners...</p>
      ) : (
        <div className='flex w-full max-w-4xl flex-col gap-6'>
          {banners.map((banner, index) => (
            <Banner
              key={banner._id}
              banner={banner}
              index={index}
              onTipoChange={handleTipoChange}
              onImagenChange={handleImagenChange}
              uploading={uploadingId === banner._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
