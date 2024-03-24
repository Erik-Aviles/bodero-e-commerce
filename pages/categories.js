import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import NotificationContext from "@/context/NotificationContext";
import { PlusIcon, SearchIcon } from "@/components/Icons";
import useAuthFetch from "@/hooks/useAuthFetch";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import TableCategory from "@/components/TableCategory";
import { capitalize } from "@/utils/utils";
import ModalCategories from "@/components/ModalCategories";

function Categories({ swal }) {
  const authRouter = useAuthFetch();
  const { showNotification } = useContext(NotificationContext);
  const [name, setName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  function fetchCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function EditCategory(e) {
    e.preventDefault();
    const data = {
      name: name.toLowerCase(),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      showNotification({
        open: true,
        msj: `Categoria:
        ${capitalize(data?.name)}, modificada con exito!`,
        status: "success",
      });
      setEditedCategory(null);
    }
    setName("");
    fetchCategories();
  }

  function editCategory(value) {
    setEditedCategory(value);
    setName(value?.name);
  }

  function deleteCaterory(value) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `Quires eliminar "${value.name}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = value;
          await axios.delete("/api/categories?_id=" + _id);
          showNotification({
            open: true,
            msj: `Categoria:
              ${capitalize(value?.name)}, eliminada con exito!`,
            status: "success",
          });
          fetchCategories();
        }
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Panel | Categoria</title>
        <meta
          name="description"
          content="Variedad de productos, estan seccionados por categorias"
        />
      </Head>
      <Layout>
        <div className="h-full flex flex-col gap-3">
          <div className="h-fit max-w-screen-xl pb-4 ">
            <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
              <h3>Panel de categoria</h3>
            </div>
          </div>
          {editedCategory && (
            <div className="border-container h-fit md:gap-2 flex flex-col md:justify-evenly lg:flex-row ">
              <form
                className="flex flex-col  lg:min-w-[500.16px]"
                onSubmit={EditCategory}
              >
                <label className="mb-2">
                  {`Editar categoria "${editedCategory.name}"`}
                </label>
                <div className="h-auto mb-4 border-container md:bg-white">
                  <div className="flex flex-col lg:flex-row sm:gap-1 w-full ">
                    <Input
                      type="text"
                      value={name}
                      placeholder="Escribir nombre"
                      labelPlacement="outside"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-1 mb-2 ">
                  <button
                    type="button"
                    className="btn-delete basis-1/2"
                    onClick={() => {
                      setEditedCategory(null);
                      setName("");
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn-primary py-1 xs:w-40 basis-1/2"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}
          {!editedCategory && (
            <section className="">
              <div className=" mx-auto max-w-[600px] ">
                <TableCategory
                  fetchCategories={fetchCategories}
                  deleteCaterory={deleteCaterory}
                  editCategory={editCategory}
                  categories={categories}
                />
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
}
export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
