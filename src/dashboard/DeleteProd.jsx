import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllProductsAction, deleteItemAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteProd() {
  const prod = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProductsAction()).then(() => setLoading(false));
  }, [dispatch]);

  async function deleteProd(e, id) {
    e.preventDefault();
    await dispatch(deleteItemAction(id));
    dispatch(getAllProductsAction());
  }

  return (
    <>
      <br />
      <span id="arrowBack">
        <Link to="/admin">
          <ArrowBackIosIcon />
        </Link>
      </span>
      <div id="centering">
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <br />
            <h2>Eliminar productos de la lista?</h2>
            <div id="angost">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Disponible</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell align="right">Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prod.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <img
                          style={{ height: "80px", width: "auto" }}
                          src={row.imagenGeneral?.[0]}
                        ></img>
                      </TableCell>
                      <TableCell>
                        {row.nombre}
                        {" | "}

                        <button onClick={(e) => deleteProd(e, row._id)}>
                          <DeleteIcon />
                        </button>
                      </TableCell>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.disponible ? "Si" : "No"}</TableCell>
                      <TableCell>{row.stockGeneral}</TableCell>
                      <TableCell align="right">{`$${row.precioBase}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <br />
            <Link to="/admin">Volver al Panel</Link>
          </React.Fragment>
        )}
      </div>
    </>
  );
}
