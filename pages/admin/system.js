import RoleAndPermissions from "@/components/RoleAndPermissions";
import SystemAppearance from "@/components/SystemAppearance";
import Acccount from "@/components/Acccount";
import { useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SystemPage() {
  const router = useRouter();
  const { section = "roles-permissions" } = router.query;

  const inactive = " flex gap-2 cursor-pointer pb-2 text-tiny lg:text-sm";
  const active = "font-semibold border-b-3 border-warning ";

  const handleSectionChange = (newSection) => {
    router.push(`/admin/system?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (!section) {
      router.push("/admin/system?section=roles-permissions", undefined, {
        shallow: true,
      });
    }
  }, [section, router]);

  // Memorizar la navegación para evitar renderizados innecesarios
  const navItems = useMemo(
    () => [
      { id: "roles-permissions", label: "Roles y Permisos" },
      { id: "system-appearance", label: "Aspecto de la Plataforma" },
      { id: "account", label: "Información de la cuenta" },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Panel | Administración</title>
      </Head>
      <Layout>
        <h3>Panel de Administración</h3>
        <div className="w-full flex flex-col gap-2 bg-white border border-grayDark/50 p-5 rounded-lg mt-3">
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
        </div>
        <section className="pt-5">
          {section === "roles-permissions" && <RoleAndPermissions />}
          {section === "system-appearance" && <SystemAppearance />}
          {section === "account" && <Acccount />}
        </section>
      </Layout>
    </>
  );
}
