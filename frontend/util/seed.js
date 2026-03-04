const products = [
  {
    title: "Base Mate Alta Cobertura",
    description: "Base mate de larga duración, ideal para piel mixta a grasa.",
    price: 22.0,
    slug: "base-mate-alta-cobertura",
    category: 3,
    stock: 0,
  },
  {
    title: "Iluminador Líquido",
    description: "Iluminador suave para un brillo natural.",
    price: 15.5,
    slug: "iluminador-liquido",
    category: 4,
    stock: 25,
  },
  {
    title: "Polvo Compacto",
    description: "Fijador compacto para acabado mate.",
    price: 12.0,
    slug: "polvo-compacto",
    category: 3,
    stock: 40,
  },
  {
    title: "Máscara Volumen Extremo",
    description: "Pestañas más largas y voluminosas.",
    price: 18.0,
    slug: "mascara-volumen-extremo",
    category: 2,
    stock: 30,
  },
  {
    title: "Delineador Líquido Precisión",
    description: "Punta fina para trazos perfectos.",
    price: 10.0,
    slug: "delineador-liquido-precision",
    category: 2,
    stock: 50,
  },
  {
    title: "Labial Mate Larga Duración",
    description: "Color intenso y duradero.",
    price: 14.0,
    slug: "labial-mate-larga-duracion",
    category: 5,
    stock: 60,
  },
  {
    title: "Bronzer Natural",
    description: "Tono cálido para contorno sutil.",
    price: 16.0,
    slug: "bronzer-natural",
    category: 3,
    stock: 35,
  },
  {
    title: "Bálsamo Labial Hidratante",
    description: "Hidratación diaria con SPF.",
    price: 8.0,
    slug: "balsamo-labial-hidratante",
    category: 5,
    stock: 80,
  },
  {
    title: "Set Brochas Básico",
    description: "Set de 5 brochas esenciales para maquillaje.",
    price: 30.0,
    slug: "set-brochas-basico",
    category: 6,
    stock: 20,
  },
  {
    title: "Primer Matificante",
    description: "Prepara la piel para el maquillaje y controla el brillo.",
    price: 20.0,
    slug: "primer-matificante",
    category: 3,
    stock: 45,
  },
];

for (const product of products) {
  await fetch("http://localhost:1337/api/products", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer efd942a0e3e198c54340591c86bad97a20643afacabd54386a0a31a0b199c62e0376761ae79247fbf142252b5de9ac6c45d1d50257c137c0128f9663472fad5e43f7a50ed07c300c7c7bfd9fe323ff50b2398d7049c85bb3cc6680a085da3bc45b8bac2c93efd05869e3a27efe24aed21a2a961238943ef5bbb6f95e2da1159e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: product }),
  });
}
