import { NextResponse } from "next/server";
import { getProductsById } from "@/lib/strapi";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // 2- obtiene los parametros de la request { 'ids' => '16,17' }

    const idsParam = searchParams.get("ids"); // 3. obtienes solo el value de los ids (16,17)
    const ids =
      idsParam
        ?.split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => Number.isInteger(id) && id > 0) || []; // 4. convierte el id en un array u lo tranforma a number [ 16, 17 ]

    const { products } = await getProductsById(ids); // 5. obtiene los productos por el id de los search params

    return NextResponse.json({ products }); // 6. devuelve los datos
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 },
    );
  }
}
