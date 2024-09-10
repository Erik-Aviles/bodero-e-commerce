import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

const Acccount = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  if (!session) {
    return <p className="text-center text-red-500">No estás autenticado</p>;
  }

  const { fullname, email, role, createdAt, updatedAt, avatar } = session.user;
  const formattedExpiration = new Date(session.expires).toLocaleString();
  const formattedCreatedAt = new Date(createdAt).toLocaleString();
  const formattedUpdatedAt = new Date(updatedAt).toLocaleString();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-sm">
      <h4 className="text-xl font-semibold text-primary m-0 pb-2 border-b-1 border-gray-200">
        Información de la sesión
      </h4>
      <div className="border-b-1 py-2 border-gray-200 flex flex-col md:justify-between md:flex-row">
        <div className="flex flex-col gap-2 p-2 md:pb-4 basis-[40%] ">
          <span className="uppercase text-warning text-center font-semibold">
            DATOS
          </span>
          <p className="text-gray-600 capitalize">
            <span className="font-bold text-primary-800">Rol:</span> {role}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">Nombre Completo:</span>{" "}
            {fullname.toUpperCase()}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Correo Electrónico:
            </span>{" "}
            {email}
          </p>

          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Fecha de Creación:
            </span>{" "}
            {formattedCreatedAt}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Fecha de Actualizacion:
            </span>{" "}
            {formattedUpdatedAt}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">Expira en:</span>{" "}
            {formattedExpiration}
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2 md:pb-4 md:pl-4  md:border-l-1 border-gray-200 basis-[40%]">
          <span className="flex flex-col justify-center items-center uppercase text-warning  font-semibold">
            Permisos
          </span>
          <p className="text-gray-600 capitalize">
            <span className="font-bold text-primary-800">Rol:</span> {role}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">Nombre Completo:</span>{" "}
            {fullname.toUpperCase()}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Correo Electrónico:
            </span>{" "}
            {email}
          </p>

          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Fecha de Creación:
            </span>{" "}
            {formattedCreatedAt}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">
              Fecha de Actualizacion:
            </span>{" "}
            {formattedUpdatedAt}
          </p>
          <p className="text-gray-600">
            <span className="font-bold text-primary-800">Expira en:</span>{" "}
            {formattedExpiration}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center md:border-l-1 border-gray-200 font-semibold basis-[20%]">
          <span className="uppercase text-warning">FOTO</span>
          <figure className="p-2">
            <Avatar src={avatar?.at(0)} className="w-40 h-40 text-large " />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Acccount;
