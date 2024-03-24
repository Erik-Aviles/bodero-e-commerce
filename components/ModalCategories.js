import { useCallback, useState } from "react";
import { PlusIcon, SearchIcon } from "./Icons";
import { Button, Input } from "@nextui-org/react";
import useAuthFetch from "@/hooks/useAuthFetch";

const ModalCategories = ({ fetchCategories }) => {
  const authRouter = useAuthFetch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  async function saveCategory(e) {
    e.preventDefault();
    const data = {
      name: name.toLowerCase(),
    };
    await authRouter({
      endpoint: "categories",
      formData: data,
    });
    setName("");
    fetchCategories();
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onClear = useCallback(() => {
    setName("");
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <section className="w-fit">
          <Button
            onClick={toggleModal}
            color="primary"
            startContent={<PlusIcon />}
          >
            Categoria
          </Button>
        </section>
        {showModal && (
          <>
            <div
              onClick={toggleModal}
              className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50"
            ></div>
            <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
              <div className="bg-white rounded shadow-md">
                <div className="relative p-6 w-72 sm:w-[500px]">
                  <h3 className="text-lg font-semibold">
                    REGISTRO DE CATEGORIAS
                  </h3>
                  <form className="flex flex-col" onSubmit={saveCategory}>
                    <label className="mb-2">Agregar nueva categoria</label>
                    <div className="h-auto mb-4 border-container md:bg-white">
                      <div className="flex flex-col lg:flex-row sm:gap-1 w-full ">
                        <Input
                          isClearable
                          type="text"
                          value={name}
                          placeholder="Escribir nombre"
                          labelPlacement="outside"
                          onClear={() => onClear()}
                          onChange={(e) =>
                            setName(e.target.value.toLowerCase())
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-1 mb-1">
                      <button
                        type="submit"
                        className="btn-primary py-1 xs:w-40 basis-1/2"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={toggleModal}
                        className="bg-error basis-1/2 hover:bg-error/60 text-white font-bold py-2 px-4"
                      >
                        Cerrar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="p-4 bg-gray-100 flex justify-end"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCategories;
