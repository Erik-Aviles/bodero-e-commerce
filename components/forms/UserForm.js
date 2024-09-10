import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import avatarLocal from "@/public/images/avatar/avatarUser.png";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, EditIcon, UpLoadIcon } from "../Icons";
import ButtonClose from "../buttons/ButtonClose";
import { roleList } from "@/resources/roleList";
import { Loader } from "../snnipers/Loader";
import { useContext, useState } from "react";
import { capitalize } from "@/utils/utils";
import useLoading from "@/hooks/useLoading";
import { ClipLoader } from "react-spinners";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import axios from "axios";

const UserForm = ({ user, titulo, textSmall, toggleModal }) => {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const { mutateUsers } = useUsers();
  const { showNotification } = useContext(NotificationContext);

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user?.role || "user");
  const [avatar, setAvatar] = useState(user?.avatar || []);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  //registrar usuario
  async function saveUser(e) {
    e.preventDefault();
    let rest = {
      fullname: fullname.toLowerCase(),
      email,
      password,
      confirmPassword,
      role,
      avatar,
    };
    try {
      const { data } = await axios.post("/api/auth/register", rest);
      showNotification({
        open: true,
        msj: `Usuario: ${capitalize(rest.fullname)}, ${data.message}`,
        status: "success",
      });
      mutateUsers();
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setAvatar([]);
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //editar usuario
  async function editUser(e) {
    e.preventDefault();
    let rest = {
      fullname: fullname.toLowerCase(),
      email,
      role,
      avatar,
    };
    const _id = user._id;
    try {
      const { data } = await axios.put("/api/users/full", { ...rest, _id });
      showNotification({
        open: true,
        msj: `Usuario: ${capitalize(rest.fullname)}, ${data.message}`,
        status: "success",
      });
      mutateUsers();
      setFullname("");
      setEmail("");
      setRole("");
      setAvatar([]);
      toggleModal();
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response.data.message,
        status: "error",
      });
    }
  }

  //subir imagen
  const handleUpload = async (e) => {
    e.preventDefault();
    startLoading();
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/uploadcloudinary", data);
      setAvatar((oldImages) => {
        return [...oldImages, ...res.data?.links];
      });
    }
    setIsUploading(false);
    finishtLoading();
  };

  //eliminar imagen
  function handeDeleteImage(index) {
    const updateAvatar = [...avatar];
    updateAvatar.splice(index, 1);
    setAvatar(updateAvatar);
    showNotification({
      open: true,
      msj: "Foto eliminada con exito!",
      status: "success",
    });
  }

  return (
    <div className="relative w-full flex flex-col justify-center ">
      <header className=" flex flex-row justify-between">
        <h3 className="text-lg font-semibold">{titulo}</h3>
        <ButtonClose onClick={toggleModal} />
      </header>
      <p className="text-primary text-xs pb-3">{textSmall}</p>
      <form
        className="flex flex-col gap-2 "
        onSubmit={!user ? saveUser : editUser}
      >
        <div className="flex flex-col gap-2 w-full overflow-auto ">
          <div className="flex flex-col md:flex-row gap-2">
            <fieldset className="bg-grayLight flex flex-col gap-2 border-container">
              <legend className="text-center text-secondary">
                CREDENCIALES
              </legend>
              <div className="xs:flex xs:gap-2">
                <div className="relative">
                  <label className="block my-1">Foto de perfil</label>
                  <div className="relative flex flex-col justify-center items-center gap-3 border border-grayDark/50 rounded-lg p-3">
                    <div className="relative group bg-white w-32 h-32 flex flex-col justify-center items-center rounded-full p-1">
                      {isUploading ? (
                        <div className="bg-white w-32 h-32 flex justify-center items-center rounded-full p-1">
                          <Loader />
                        </div>
                      ) : !!avatar?.length ? (
                        avatar.map((link, index) => (
                          <>
                            <Image
                              key={index}
                              width={100}
                              height={100}
                              src={link}
                              alt={`Imagen de ${fullname}`}
                              className="text-xs rounded-full object-cover h-full w-full p-1"
                            />

                            <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                              <button onClick={() => handeDeleteImage(index)}>
                                <DeleteIcon className="w-6 h-6 text-red stroke-2 bg-white rounded-full" />
                              </button>
                            </div>
                          </>
                        ))
                      ) : (
                        <Image
                          width={100}
                          height={100}
                          src={avatarLocal}
                          alt={`Imagen de un avatar de usuario`}
                          className="text-xs rounded-full object-cover h-full w-full p-1"
                        />
                      )}
                    </div>
                    {avatar.at(0) || isUploading ? null : (
                      <label className="m-0 absolute bottom-2 right-2 bg-white  border border-secundary flex gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-md py-1 px-2">
                        <UpLoadIcon size={12} />
                        <span>Subir</span>
                        <input
                          type="file"
                          onChange={handleUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {avatar.length !== 0 && (
                    <p className="absolute bottom-0 left-0 right-0 text-center text-secundary text-xs">
                      Eliminar la foto para cambiar.
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="">
                    <label className="block my-1">Tipo de usuario</label>
                    <Autocomplete
                      aria-label="Selección de el rol"
                      label="Roles"
                      defaultItems={roleList}
                      selectedKey={role}
                      onSelectionChange={setRole}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.rol}>
                          {item.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </div>
                  <div className="">
                    <label className="block my-1">Correo (*)</label>
                    <Input
                      type="text"
                      value={email}
                      isRequired={true}
                      placeholder="Escribir correo válido"
                      labelPlacement="outside"
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <label className="block my-1">Nombre completo (*)</label>
                <Input
                  type="text"
                  value={fullname}
                  isRequired={!user && true}
                  placeholder="Escribir el nombre completo"
                  labelPlacement="outside"
                  onChange={(e) => setFullname(e.target.value.toLowerCase())}
                />
              </div>

              {!user && (
                <div className="xs:flex xs:gap-2">
                  <div className="w-full">
                    <label className="my-1 block">
                      Contraseña
                      {!user && " (*)"}
                    </label>
                    <Input
                      type="text"
                      value={password}
                      isRequired={!user && true}
                      placeholder={
                        !user ? "Escribir contraseña" : "Nueva contraseña"
                      }
                      labelPlacement="outside"
                      onChange={(e) =>
                        setPassword(e.target.value.toLowerCase())
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label className="my-1 block">
                      Repetir contraseña {!user && " (*)"}
                    </label>
                    <Input
                      type="text"
                      value={confirmPassword}
                      isRequired={!user && true}
                      placeholder="Repetir contraseña"
                      labelPlacement="outside"
                      onChange={(e) =>
                        setConfirmPassword(e.target.value.toLowerCase())
                      }
                    />
                  </div>
                </div>
              )}
            </fieldset>
          </div>
          <div className="flex gap-1 mb-1">
            <button
              onClick={toggleModal}
              className="bg-secundary basis-1/2 hover:bg-secundary/60 text-white font-bold py-2 px-4"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={
                isLoading
                  ? "cursor-not-allowed flex justify-center items-center btn-primary hover:bg-primary/60 py-1 xs:w-40 basis-1/2"
                  : "btn-primary flex justify-center items-center hover:bg-primary/60 py-1 xs:w-40 basis-1/2"
              }
            >
              {isLoading ? "Esperar..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
