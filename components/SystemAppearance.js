import React from "react";
import BackgroundCompanyBrands from "./company/BackgroundCompanyBrands";
import CompanyInformation from "./company/CompanyInformation";
import CompanyBanner from "./company/CompanyBanner";
import CompanyBrand from "./company/CompanyBrand";

const SystemAppearance = () => {
  return (
    <section className="flex flex-col gap-2">
      {/* INFORMACION DE LA EMPRESA */}
      <CompanyInformation />
      {/* BANNER DE LA TIENDA */}
      <CompanyBanner />
      {/* MARCAS DE LA TIENDA */}
      <CompanyBrand />
      {/* FONDO EN LAS MARCAS DE LA TIENDA */}
      <BackgroundCompanyBrands />
    </section>
  );
};

export default SystemAppearance;
