import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import SystemAppearance from "@/components/SystemAppearance";
import Orders from "@/components/Orders";
import SaledHistoryProduct from "@/components/SaledHistoryProduct";

export default function SalesPage() {
  const router = useRouter();
  const { section = "orders" } = router.query;

  const inactive = " flex gap-2 cursor-pointer pb-2 text-tiny lg:text-sm";
  const active = "font-semibold border-b-3 border-warning ";

  const handleSectionChange = (newSection) => {
    router.push(`/business/sales?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (!section) {
      router.push("/business/sales?section=orders", undefined, {
        shallow: true,
      });
    }
  }, [section, router]);

  // Memorizar la navegación para evitar renderizados innecesarios
  const navItems = useMemo(
    () => [
      { id: "orders", label: "Ordenes" },
      { id: "saled-products", label: "Historial de ventas" },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Panel | Ventas</title>
      </Head>
      <Layout>
        <h3>Panel de ventas</h3>
        <div className="flex flex-col gap-2 pt-2">
          <header className="w-full flex flex-col gap-2 bg-white border border-grayDark/50 p-5 rounded-lg">
            <nav>
              <ul className="flex gap-3 border-b-2 border-grayLight/60 ">
                {navItems.map(({ id, label }) => (
                  <li
                    key={id}
                    className={`${inactive} ${section === id ? active : ""}`}
                    onClick={() => handleSectionChange(id)}
                  >
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <section className="flex flex-col">
            <h4 className="w-fit pr-11 text-sm md:text-medium font-semibold text-primary m-0 border-b-1 border-[#97a8bc]">
              {section === "orders" && "Ordenes"}
              {section === "saled-products" &&
                "Historial de ventas de producto"}
            </h4>
            {section === "orders" && <Orders />}
            {section === "saled-products" && <SaledHistoryProduct />}
          </section>
        </div>
      </Layout>
    </>
  );
}
