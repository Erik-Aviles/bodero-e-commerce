import React from "react";

const SystemAppearance = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-sm">
      <h4 className="text-xl font-semibold text-primary m-0 pb-2 border-b-1 border-gray-200">
        Información de la empresa
      </h4>
      <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row gap-5">
        <div className="flex items-center lg:justify-between basis-[33%] ">
          {/* Logo de la empresa */}
          <div className="w-full justify-center gap-4 flex items-center md:justify-between mb-6">
            <img
              className="h-16 w-16 object-contain rounded-full shadow-md"
              src="/logo.jpg"
              alt="Company Logo"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                BODERO RACING DEVELOPMENT
              </h2>
              <p className="text-sm text-gray-500">
                Tienda en linea de repuesto para motos
              </p>
            </div>
          </div>
        </div>

        {/* Información General */}
        <div className="space-y-2 basis-[45%]">
          <div className="">
            <span className="text-primary font-semibold pr-2">Dirección:</span>
            <span className="text-gray-800">
              Av. Walter Andrade, primera esquina, Quevedo, Ecuador
            </span>
          </div>

          <div className="">
            <span className="text-primary font-semibold pr-2">Teléfono:</span>
            <span className="text-gray-800">(099) 650-1072</span>
          </div>

          <div className="">
            <span className="text-primary font-semibold pr-2">
              Correo Electrónico:
            </span>
            <span className="text-gray-800"> boderoracing2016@gmail.com</span>
          </div>

          <div className="">
            <span className="text-primary font-semibold pr-2">Sitio Web:</span>
            <a
              href="https://boderoracing.vercel.app/"
              className="text-indigo-600 hover:text-indigo-800"
            >
              https://boderoracing.vercel.app
            </a>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="flex md:flex-col md:gap-3 justify-evenly basis-[20%]">
          <a
            href="#"
            className="text-gray-500 hover:text-primary transition duration-300 capitalize"
          >
            <i className="fab fa-facebook-f">facebook</i>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-primary transition duration-300 capitalize"
          >
            <i className="fab fa-twitter">twitter</i>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-primary transition duration-300 capitalize"
          >
            <i className="fab fa-linkedin-in">linkedin</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SystemAppearance;
