import { createContext, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoginContext from "../login/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";

const AsadaContext = createContext();

export const AsadaProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [asada, setAsada] = useState({});
  const [contactos, setContactos] = useState([]);
  const [contacto, setContacto] = useState({});
  const [facturas, setFacturas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [nombreAbonado, setNombreAbonado] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Get asada
  const getAsada = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/asada`);
    const data = await response.data;
    await getAsadaContactos();
    setAsada(data);
    setIsLoading(false);
  };

  // Get asada contactos
  const getAsadaContactos = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/asada/1/contactos`);
    const data = await response.data;
    setContactos(data);
    setIsLoading(false);
  };

  // Get asada contacto
  const getAsadaContacto = async (idcontacto) => {
    setIsLoading(true);
    const response = await axios.get(`/api/asada/1/contactos/${idcontacto}`);
    const data = await response.data;
    setContacto(data.contacto);
    setIsLoading(false);
  };

  // Create asada contacto
  const createAsadaContacto = async (contacto) => {
    setIsLoading(true);
    try {
      /* WARNING - HARD CODED VALUE */
      const response = await axios.post(`/api/asada/1/contactos`, contacto, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Patch asada contacto
  const patchAsadaContacto = async (contactoObj) => {
    const { id: idcontacto } = params;
    setIsLoading(true);
    try {
      /* 
        WARNING 
        HARD CODED VALUE 
        It is not recommended to explicitly use a number to call the API endpoint.
        Try to use dinamic variable. 
      */
      await axios.patch(`/api/asada/1/contactos/${idcontacto}`, contactoObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setIsLoading(false);
      toast.info(`Se ha actualizado la información del contacto`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Error al actualizar informacion la ASADA`);
    }
  };

  // Delete contacto
  const deleteAsadaContacto = async () => {
    setIsLoading(true);
    try {
      const { id } = params;
      console.log("context: ", id);
      await axios.delete(`/api/asada/1/contactos/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      await getAsadaContactos();

      setIsLoading(false);
      toast.info(`Se ha borrado el registro del contacto de la ASADA`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
      throw new Error(`Error al borrar contacto: ${contacto}`);
    }
  };

  // Update asada
  const updateAsada = async (asada) => {
    try {
      setIsLoading(true);
      /* 
  WARNING 
  HARD CODED VALUE 
  It is not recommended to explicitly use a number to call the API endpoint.
  Try to use dinamic variable. 
  */
      const response = await axios.put(`/api/asada/1`, asada, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getAsada();
      setIsLoading(false);
      toast.info(`Se ha actualizado la información de la ASADA`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Error al actualizar informacion la ASADA`);
    }
  };

  // Patch asada
  const patchAsada = async (asada) => {
    setIsLoading(true);
    try {
      /* 
        WARNING 
        HARD CODED VALUE 
        It is not recommended to explicitly use a number to call the API endpoint.
        Try to use dinamic variable. 
      */
      await axios.patch(`/api/asada/1`, asada, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      await getAsada();
      setIsLoading(false);
      toast.info(`Se ha actualizado la información de la ASADA`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Error al actualizar informacion la ASADA`);
    }
  };

  const getCISABuscarRecibosPendientes = async (abonado) => {
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Consulta_BuscarRecibosPendientes xmlns="https://www.cisaweb.com/AcueductosRecibos">
            <token>${sessionStorage.getItem("cisaToken")}</token>
            <empresa>8053</empresa>
            <abonado>${abonado}</abonado>
          </Consulta_BuscarRecibosPendientes>
        </soap:Body>
      </soap:Envelope>`;

    const url =
      "https://www.cisaweb.com/WSAcueductosRecibos/WSAcueductosRecibos.asmx?op=Consulta_BuscarRecibosPendientes";
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        body: xmls,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/xml; charset=UTF-8",
        },
      });

      const text = await response.text();

      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(text, "application/xml");
      const textContent = xmlDoc.getElementsByTagName(
        "Consulta_BuscarRecibosPendientesResponse"
      )[0].textContent;

      if (textContent === "" || textContent.length === 0) {
        setIsLoading(false);
        setFacturas([]);
      } else {
        const facturas = Array.from(
          xmlDoc.getElementsByTagName("NewDataSet")[0].children
        ).map((item) => item.children);

        const facturasJSON = _fromHtmlCollectionToArray(facturas);

        setFacturas(facturasJSON);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCISANombreAbonado = async (abonado) => {
    setIsLoading(true);
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Consulta_ObtenerNombre xmlns="https://www.cisaweb.com/AcueductosRecibos">
            <token>${sessionStorage.getItem("cisaToken")}</token>
            <empresa>8053</empresa>
            <abonado>${abonado}</abonado>
          </Consulta_ObtenerNombre>
        </soap:Body>
      </soap:Envelope>`;

    const url =
      "https://www.cisaweb.com/WSAcueductosRecibos/WSAcueductosRecibos.asmx?op=Consulta_ObtenerNombre";

    const response = await fetch(url, {
      body: xmls,
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    });
    const text = await response.text();
    let parser = new DOMParser();
    try {
      let xmlDoc = parser.parseFromString(text, "application/xml");
      const textContent = xmlDoc.getElementsByTagName(
        "Consulta_ObtenerNombreResult"
      )[0].textContent;

      if (textContent === "" || textContent.length === 0) {
        setIsLoading(false);
        setNombreAbonado("Sin nombre");
      } else {
        setNombreAbonado(textContent);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* 
    <emp_codigo>8053</emp_codigo>
    <emp_nombre>Acueducto La Lucha</emp_nombre>
  */

  const getCISAReciboDetalle = async (abonado, factura) => {
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Consulta_Pendientes_Detalle xmlns="https://www.cisaweb.com/AcueductosRecibos">
          <token>${sessionStorage.getItem("cisaToken")}</token>
          <empresa>8053</empresa>
          <abonado>${abonado}</abonado>
          <factura>${factura}</factura>
        </Consulta_Pendientes_Detalle>
      </soap:Body>
    </soap:Envelope>`;

    const url =
      "https://www.cisaweb.com/WSAcueductosRecibos/WSAcueductosRecibos.asmx?op=Consulta_Pendientes_Detalle";

    const response = await fetch(url, {
      body: xmls,
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    });

    const text = await response.text();
    const parser = new DOMParser();
    try {
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const detalles = Array.from(
        xmlDoc.getElementsByTagName("NewDataSet")[0].children
      )
        .map((item) => item.children)
        .map((item) => item);

      const arr = [];
      detalles.forEach((item) => {
        arr.push({
          rubro: item[0].textContent,
          descripcion: item[1].textContent,
          valor: item[2].textContent,
          tipo: item[3].textContent,
        });
      });

      setDetalles(arr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCISAWebToken = async () => {
    let xmls = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Token_CrearToken xmlns="https://www.cisaweb.com/AcueductosRecibos">
            <usuario>usuario_cisa</usuario>
            <clave>F6DD8281-95D6-497A-9E8A-C631E5B1D215</clave>
          </Token_CrearToken>
        </soap:Body>
      </soap:Envelope>`;

    const url =
      "https://www.cisaweb.com/WSAcueductosRecibos/WSAcueductosRecibos.asmx?op=Token_CrearToken";

    try {
      const response = await fetch(url, {
        body: xmls,
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
        },
      });

      const text = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const token = xmlDoc.getElementsByTagName("Token_CrearTokenResult")[0]
        .textContent;

      // Save the token in session storage
      sessionStorage.setItem("cisaToken", token);
    } catch (error) {
      console.log(error);
    }
  };

  const _fromHtmlCollectionToArray = (arr) => {
    const newArr = [];
    arr.forEach((item) => {
      const factura = {
        factura: item[0].textContent,
        mes: item[1].textContent,
        ano: item[2].textContent,
        periodo_char: item[3].textContent,
        periodo: item[4].textContent,
        vencimiento: item[5].textContent,
        monto: item[6].textContent,
        total_factura: item[7].textContent,
        facturacion: item[8].textContent,
        estado: item[9].textContent,
      };

      newArr.push(factura);
    });

    return newArr;
  };

  return (
    <AsadaContext.Provider
      value={{
        asada,
        getAsada,
        facturas,
        setFacturas,
        updateAsada,
        isLoading,
        setIsLoading,
        getCISAWebToken,
        getCISABuscarRecibosPendientes,
        getCISANombreAbonado,
        getCISAReciboDetalle,
        nombreAbonado,
        detalles,
        setDetalles,
        createAsadaContacto,
        contactos,
        setContactos,
        getAsadaContactos,
        getAsadaContacto,
        patchAsada,
        contacto,
        setContacto,
        patchAsadaContacto,
        deleteAsadaContacto,
      }}
    >
      {children}
    </AsadaContext.Provider>
  );
};

export default AsadaContext;
