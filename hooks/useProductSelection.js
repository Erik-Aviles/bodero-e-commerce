import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import NotificationContext from "@/context/NotificationContext";
import { stopwords } from "@/resources/stopwordsData";
import { capitalize } from "@/utils/utils";

const useProductSelection = (products) => {
  const { showNotification } = useContext(NotificationContext);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [status, setStatus] = useState(false);
  const [selectProduct, setSelectProduct] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const savedProducts = localStorage.getItem("selectProduct");
    if (savedProducts) {
      setSelectProduct(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectProduct", JSON.stringify(selectProduct));
  }, [selectProduct]);

  const handleSearchChange = (value) => {
    setQuery(value);
    const normalizedQuery = removeAccents(value.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map(removePluralEnding);

    if (value.length >= 3) {
      const filteredSuggestions = products.filter((item) => {
        const fields = [
          item.title,
          item.code,
          item.codeEnterprise,
          item.codeWeb,
          item.brand,
          ...(item.compatibility || []).map((compat) => compat.model),
          ...(item.compatibility || []).map((compat) => compat.title),
        ].map((field) => removeAccents(field.toLowerCase()));

        return normalizedQuery.every((part) =>
          fields.some((field) => field.includes(part))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addProduct = () => {
    if (!query || !selectedCode || !selectedQuantity) {
      showNotification({
        open: true,
        msj: "Llene todos los campos!",
        status: "warning",
      });
      return;
    }
    if (selectedQuantity <= 0) {
      showNotification({
        open: true,
        msj: "Establecer la cantidad mayor a 0",
        status: "warning",
      });
      return;
    }

    setSelectProduct((prev) => {
      const productExists = prev.some(
        (product) => product.code === selectedCode
      );

      if (productExists) {
        showNotification({
          open: true,
          msj: "El producto ya existe!",
          status: "error",
        });
        handleClear();
        return prev;
      }

      const updatedProducts = [
        ...prev,
        {
          title: query,
          code: selectedCode,
          quantity: selectedQuantity,
          status: status,
        },
      ];

      showNotification({
        open: true,
        msj: "Código generado con éxito!",
        status: "success",
      });

      handleClear();
      return updatedProducts;
    });
  };

  const modifyStatusItem = (item) => {
    setSelectProduct((prev) => {
      const updatedArray = prev.map((product) => {
        if (product.code === item.code && product.status === false) {
          return { ...product, status: true };
        }
        return product;
      });
      return updatedArray;
    });
  };

  const modifyStatusAllItems = () => {
    if (selectProduct.length <= 0) {
      return showNotification({
        open: true,
        msj: "No hay códigos generados",
        status: "warning",
      });
    } else {
      const newSelectProducts = selectProduct.map((product) => ({
        ...product,
        status: true,
      }));
      setSelectProduct(newSelectProducts);
    }
  };

  const handlePrintBarCodes = (item) => {
    console.log("Solo imprimiendo", item.title);
    if (item.status === false) {
      console.log("Usando función de status");
      modifyStatusItem(item);
    }
    showNotification({
      open: true,
      msj: `Imprimiendo etiquetas de: ${capitalize(item?.title)}`,
      status: "success",
    });
  };

  const handlePrintAllBarCodes = () => {
    if (selectProduct.length <= 0) {
      return showNotification({
        open: true,
        msj: "No hay códigos generados para imprimir",
        status: "warning",
      });
    } else {
      const allTrue = selectProduct.every((c) => c.status === true);
      if (!allTrue) {
        console.log("Usando función de status all");
        modifyStatusAllItems();
      }
      showNotification({
        open: true,
        msj: `Imprimiendo (${selectProduct.length}) productos con código de barra`,
        status: "success",
      });
    }
  };

  const handleDeleteProduct = (product) => {
    setSelectProduct((prev) => {
      const pos = prev.indexOf(product);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      localStorage.setItem("selectProduct", JSON.stringify(prev));
      return prev;
    });
    showNotification({
      open: true,
      msj: `Etiquetas: ${capitalize(product.title)}. Eliminado!`,
      status: "success",
    });
  };

  const handleDeleteAllProducts = () => {
    if (selectProduct.length <= 0) {
      return showNotification({
        open: true,
        msj: "No hay productos registrados",
        status: "warning",
      });
    } else {
      localStorage.setItem("selectProduct", JSON.stringify([]));
      setSelectProduct([]);
      showNotification({
        open: true,
        msj: `(${selectProduct.length}) Etiqueta/s han sido eliminados`,
        status: "success",
      });
    }
  };

  const pages = Math.ceil(selectProduct.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return selectProduct.slice(start, end);
  }, [page, selectProduct, rowsPerPage]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const handleClick = (item) => {
    setQuery(item.title);
    setSelectedCode(item.code);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCode("");
    setSelectedQuantity("");
    setSuggestions([]);
  };

  const topContent = useMemo(() => {
    return {
      query,
      items,
      setQuery,
      selectedCode,
      setSelectedCode,
      selectedQuantity,
      setSelectedQuantity,
      suggestions,
      setSuggestions,
      handleSearchChange,
      handleClick,
      handleClear,
      addProduct,
      handlePrintAllBarCodes,
      handleDeleteAllProducts,
    };
  }, [query, items, selectedCode, selectedQuantity, suggestions]);

  return {
    topContent,
    items,
    page,
    setPage,
    pages,
    handlePrintBarCodes,
    handleDeleteProduct,
    onNextPage,
    onPreviousPage,
  };
};

export default useProductSelection;
