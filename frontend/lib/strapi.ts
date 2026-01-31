import formatCurrency from "@/util/formatCurrency";

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

if (!STRAPI_HOST) {
  throw new Error("STRAPI_HOST no está definido");
}

if (!STRAPI_TOKEN) {
  throw new Error("STRAPI_TOKEN no está definido");
}

export async function query(url: string) {
  const res = await fetch(`${STRAPI_HOST}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  const { data, meta } = await res.json();
  return { data, meta };
}

export function getCategories() {
  return query("categories?populate[image][fields][0]=url").then((res) => {
    const { data, meta } = res;

    return data.map((category) => {
      const { id, name, slug, image: rawImage } = category;
      const image = `${STRAPI_HOST}${rawImage.url}`;

      return { id, name, slug, image };
    });
  });
}

export function getProducts({
  categoryId,
}: {
  categoryId: string | undefined;
}) {
  return query(
    `products?filters[category][slug][$eq]=${categoryId}&populate[images][fields][0]=url&populate[category][fields][0]=name`,
  ).then((res) => {
    const { data, meta } = res;

    const products = data.map((product: any) => {
      const { id, title, price: rawPrice, slug, images: rawImages } = product;
      const images = rawImages.map(
        (image: any) => `${STRAPI_HOST}${image.url}`,
      );

      const price = formatCurrency(rawPrice);

      return { id, title, price, slug, images };
    });

    return { products, pagination: meta.pagination };
  });
}
