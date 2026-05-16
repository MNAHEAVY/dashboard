"use client";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(initialFormState);

  //
  useEffect(() => {
    console.log("🎨 COLORS STATE:");
    inputForm.colors.forEach((c, i) => {
      console.log(`Color ${i}:`, {
        colorKey: c.colorKey,
        colorLabel: c.colorLabel,
      });
    });
  }, [inputForm.colors]);

  useEffect(() => {
    console.log("📦 VARIANTS STATE:");
    inputForm.variants.forEach((v, i) => {
      console.log(`Variant ${i}:`, {
        colorKey: v.attributes?.colorKey,
        colorLabel: v.attributes?.colorLabel,
      });
    });
  }, [inputForm.variants]);
  //
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

      // 🔥 sincronizar variantes que usen este color
      const updatedVariants = prev.variants.map((variant) => {
        if (variant.attributes?.colorKey === prev.colors[index].colorKey) {
          return {
            ...variant,
            attributes: {
              ...variant.attributes,
              [name]: value,
            },
          };
        }
        return variant;
      });

      return {
        ...prev,
        colors: newColors,
        variants: updatedVariants,
      };
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
    const cleanColors = inputForm.colors.filter(
      (c) => normalizeText(c.colorKey) || normalizeText(c.colorLabel),
    );
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
                colorKey: color.colorKey,
                colorLabel: color.colorLabel,
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
              colorKey: color.colorKey,
              colorLabel: color.colorLabel,
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
              colorKey: color.colorKey,
              colorLabel: color.colorLabel,
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
            colorKey: color.colorKey,
            colorLabel: color.colorLabel,
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
      console.log(payload);
      await axios.post(`${API_BASE_URL}/products`, payload);

      toast.success("Producto creado con éxito.");
      setInputForm(initialFormState);
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto.");
    }
  };

  const [openVariantDropdown, setOpenVariantDropdown] = useState(null);
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
  const getColorFromPalette = (key) => {
    if (!key) return "#000000";
    const [group, level] = key.split("-");
    return tailwindPalette[group]?.[level] || "#000000";
  };
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };
  const [activeGroup, setActiveGroup] = useState(colorGroups[0]);
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
        {/* --- SECCIÓN 1: SELECTOR TÉCNICO DE COLOR --- */}
        <div>
          <strong className='mb-2 block text-center'>Sección color del producto</strong>
          <p className='mb-4 text-sm'>
            Agrega colores si el producto tiene variantes por color.
          </p>
        </div>
        {inputForm.colors.map((color, index) => (
          <div className='mb-4 flex flex-col space-y-2 rounded border p-4' key={index}>
            {/* --- SECCIÓN 1: SELECTOR TÉCNICO DE COLOR --- */}
            <label className='text-sm font-medium text-gray-700'>Color técnico</label>

            {/* Selector Custom */}
            <div className='group/dropdown relative w-full z-[100]'>
              <div
                onClick={() => toggleDropdown(index)}
                className='w-full rounded border border-gray-300 p-2 bg-white cursor-pointer flex justify-between items-center hover:border-blue-500 transition-all'
              >
                {" "}
                <div className='flex items-center gap-2'>
                  {/* Pequeña muestra del color seleccionado actualmente */}
                  {color.colorKey && (
                    <div
                      className='w-4 h-4 rounded-full border border-gray-200'
                      style={{
                        backgroundColor: color.colorKey.includes("-")
                          ? tailwindPalette[color.colorKey.split("-")[0]]?.[
                              color.colorKey.split("-")[1]
                            ]
                          : color.colorKey,
                      }}
                    />
                  )}
                  <span className='text-sm font-bold uppercase tracking-tight'>
                    {color.colorKey || "Seleccionar color"}
                  </span>
                </div>
                <span className='text-gray-400 text-[10px]'>▼</span>
              </div>

              {/* Menú Principal */}
              {openDropdown === index && (
                <div className='absolute left-0 top-full mt-1 w-full max-w-[600px] bg-white border border-gray-200 shadow-2xl rounded-lg py-2 max-h-80 overflow-y-auto scrollbar-thin'>
                  {/* Colores Sólidos */}
                  <div className='px-2'>
                    {["black", "white"].map((c) => (
                      <div
                        key={c}
                        onClick={() => {
                          handleColorChangeB(index, "colorKey", c);
                          setOpenDropdown(null);
                        }}
                        className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center capitalize rounded'
                      >
                        {c === "black" ? "Negro" : "Blanco"}
                        <div
                          className='w-4 h-4 border border-gray-300 rounded shadow-inner'
                          style={{ backgroundColor: c }}
                        />
                      </div>
                    ))}
                  </div>

                  <hr className='my-2 border-gray-100' />

                  {/* Grupos Dinámicos en columnas */}
                  <div className='flex w-full'>
                    {/* COLUMNA IZQUIERDA */}
                    <div className='w-1/2 border-r'>
                      {colorGroups.map((group) => (
                        <div
                          key={group.val}
                          onMouseEnter={() => setActiveGroup(group)}
                          className='px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm'
                        >
                          {group.name}
                        </div>
                      ))}
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className='w-1/2 max-h-72 overflow-y-auto sticky top-0 bg-white'>
                      {activeGroup &&
                        levels.map((level) => {
                          const fullValue = `${activeGroup.val}-${level}`;
                          const hexColor =
                            tailwindPalette[activeGroup.val]?.[level] || "#ccc";

                          return (
                            <div
                              key={level}
                              onClick={() => {
                                handleColorChangeB(index, "colorKey", fullValue);
                                setOpenDropdown(null);
                              }}
                              className='px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm flex justify-between items-center transition-all'
                            >
                              <span className='font-mono'>{level}</span>
                              <div
                                className='w-full h-6 rounded shadow-sm border border-black/10'
                                style={{ backgroundColor: hexColor }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* --- SECCIÓN 2: RESTO DEL FORMULARIO ORIGINAL --- */}
            <label className='text-sm font-medium mt-2'>Nombre visible</label>
            <input
              type='text'
              className='rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-200 outline-none'
              placeholder='Ej: Titanio Negro'
              name='colorLabel'
              value={color.colorLabel}
              onChange={(event) => handleColorChange(index, event)}
            />

            <label className='text-sm font-medium'>Imagen</label>
            <input
              type='file'
              className='text-xs'
              onChange={(event) => handleImageUploadColor(index, event)}
            />
            {color.imageColor && (
              <div className='mt-1'>
                <img
                  src={color.imageColor}
                  alt='Preview'
                  className='h-16 w-16 rounded shadow-md object-cover border'
                />
              </div>
            )}

            <div className='flex gap-4 items-end'>
              <div className='flex-1'>
                <label className='text-sm font-medium'>Stock</label>
                <input
                  className='w-full rounded border border-gray-300 p-2'
                  type='number'
                  name='stockColor'
                  value={color.stockColor}
                  onChange={(event) => handleColorChange(index, event)}
                />
              </div>
              <button
                className='rounded bg-red-50 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white transition-all text-sm font-bold'
                type='button'
                onClick={() => removeColor(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <button
          className='mt-4 rounded bg-green-500 py-2 text-white'
          type='button'
          onClick={addColor}
        >
          Añadir color
        </button>

        {/* --- SECCIÓN 1: SELECTOR TÉCNICO DE COLOR --- */}

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
                  {/* COLOR TECNICO DE LAS VARIANTE PARA POSIBILIDAD DE MODIFICAR*/}
                  {/* 🔵 COLOR TÉCNICO */}
                  <div>
                    <label className='block text-sm font-medium'>Color técnico</label>

                    <div className='relative'>
                      {/* BOTÓN */}
                      <div
                        onClick={() =>
                          setOpenVariantDropdown((prev) =>
                            prev === index ? null : index,
                          )
                        }
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

                          <span className='text-sm text-gray-700'>
                            {variant.attributes?.colorKey || "Seleccionar color"}
                          </span>
                        </div>
                      </div>

                      {/* DROPDOWN */}
                      {openVariantDropdown === index && (
                        <div className='absolute left-0 top-full mt-1 w-full max-w-[600px] bg-white border border-gray-200 shadow-2xl rounded-lg py-2 max-h-72 overflow-y-auto z-50'>
                          {/* COLORES SÓLIDOS */}
                          <div className='px-2'>
                            {["black", "white"].map((c) => (
                              <div
                                key={c}
                                onClick={() => {
                                  handleVariantAttributeChange(index, "colorKey", c);
                                  setOpenVariantDropdown(null);
                                }}
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center capitalize rounded'
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

                          {/* PANEL */}
                          <div className='flex w-full max-h-72'>
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

                            <div className='w-1/2 sticky top-0 bg-white'>
                              {activeGroup &&
                                levels.map((lvl) => {
                                  const key = `${activeGroup.val}-${lvl}`;
                                  const hex = tailwindPalette[activeGroup.val]?.[lvl];

                                  return (
                                    <div
                                      key={key}
                                      onClick={() => {
                                        handleVariantAttributeChange(
                                          index,
                                          "colorKey",
                                          key,
                                        );
                                        setOpenVariantDropdown(null);
                                      }}
                                      className='flex items-center justify-between px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm transition-all'
                                    >
                                      <span className='font-mono'>{lvl}</span>
                                      <div
                                        className='w-full h-6 rounded border border-black/10'
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

                  {/* 🟣 COLOR LABEL (EDITABLE) */}
                  <div>
                    <label className='block text-sm font-medium'>Nombre visible</label>

                    <input
                      className='w-full rounded border border-gray-300 p-2'
                      value={variant.attributes?.colorLabel || ""}
                      onChange={(e) =>
                        handleVariantAttributeChange(index, "colorLabel", e.target.value)
                      }
                      placeholder='Ej: Titanio Negro'
                    />
                  </div>
                  {/* COLOR TECNICO DE LAS VARIANTE PARA POSIBILIDAD DE MODIFICAR*/}
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
