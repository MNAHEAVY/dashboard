import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllUsersAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Loading/Loading";

export default function AllUsers() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUsersAction()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div id='centering'>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <br />
          <h2>Todos los usuarios</h2>
          <div id='angost'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Baneado</TableCell>
                  <TableCell>Nickname</TableCell>
                  <TableCell align='right'>Compras</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img
                        style={{ height: "30px", width: "auto" }}
                        src={row.picture}
                      ></img>
                    </TableCell>
                    <TableCell>
                      {row.name}
                      {" | "}

                      <Link to='./edituser'>
                        <EditIcon />
                      </Link>
                    </TableCell>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.isBanned ? "Si" : "No"}</TableCell>
                    <TableCell>{row.nickname}</TableCell>
                    <TableCell align='right'>{row.purchases.products.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <br />
          <Link to='/admin'>Volver al Panel</Link>
        </React.Fragment>
      )}
    </div>
  );
}
