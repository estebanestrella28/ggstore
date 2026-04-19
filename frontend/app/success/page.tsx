"use client";

import { useCartStore } from "@/store/cartStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "canceled"
  | "expired"
  | "not_found";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentIntent) return;

    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout>;
    let hasClearedCart = false;
    let currentController: AbortController | null = null;

    const poll = async () => {
      currentController = new AbortController();
      try {
        const res = await fetch(
          `/api/payment/status?payment_intent=${paymentIntent}`,
          { signal: controller.signal },
        );
        const data = await res.json();

        setStatus(data.status);

        if (data.status === "paid" && !hasClearedCart) {
          clearCart();
          hasClearedCart = true;
        }

        if (data.status !== "pending") {
          setLoading(false);
          return;
        }

        // 🔁 seguir intentando
        timeoutId = setTimeout(poll, 2000);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;

        console.error("Polling error:", error);
        setLoading(false);
        setError("Error obteniendo el estado del pago");
      }
    };

    poll();

    return () => {
      if (currentController) {
        currentController.abort();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [paymentIntent]);

  if (loading) {
    return <div>Cargando estado del pago...</div>;
  }

  if (error) return <div>{error}</div>;

  if (!status || status === "not_found") {
    return (
      <>
        <div>No se encontró la orden</div>
        <a className="text-blue-300" href="/cart">
          Volver al Carrito
        </a>
      </>
    );
  }

  if (status === "paid") {
    return (
      <>
        <div>Pago completado correctamente</div>
        <a className="text-blue-300" href="/catalog">
          Volver al Catalogo
        </a>
      </>
    );
  }

  return <div>El pago no se pudo completar</div>;
}
