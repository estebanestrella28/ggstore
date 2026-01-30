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

  const { data } = await res.json();
  return data;
}

export function getCategories() {
  return query("categories?populate[image][fields][0]=url").then((res) => {
    return res.map((category) => {
      const { id, name, slug, image: rawImage } = category;
      const image = `${STRAPI_HOST}${rawImage.url}`;

      return { id, name, slug, image };
    });
  });
}
