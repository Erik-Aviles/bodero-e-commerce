import { DeleteIcon, EditIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  return (
    <Layout>
      <h3>Categoria</h3>
      <label>
        {editedCategory
          ? `Editar categoria "${editedCategory.name}"`
          : "Agregar nueva categoria"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Escribir nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">Sin categoria principal</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category?.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Guardar
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Categoria principal</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category?._id}>
                <td>{category?.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex">
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    <EditIcon />
                  </button>
                  <button className="btn-primary ">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
