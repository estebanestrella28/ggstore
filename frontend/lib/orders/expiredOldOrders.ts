import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function expireOldOrders() {
  try {
    const expirationTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await prisma.order.updateMany({
      where: {
        status: OrderStatus.pending,
        createdAt: {
          lt: expirationTime,
        },
      },
      data: {
        status: OrderStatus.expired,
      },
    });

    console.log(`Expired orders: ${result.count}`);
  } catch (error) {
    console.error("Error updating expired orders: ", error);
    throw new Error("Error updating expired orders");
  }
}
