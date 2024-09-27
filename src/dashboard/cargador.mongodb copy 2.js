// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("products");

// Create a new document in the collection.
db.getCollection("products").insertMany([
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 15 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 8,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Red",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Green",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085082/iphone%2015%20pro/IMG_2630_1_ys1n2z.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Light-Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2015%20pro/IMG_2630_2_zuh6lp.png",
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
    nombre: "MagCase Color iPhone 15 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 8,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085095/iphone%2014%20pro/IPHONE_BASE_3_ncwqwk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Green",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085082/iphone%2015%20pro/IMG_2630_1_ys1n2z.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2015%20pro/IMG_2630_2_zuh6lp.png",
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
    nombre: "MagCase Color iPhone 15",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 8,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Red",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Yellow",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085083/iphone%2015/IMG_2630_k1ixqx.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
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
    nombre: "MagCase Color iPhone 14 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Magenta",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },

      {
        nombre: "Green",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085082/iphone%2015%20pro/IMG_2630_1_ys1n2z.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Light-Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2015%20pro/IMG_2630_2_zuh6lp.png",
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
    nombre: "MagCase Color iPhone 14 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Gray",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085080/iphone%2015%20pro/IMG_2630_3_ycg2fk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
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
    nombre: "MagCase Color iPhone 14",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Gray",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2014%20pro/IPHONE_BASE_1_cybusz.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085090/iphone%2014%20pro%20max/IPHONE_BASE_4_tt4vyk.png",
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
    nombre: "MagCase Color iPhone 13 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085080/iphone%2015%20pro/IMG_2630_3_ycg2fk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Light-Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
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
    nombre: "MagCase Color iPhone 13 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Red",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Yellow",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085083/iphone%2015/IMG_2630_k1ixqx.png",
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
    nombre: "MagCase Color iPhone 13",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Grey",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085080/iphone%2015%20pro/IMG_2630_3_ycg2fk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Magenta",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Green",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085082/iphone%2015%20pro/IMG_2630_1_ys1n2z.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085095/iphone%2014%20pro/IPHONE_BASE_3_ncwqwk.png",
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
    nombre: "MagCase Color iPhone 12 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Light-Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2015%20pro/IMG_2630_2_zuh6lp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085090/iphone%2014%20pro%20max/IPHONE_BASE_4_tt4vyk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
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
    nombre: "MagCase Color iPhone 12",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Light-Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2015%20pro/IMG_2630_2_zuh6lp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Purple",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085090/iphone%2014%20pro%20max/IPHONE_BASE_4_tt4vyk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Rose",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
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
    nombre: "MagCase Color iPhone 11 Pro Max",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 0,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
        stockColor: 0,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
  {
    categorias: "Accesorios",
    subCategoria: "Fundas",
    nombre: "MagCase Color iPhone 11 Pro",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 2,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085080/iphone%2015%20pro/IMG_2630_3_ycg2fk.png",
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
    nombre: "MagCase Color iPhone 11",
    marca: "iPhone Case",
    descripcion:
      "Accesorio elegante y duradero diseñado para proteger tu teléfono de arañazos, caídas y otros desgastes cotidianos. Hecho de PC + TPU, es resistente y duradero, Simple, cómodo, fácil de llevar, Con anillo magnético incorporado que se alinea para la carga MagSafe de los teléfonos. Consulta previamente la disponibilidad de colores antes de realizar la compra ademas del detalle brillante en la camara.",
    imagenGeneral: [
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_3_xiazo8.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085097/iphone%2014/IPHONE_BASE_1_ifvjh5.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_1_xhmebr.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085096/iphone%2014%20pro%20max/IPHONE_BASE_2_jhwfbv.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085091/iphone%2015%20pro%20max/IMG_2630_odxsht.png",
      "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085081/iphone%2014%20pro/IPHONE_BASE_2_eu5luc.png",
    ],
    stockGeneral: 5,
    estado: "Nuevo",
    precioBase: 7,
    disponible: true,
    tipo: "Accesorio",
    color: [
      {
        nombre: "Blue",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085098/iphone%2014/IPHONE_BASE_2_yjy2yp.png",
        stockColor: 1,
        estado: "Nuevo",
      },
      {
        nombre: "Black",
        imageColor:
          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1714085080/iphone%2015%20pro/IMG_2630_3_ycg2fk.png",
        stockColor: 1,
        estado: "Nuevo",
      },
    ],
    almacenamiento: [],
    modelo: [],
  },
]);
