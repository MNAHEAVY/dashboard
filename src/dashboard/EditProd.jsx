"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";
const CLOUD_NAME = "ds19bznoo";
const UPLOAD_PRESET = "iphonecase";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData,
  );

  return response.data.secure_url;
}

function createEmptyVariant() {
  return {
    sku: "",
    price: 0,
    stock: 0,
    available: true,
    images: [],
    attributes: {
      colorKey: "",
      colorLabel: "",
      model: "",
      storage: "",
      size: "",
    },
  };
}

function getMinPrice(variants = []) {
  const prices = variants.map((v) => Number(v?.price) || 0).filter((p) => p > 0);

  return prices.length ? Math.min(...prices) : 0;
}

function getTotalStock(variants = []) {
  return variants.reduce((acc, v) => acc + (Number(v?.stock) || 0), 0);
}

function getFirstImage(product) {
  if (product?.images?.length) return product.images[0];
  return product?.variants?.find((v) => v?.images?.length)?.images?.[0] || "";
}

function buildVariantLabel(variant) {
  const attrs = variant?.attributes || {};
  return [attrs.colorKey, attrs.colorLabel, attrs.model, attrs.storage, attrs.size]
    .filter(Boolean)
    .join(" · ");
}

export default function ProdEdit() {
  const { id } = useParams();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeGroup, setActiveGroup] = useState(colorGroups[0]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const colorGroups = [
    { name: "Rojo", val: "red" },
    { name: "Naranja", val: "orange" },
    { name: "Ámbar", val: "amber" },
    { name: "Amarillo", val: "yellow" },
    { name: "Lima", val: "lime" },
    { name: "Verde", val: "green" },
    { name: "Esmeralda", val: "emerald" },
    { name: "Teal", val: "teal" },
    { name: "Cian", val: "cyan" },
    { name: "Cielo", val: "sky" },
    { name: "Azul", val: "blue" },
    { name: "Índigo", val: "indigo" },
    { name: "Violeta", val: "violet" },
    { name: "Púrpura", val: "purple" },
    { name: "Fucsia", val: "fuchsia" },
    { name: "Rosa", val: "pink" },
    { name: "Rosa Intenso", val: "rose" },
    { name: "Pizarra", val: "slate" },
    { name: "Gris", val: "gray" },
    { name: "Zinc", val: "zinc" },
    { name: "Neutral", val: "neutral" },
    { name: "Piedra", val: "stone" },
    { name: "Taupe", val: "taupe" },
    { name: "Malva", val: "mauve" },
    { name: "Neblina", val: "mist" },
    { name: "Oliva", val: "olive" },
  ];

  const [prodEd, setProdEd] = useState({
    name: "",
    brand: "",
    category: "",
    subCategory: "",
    description: "",
    images: [],
    variants: [],
    available: true,
    seo: {
      title: "",
      description: "",
    },
    compatibleWith: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setProdEd({
          ...data,
          images: data.images || [],
          variants: data.variants || [],
          seo: data.seo || { title: "", description: "" },
          compatibleWith: data.compatibleWith || [],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const stats = useMemo(() => {
    return {
      totalStock: getTotalStock(prodEd.variants),
      minPrice: getMinPrice(prodEd.variants),
      variantsCount: prodEd.variants?.length || 0,
    };
  }, [prodEd.variants]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdEd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;

    setProdEd((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const secureUrl = await uploadToCloudinary(file);
      setSelectedImage(secureUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  const addImageToProduct = () => {
    if (!selectedImage) return;

    setProdEd((prev) => ({
      ...prev,
      images: [...prev.images, selectedImage],
    }));

    setSelectedImage(null);
  };

  const removeImageFromProduct = (indexToRemove) => {
    setProdEd((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProdEd((prev) => {
      const updatedVariants = [...prev.variants];
      const currentVariant = { ...updatedVariants[index] };

      currentVariant[field] =
        field === "price" || field === "stock" ? Number(value) || 0 : value;

      if (field === "stock") {
        currentVariant.available = (Number(value) || 0) > 0;
      }

      updatedVariants[index] = currentVariant;

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const handleVariantAttributeChange = (index, field, value) => {
    setProdEd((prev) => {
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

  const handleVariantImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const secureUrl = await uploadToCloudinary(file);

      setProdEd((prev) => {
        const updatedVariants = [...prev.variants];
        const currentImages = updatedVariants[index].images || [];

        updatedVariants[index] = {
          ...updatedVariants[index],
          images: [...currentImages, secureUrl],
        };

        return {
          ...prev,
          variants: updatedVariants,
        };
      });
    } catch (error) {
      console.error("Error uploading variant image:", error);
      toast.error("Error al subir la imagen de la variante");
    }
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    setProdEd((prev) => {
      const updatedVariants = [...prev.variants];
      const currentImages = updatedVariants[variantIndex].images || [];

      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        images: currentImages.filter((_, i) => i !== imageIndex),
      };

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const handleAddVariant = () => {
    setProdEd((prev) => ({
      ...prev,
      variants: [...prev.variants, createEmptyVariant()],
    }));
  };

  const handleRemoveVariant = (index) => {
    setProdEd((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleDuplicateVariant = (index) => {
    setProdEd((prev) => {
      const source = prev.variants[index];
      const duplicated = {
        ...JSON.parse(JSON.stringify(source)),
        _id: undefined,
        sku: source?.sku ? `${source.sku}-COPY` : "",
      };

      const updatedVariants = [...prev.variants];
      updatedVariants.splice(index + 1, 0, duplicated);

      return {
        ...prev,
        variants: updatedVariants,
      };
    });
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const normalizedVariants = (updatedProduct.variants || []).map((variant) => {
        const stock = Number(variant.stock) || 0;

        return {
          ...variant,
          price: Number(variant.price) || 0,
          stock,
          available: stock > 0,
          images: variant.images || [],
          attributes: {
            colorKey: variant.attributes?.colorKey || "",
            colorLabel: variant.attributes?.colorLabel || "",
            model: variant.attributes?.model || "",
            storage: variant.attributes?.storage || "",
            size: variant.attributes?.size || "",
          },
        };
      });

      const totalStock = normalizedVariants.reduce(
        (acc, variant) => acc + (Number(variant.stock) || 0),
        0,
      );

      const payload = {
        ...updatedProduct,
        images: updatedProduct.images || [],
        variants: normalizedVariants,
        totalStock,
        available: totalStock > 0,
      };

      const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("¡Falló la actualización!");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setProdEd(result);
      toast.success("¡Producto actualizado!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, prodEd);
  };

  if (pageLoading) {
    return (
      <div className='mx-auto p-8 text-center'>
        <ToastContainer />
        <p>Cargando producto...</p>
      </div>
    );
  }

  const getColorFromPalette = (key) => {
    if (!key) return "transparent";

    if (!key.includes("-")) return key;

    const [group, level] = key.split("-");
    return tailwindPalette[group]?.[level] || "transparent";
  };
  const levels = [200, 300, 400, 500, 600, 700, 800];
  const tailwindPalette = {
    amber: {
      200: "#fee685",
      300: "#ffd230",
      400: "#ffb900",
      500: "#fe9a00",
      600: "#e17100",
      700: "#bb4d00",
      800: "#973c00",
    },
    blue: {
      200: "#bedbff",
      300: "#8ec5ff",
      400: "#51a2ff",
      500: "#2b7fff",
      600: "#155dfb",
      700: "#1447e6",
      800: "#193cb8",
    },
    cyan: {
      200: "#a2f4fd",
      300: "#53eafd",
      400: "#00d3f2",
      500: "#00b8db",
      600: "#0092b8",
      700: "#007595",
      800: "#005f78",
    },
    emerald: {
      200: "#a4f4cf",
      300: "#5ee9b5",
      400: "#00d492",
      500: "#00bc7d",
      600: "#009966",
      700: "#007a55",
      800: "#006045",
    },
    fuchsia: {
      200: "#f6cfff",
      300: "#f4a8ff",
      400: "#ed6aff",
      500: "#e12afb",
      600: "#c800de",
      700: "#a800b7",
      800: "#8a0194",
    },
    gray: {
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#99a1af",
      500: "#6a7282",
      600: "#4a5565",
      700: "#364153",
      800: "#1e2939",
    },
    green: {
      200: "#b9f8cf",
      300: "#7bf1a7",
      400: "#06df72",
      500: "#00c950",
      600: "#00a63e",
      700: "#008235",
      800: "#026630",
    },
    indigo: {
      200: "#c7d2ff",
      300: "#a3b3ff",
      400: "#7c86ff",
      500: "#615fff",
      600: "#4f39f6",
      700: "#432dd7",
      800: "#372aac",
    },
    lime: {
      200: "#d8f999",
      300: "#bbf451",
      400: "#9ae600",
      500: "#7ccf00",
      600: "#5ea500",
      700: "#497d00",
      800: "#3d6300",
    },
    mauve: {
      200: "#e7e4e7",
      300: "#d7d0d7",
      400: "#a89ea9",
      500: "#79697b",
      600: "#594c5b",
      700: "#463947",
      800: "#2a212c",
    },
    mist: {
      200: "#e3e7e8",
      300: "#d0d6d8",
      400: "#9ca8ab",
      500: "#67787c",
      600: "#4b585b",
      700: "#394447",
      800: "#22292b",
    },
    neutral: {
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a1a1a1",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
    },
    olive: {
      200: "#e8e8e3",
      300: "#d8d8d0",
      400: "#abab9c",
      500: "#7c7c67",
      600: "#5b5b4b",
      700: "#474739",
      800: "#2b2b22",
    },
    orange: {
      200: "#ffd6a7",
      300: "#ffb869",
      400: "#ff8903",
      500: "#ff6900",
      600: "#f54900",
      700: "#ca3500",
      800: "#9f2d00",
    },
    pink: {
      200: "#fccee8",
      300: "#fea5d5",
      400: "#fb64b6",
      500: "#f6339a",
      600: "#e60076",
      700: "#c6005b",
      800: "#a3004c",
    },
    purple: {
      200: "#e9d4ff",
      300: "#dab2ff",
      400: "#c27aff",
      500: "#ad46ff",
      600: "#9810fa",
      700: "#8200db",
      800: "#6e11b0",
    },
    red: {
      200: "#ffc9c9",
      300: "#ffa2a2",
      400: "#ff6467",
      500: "#fb2c36",
      600: "#e7000b",
      700: "#c10007",
      800: "#9f0712",
    },
    rose: {
      200: "#ffccd2",
      300: "#ffa1ad",
      400: "#ff637e",
      500: "#ff2056",
      600: "#ed003f",
      700: "#c70036",
      800: "#a50036",
    },
    sky: {
      200: "#b8e6fe",
      300: "#74d4ff",
      400: "#00bcff",
      500: "#00a6f4",
      600: "#0084d1",
      700: "#0069a8",
      800: "#00598a",
    },
    slate: {
      200: "#e2e8f0",
      300: "#cad5e2",
      400: "#90a1b9",
      500: "#62748e",
      600: "#45556c",
      700: "#314158",
      800: "#1d293d",
    },
    stone: {
      200: "#e7e5e4",
      300: "#d7d3d1",
      400: "#a6a09b",
      500: "#79716b",
      600: "#57534d",
      700: "#44403b",
      800: "#292524",
    },
    taupe: {
      200: "#e8e4e3",
      300: "#d8d2d0",
      400: "#aba09c",
      500: "#7c6d67",
      600: "#5b4f4b",
      700: "#473c39",
      800: "#2b2422",
    },
    teal: {
      200: "#96f7e4",
      300: "#46ecd4",
      400: "#00d5bd",
      500: "#00bba7",
      600: "#009689",
      700: "#00786f",
      800: "#005f5a",
    },
    violet: {
      200: "#ddd6ff",
      300: "#c4b4ff",
      400: "#a684ff",
      500: "#8e51ff",
      600: "#7f22fe",
      700: "#7008e7",
      800: "#5d0ec0",
    },
    yellow: {
      200: "#fff085",
      300: "#ffdf20",
      400: "#fdc700",
      500: "#f0b100",
      600: "#d18700",
      700: "#a65f00",
      800: "#894b00",
    },
    zinc: {
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#9f9fa9",
      500: "#71717b",
      600: "#52525c",
      700: "#3f3f46",
      800: "#27272a",
    },
  };
  return (
    <div className='mx-auto bg-slate-200 p-4'>
      <ToastContainer />

      <div className='mb-6'>
        <h3 className='text-center text-2xl font-semibold'>Editor de Productos</h3>
      </div>

      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Variantes</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.variantsCount}</p>
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Stock total</p>
          <p className='text-2xl font-semibold text-gray-900'>{stats.totalStock}</p>
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Precio mínimo</p>
          <p className='text-2xl font-semibold text-gray-900'>${stats.minPrice}</p>
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <p className='text-sm text-gray-500'>Estado</p>
          <p className='text-2xl font-semibold text-gray-900'>
            {stats.totalStock > 0 ? "Disponible" : "Sin stock"}
          </p>
        </div>
      </div>

      <div className='mb-6 flex flex-col items-center gap-3 px-6 pt-2'>
        <label htmlFor='formFile' className='block py-2 font-medium'>
          Imágenes generales del producto
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
            {loading ? "Subiendo..." : "Agregar imagen"}
          </button>
        </div>
      </div>

      <div className='mb-6 flex flex-wrap items-center justify-center gap-4 py-4'>
        {prodEd?.images?.map((imgUrl, index) => (
          <div key={index}>
            <img
              src={imgUrl}
              alt='Uploaded'
              className='h-[150px] w-[120px] rounded-lg border border-gray-300 object-cover'
            />
            <button
              type='button'
              onClick={() => removeImageFromProduct(index)}
              className='mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white'
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className='mx-auto flex p-4'>
        <div className='mx-auto w-full max-w-6xl'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow-sm md:grid-cols-2'>
              <div>
                <label className='block font-medium'>Categoría</label>
                <select
                  className='w-full rounded-md border border-gray-300 p-2'
                  value={prodEd.category}
                  name='category'
                  onChange={handleChange}
                >
                  <option value=''>Elige</option>
                  <option value='iphone'>iPhone</option>
                  <option value='ipad'>iPad</option>
                  <option value='mac'>Mac</option>
                  <option value='watch'>Apple Watch</option>
                  <option value='airpods'>AirPods</option>
                  <option value='accessorios'>Accesorios</option>
                  <option value='otros'>Otros</option>
                </select>
              </div>

              <div>
                <label className='block font-medium'>Subcategoría</label>
                <input
                  className='w-full rounded-md border border-gray-300 p-2'
                  type='text'
                  value={prodEd.subCategory || ""}
                  name='subCategory'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className='block font-medium'>Nombre</label>
                <input
                  className='w-full rounded-md border border-gray-300 p-2'
                  type='text'
                  value={prodEd.name || ""}
                  name='name'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className='block font-medium'>Marca</label>
                <input
                  className='w-full rounded-md border border-gray-300 p-2'
                  type='text'
                  value={prodEd.brand || ""}
                  name='brand'
                  onChange={handleChange}
                />
              </div>

              <div className='md:col-span-2'>
                <label className='block font-medium'>Descripción</label>
                <textarea
                  className='w-full rounded-md border border-gray-300 p-2'
                  value={prodEd.description || ""}
                  name='description'
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div>
                <label className='block font-medium'>SEO Title</label>
                <input
                  className='w-full rounded-md border border-gray-300 p-2'
                  type='text'
                  value={prodEd.seo?.title || ""}
                  name='title'
                  onChange={handleSeoChange}
                />
              </div>

              <div>
                <label className='block font-medium'>SEO Description</label>
                <textarea
                  className='w-full rounded-md border border-gray-300 p-2'
                  value={prodEd.seo?.description || ""}
                  name='description'
                  onChange={handleSeoChange}
                  rows={3}
                />
              </div>
            </div>

            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center justify-between'>
                <strong className='text-lg'>Variantes</strong>
                <button
                  type='button'
                  className='rounded-md bg-blue-500 px-4 py-2 text-white'
                  onClick={handleAddVariant}
                >
                  Agregar variante
                </button>
              </div>

              <div className='flex flex-col gap-4'>
                {prodEd.variants?.length > 0 ? (
                  prodEd.variants.map((variant, index) => (
                    <div
                      key={variant._id || index}
                      className='rounded-md border border-gray-300 p-4'
                    >
                      <div className='mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                        <div>
                          <p className='font-semibold text-gray-900'>
                            Variante {index + 1}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {buildVariantLabel(variant) || "Sin atributos definidos"}
                          </p>
                        </div>

                        <div className='flex gap-2'>
                          <button
                            type='button'
                            className='rounded bg-slate-700 px-3 py-2 text-sm text-white'
                            onClick={() => handleDuplicateVariant(index)}
                          >
                            Duplicar
                          </button>
                          <button
                            type='button'
                            className='rounded bg-red-500 px-3 py-2 text-sm text-white'
                            onClick={() => handleRemoveVariant(index)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        <div>
                          <label className='block font-medium'>SKU</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='text'
                            value={variant.sku || ""}
                            onChange={(e) =>
                              handleVariantChange(index, "sku", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className='block font-medium'>Precio</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='number'
                            value={variant.price || 0}
                            onChange={(e) =>
                              handleVariantChange(index, "price", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className='block font-medium'>Stock</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='number'
                            value={variant.stock || 0}
                            onChange={(e) =>
                              handleVariantChange(index, "stock", e.target.value)
                            }
                          />
                        </div>

                        {/* SECCIÓN DE COLOR CORREGIDA */}
                        {/* SECCIÓN COLOR CORREGIDA Y SEPARADA */}
                        <div className='space-y-3'>
                          {/* COLOR TÉCNICO */}
                          <div>
                            <label className='block text-sm font-medium'>
                              Color técnico
                            </label>

                            <div className='relative'>
                              {/* BOTÓN */}
                              <div
                                onClick={() => toggleDropdown(index)}
                                className='flex items-center justify-between border p-2 rounded cursor-pointer bg-white'
                              >
                                <div className='flex items-center gap-2'>
                                  <div
                                    className='w-4 h-4 rounded-full border'
                                    style={{
                                      backgroundColor: getColorFromPalette(
                                        variant.attributes?.colorKey,
                                      ),
                                    }}
                                  />
                                  <span className='font-mono text-sm'>
                                    {variant.attributes?.colorKey || "Seleccionar"}
                                  </span>
                                </div>
                              </div>

                              {/* DROPDOWN */}
                              {openDropdown === index && (
                                <div className='absolute left-0 top-full mt-1 w-full max-w-[600px] bg-white border border-gray-200 shadow-2xl rounded-lg py-2 max-h-72 overflow-y-auto z-50'>
                                  {/* COLORES SÓLIDOS */}
                                  <div className='px-2'>
                                    {["black", "white"].map((c) => (
                                      <div
                                        key={c}
                                        onClick={() => {
                                          handleVariantAttributeChange(
                                            index,
                                            "colorKey",
                                            c,
                                          );
                                          setOpenDropdown(null);
                                        }}
                                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center rounded'
                                      >
                                        {c === "black" ? "Negro" : "Blanco"}
                                        <div
                                          className='w-4 h-4 border border-gray-300 rounded'
                                          style={{ backgroundColor: c }}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  <hr className='my-2 border-gray-100' />

                                  {/* PANEL EN COLUMNAS */}
                                  <div className='flex w-full max-h-72'>
                                    {/* IZQUIERDA */}
                                    <div className='w-1/2 border-r overflow-y-auto'>
                                      {colorGroups.map((group) => (
                                        <div
                                          key={group.val}
                                          onMouseEnter={() => setActiveGroup(group)}
                                          className={`px-4 py-2 cursor-pointer text-sm ${
                                            activeGroup?.val === group.val
                                              ? "bg-blue-100 font-semibold"
                                              : "hover:bg-blue-50"
                                          }`}
                                        >
                                          {group.name}
                                        </div>
                                      ))}
                                    </div>

                                    {/* DERECHA */}
                                    <div className='w-1/2 sticky top-0 bg-white'>
                                      {activeGroup &&
                                        levels.map((lvl) => {
                                          const key = `${activeGroup.val}-${lvl}`;
                                          const hex =
                                            tailwindPalette[activeGroup.val]?.[lvl];

                                          return (
                                            <div
                                              key={key}
                                              onClick={() => {
                                                handleVariantAttributeChange(
                                                  index,
                                                  "colorKey",
                                                  key,
                                                );
                                                setOpenDropdown(null);
                                              }}
                                              className='flex items-center justify-between px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm'
                                            >
                                              <span className='font-mono'>{lvl}</span>
                                              <div
                                                className='w-full h-5 rounded border border-black/10'
                                                style={{ backgroundColor: hex }}
                                              />
                                            </div>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* COLOR LABEL (MARKETING) */}
                          <div>
                            <label className='block text-sm font-medium'>
                              Nombre visible
                            </label>
                            <input
                              className='w-full rounded-md border border-gray-300 p-2'
                              type='text'
                              placeholder='Ej: Titanio Negro'
                              value={variant.attributes?.colorLabel || ""}
                              onChange={(e) =>
                                handleVariantAttributeChange(
                                  index,
                                  "colorLabel",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* OTROS ATRIBUTOS */}
                        <div>
                          <label className='block font-medium'>Modelo</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='text'
                            value={variant.attributes?.model || ""}
                            onChange={(e) =>
                              handleVariantAttributeChange(index, "model", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className='block font-medium'>Storage</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='text'
                            value={variant.attributes?.storage || ""}
                            onChange={(e) =>
                              handleVariantAttributeChange(
                                index,
                                "storage",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        <div>
                          <label className='block font-medium'>Size</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='text'
                            value={variant.attributes?.size || ""}
                            onChange={(e) =>
                              handleVariantAttributeChange(index, "size", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className='block font-medium'>Disponible</label>
                          <select
                            className='w-full rounded-md border border-gray-300 p-2'
                            value={String(variant.available)}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "available",
                                e.target.value === "true",
                              )
                            }
                          >
                            <option value='true'>Sí</option>
                            <option value='false'>No</option>
                          </select>
                        </div>
                      </div>

                      <div className='mt-4'>
                        <label className='block font-medium'>Imagen de variante</label>
                        <input
                          type='file'
                          className='w-full rounded-md border border-gray-300 p-2'
                          onChange={(e) => handleVariantImageUpload(index, e)}
                        />
                      </div>

                      <div className='mt-4 flex flex-wrap gap-3'>
                        {(variant.images || []).map((img, imageIndex) => (
                          <div key={imageIndex}>
                            <img
                              src={img}
                              alt='Variant'
                              className='h-24 w-24 rounded-md object-cover'
                            />
                            <button
                              type='button'
                              className='mt-1 rounded bg-red-500 px-2 py-1 text-xs text-white'
                              onClick={() => removeVariantImage(index, imageIndex)}
                            >
                              Quitar imagen
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay variantes disponibles</p>
                )}
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <a
                href={getFirstImage(prodEd) || "#"}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600'
              >
                Ver imagen principal
              </a>

              <button
                className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
                type='submit'
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
