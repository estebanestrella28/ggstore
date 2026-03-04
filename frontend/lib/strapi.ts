import { FiltersState } from "@/types/filters";
import type { Product, ProductAPI } from "@/types/products";
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

type getProductsProps = {
  filters?: FiltersState;
};

export function getProducts({ filters }: getProductsProps = {}) {
  const parts = [];

  if (filters?.search) {
    parts.push(`filters[title][$contains]=${filters.search}`);
  }

  if (filters?.category) {
    parts.push(`filters[category][slug][$eq]=${filters.category}`);
  }

  if (filters?.priceMin !== undefined && filters.priceMin > 0) {
    parts.push(`filters[price][$gte]=${filters.priceMin}`);
  }

  if (filters?.priceMax !== undefined && filters.priceMax > 0) {
    parts.push(`filters[price][$lte]=${filters.priceMax}`);
  }

  // add populate
  parts.push(`populate[images][fields][0]=url`);
  parts.push(`populate[category][fields][0]=name`);

  const queryString = parts.length ? `?${parts.join("&")}` : "";

  return query(`products${queryString}`).then((res) => {
    const { data, meta } = res;

    const products: Product[] = data.map((product: ProductAPI) => {
      const { id, title, price: rawPrice, slug, images: rawImages } = product;

      const images = rawImages
        ? rawImages.map((image) => {
            return `${STRAPI_HOST}${image.url}`;
          })
        : ["logo2.png"];

      const price = formatCurrency(rawPrice);

      return { id, title, price, slug, images };
    });

    return { products, pagination: meta.pagination };
  });
}
