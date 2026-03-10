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
      color: "",
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
  return [attrs.color, attrs.model, attrs.storage, attrs.size]
    .filter(Boolean)
    .join(" · ");
}

export default function ProdEdit() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
            color: variant.attributes?.color || "",
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

                        <div>
                          <label className='block font-medium'>Color</label>
                          <input
                            className='w-full rounded-md border border-gray-300 p-2'
                            type='text'
                            value={variant.attributes?.color || ""}
                            onChange={(e) =>
                              handleVariantAttributeChange(index, "color", e.target.value)
                            }
                          />
                        </div>

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
