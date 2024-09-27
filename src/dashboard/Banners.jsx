import axios from "axios";
import { useEffect, useState } from "react";

// Componente de Banner
function Banner({ banner, index, onTipoChange, onImagenChange }) {
  const handleTipoChange = () => {
    const nuevoTipo = prompt("Introduce el nuevo tipo (imagen o video):");
    if (nuevoTipo && (nuevoTipo === "imagen" || nuevoTipo === "video")) {
      onTipoChange(banner._id, nuevoTipo);
    } else {
      alert("Tipo no válido. Debe ser 'imagen' o 'video'.");
    }
  };

  return (
    <div>
      {banner.tipo === "video" ? (
        // Banner de video
        <video
          style={{ width: "auto", height: "26vh" }}
          src={banner.imagen}
          controls
          autoPlay
          loop
        >
          Tu navegador no admite la reproducción de videos.
        </video>
      ) : (
        // Banner de imagen
        <img
          style={{ width: "auto", height: "26vh" }}
          src={banner.imagen}
          alt={`Slide ${index + 1}`}
        />
      )}
      <button onClick={handleTipoChange}>Cambiar Tipo</button>
      <button onClick={() => onImagenChange(banner._id)}>Cambiar Multiimagen</button>
    </div>
  );
}

// Componente Banners
export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get(
          "https://iphonecaseoberab-production.up.railway.app/banners"
        );
        setBanners(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los banners:", error);
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  const updateBannerById = async (_id, newData) => {
    try {
      await axios.put(
        `https://iphonecaseoberab-production.up.railway.app/banners/${_id}`,
        newData
      );
      // Actualiza el estado de los banners después de la edición
      setBanners((prevBanners) => {
        const newBanners = [...prevBanners];
        const index = newBanners.findIndex((banner) => banner._id === _id);
        if (index !== -1) {
          newBanners[index] = { ...newBanners[index], ...newData };
        }
        return newBanners;
      });
    } catch (error) {
      console.error("Error al actualizar el banner:", error);
    }
  };

  const handleTipoChange = (_id, nuevoTipo) => {
    updateBannerById(_id, { tipo: nuevoTipo });
  };

  const handleImagenChange = (_id) => {
    const newImagenUrl = prompt("Introduce la nueva URL de la multiimagen:");
    if (newImagenUrl) {
      updateBannerById(_id, { imagen: newImagenUrl });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <h4>Editor de Banners</h4>
      <p>Recuerda que cada banner debe tener unas medidas aproximadas de 1280p x 480p</p>

      {loading ? (
        <p>Cargando banners...</p>
      ) : (
        banners.map((banner, index) => (
          <Banner
            key={banner._id}
            banner={banner}
            index={index}
            onTipoChange={handleTipoChange}
            onImagenChange={handleImagenChange}
          />
        ))
      )}
    </div>
  );
}
