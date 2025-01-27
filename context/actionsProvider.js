import { useState, useEffect, createContext } from "react";
// import { generarId } from "@/helpers";
import axios from "axios";
import { signOut } from "next-auth/react";
// import Swal from "sweetalert2";

export const ActionsContext = createContext();

export const ActionsProvider = ({ children }) => {
  const [modalCategoria, setModalCategoria] = useState(false);
  const [modalStockOrigin, setModalStockOrigin] = useState(false);
  const [modalProveedor, setModalProveedor] = useState(false);
  const [modalFactura, setModalFactura] = useState(false);
  const [modalStock, setModalStock] = useState(false);
  const [modalCabecera, setModalCabecera] = useState(false);
  const [modalCliente, setModalCliente] = useState(false);
  const [modalDetalleFactura, setModalDetalleFactura] = useState(false);
  const [editar, setEditar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaState, setCategoriaState] = useState({});
  const [stockState, setStockState] = useState({});
  const [proveedorState, setProveedorState] = useState({});
  const [cabeceraState, setCabeceraState] = useState({});
  const [clienteState, setClienteState] = useState({});
  const [facturaState, setFacturaState] = useState({});
  const [totalFactura, setTotalFactura] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [sppiner, setSppiner] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [noAcces, setNoAcces] = useState("");

  // Opciones interfaz usuario
  const [navbar, setNavbar] = useState(false);
  const [opcInventory, setOpcInventory] = useState(false);
  const [opcBusiness, setOpcBusiness] = useState(false);
  const [opcAdmin, setOpcAdmin] = useState(false);
  const [opcCompany, setOpcCompany] = useState(false);
  const [opcBanner, setOpcBanner] = useState(false);
  const [opcBrand, setOpcBrand] = useState(false);
  const [opcBackground, setOpcBackground] = useState(false);

  // Datos Cuerpo Factura
  const [formulariosFactura, setFormulariosFactura] = useState([]);

  // Datos Cabecera Factura
  const [cabeceraFactura, setCabeceraFactura] = useState("");

  // Datos Cliente Factura
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  //Factura final
  const [productos, setProductos] = useState([]);
  const [idFactura, setIdFactura] = useState("");

  const changeNavbar = () => {
    setNavbar(!navbar);
    localStorage.setItem("navbar", !navbar);
  };

  const changeOpcInventory = () => {
    setOpcInventory(!opcInventory);
    localStorage.setItem("opcInventory", !opcInventory);
  };
  const changeOpcAdmin = () => {
    setOpcAdmin(!opcAdmin);
    localStorage.setItem("opcAdmin", !opcAdmin);
  };

  const changeOpcBusiness = () => {
    setOpcBusiness(!opcBusiness);
    localStorage.setItem("opcBusiness", !opcBusiness);
  };

  const changeOpcCompany = () => {
    setOpcCompany(!opcCompany);
    localStorage.setItem("opcCompany", !opcCompany);
  };

  const changeOpcBanner = () => {
    setOpcBanner(!opcBanner);
    localStorage.setItem("opcBanner", !opcBanner);
  };

  const changeOpcBrand = () => {
    setOpcBrand(!opcBrand);
    localStorage.setItem("opcBrand", !opcBrand);
  };

  const changeOpcBackground = () => {
    setOpcBackground(!opcBackground);
    localStorage.setItem("opcBackground", !opcBackground);
  };

  const changeModalCategoria = () => {
    setModalCategoria(!modalCategoria);
  };

  const changeModalStock = () => {
    setModalStock(!modalStock);
  };

  const changeModalFactura = () => {
    setModalFactura(!modalFactura);
  };

  const changeModalDetalleFactura = () => {
    setModalDetalleFactura(!modalDetalleFactura);
  };

  const changeModalStockOrigin = () => {
    setModalStockOrigin(!modalStockOrigin);
  };

  const changeModalProveedor = () => {
    setModalProveedor(!modalProveedor);
  };

  const changeModalCabecera = () => {
    setModalCabecera(!modalCabecera);
  };

  const changeModalCliente = () => {
    setModalCliente(!modalCliente);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };
  const cerrarSesion = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    setNavbar(JSON.parse(localStorage.getItem("navbar")) || false);
    setOpcInventory(JSON.parse(localStorage.getItem("opcInventory")) || false);
    setOpcBusiness(JSON.parse(localStorage.getItem("opcBusiness")) || false);
    setOpcAdmin(JSON.parse(localStorage.getItem("opcAdmin")) || false);
    setOpcCompany(JSON.parse(localStorage.getItem("opcCompany")) || false);
    setOpcBanner(JSON.parse(localStorage.getItem("opcBanner")) || false);
    setOpcBackground(JSON.parse(localStorage.getItem("opcBackground")) || false);
    setOpcBrand(JSON.parse(localStorage.getItem("opcBrand")) || false);
    setUsuario(JSON.parse(localStorage.getItem("user")) || []);
  }, []);

  return (
    <ActionsContext.Provider
      value={{
        setNavbar,
        changeNavbar,
        navbar,
        changeOpcInventory,
        changeOpcBusiness,
        changeOpcAdmin,
        changeOpcCompany,
        changeOpcBanner,
        changeOpcBrand,
        changeOpcBackground,
        opcInventory,
        opcBusiness,
        opcAdmin,
        opcCompany,
        opcBanner,
        opcBrand,
        opcBackground,
        changeModalCategoria,
        modalCategoria,
        setEditar,
        editar,
        changeModalStock,
        modalStock,
        setProductos,
        productos,
        // crearFormProducto,
        // eliminarFormStock,
        formulariosFactura,
        setCategorias,
        categorias,
        setCategoriaState,
        categoriaState,
        changeModalFactura,
        modalFactura,
        setCabeceraFactura,
        cabeceraFactura,
        setNombres,
        nombres,
        setApellidos,
        apellidos,
        setIdentificacion,
        identificacion,
        setDireccion,
        direccion,
        setTelefono,
        telefono,
        setCorreo,
        correo,
        setDescripcion,
        descripcion,
        setFormulariosFactura,
        setIdFactura,
        idFactura,
        changeModalDetalleFactura,
        modalDetalleFactura,
        setTotalFactura,
        totalFactura,
        changeToggle,
        toggle,
        setSppiner,
        sppiner,
        setStockState,
        stockState,
        changeModalStockOrigin,
        modalStockOrigin,
        changeModalProveedor,
        modalProveedor,
        setProveedorState,
        proveedorState,
        changeModalCabecera,
        modalCabecera,
        setCabeceraState,
        cabeceraState,
        changeModalCliente,
        modalCliente,
        setClienteState,
        clienteState,
        setUsuario,
        usuario,
        cerrarSesion,
        setNoAcces,
        noAcces,
        setFacturaState,
        facturaState,
      }}
    >
      {children}
    </ActionsContext.Provider>
  );
};
