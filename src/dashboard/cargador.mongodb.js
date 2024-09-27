// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("products");

// Create a new document in the collection.
db.getCollection("products").insertMany([
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 14 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 14 Pro",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 14",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 13 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 13 Pro",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "Leather Case iPhone 13",
    marca: "iPhone Case",
    descripcion:
      "Estas fundas no solo ofrecen protección contra golpes y arañazos, sino que también agregan un toque de elegancia y estilo al iPhone. Por lo general, están diseñadas para adaptarse perfectamente al contorno del teléfono, brindando acceso completo a todos los botones y puertos. Además de su función protectora, las leather cases a menudo se eligen por su acabado suave al tacto y su apariencia sofisticada.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
    ],
    stockGeneral: 4,
    estado: "Nuevo",
    precioBase: 10,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Leather Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/Proyecto_nuevo_1_geha3j.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Leather Brown",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142773/leather_zpb83h.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Pink",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_rowsd9.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Leather Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714142772/Proyecto_nuevo_2_dpjpuh.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
]);
