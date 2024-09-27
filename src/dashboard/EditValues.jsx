import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValuesAction, putValAction } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

export default function ProdEdit() {
  const dispatch = useDispatch();
  const valEd = useSelector((state) => state.values);
  const id = "64f6726b28477760152923a8";

  useEffect(() => {
    dispatch(getValuesAction());
  }, [dispatch]);

  const [input, setInput] = useState({
    dolarBlue: valEd.dolarBlue,
    costoGeneral: valEd.costoGeneral,
    flete: valEd.flete,
    profit: valEd.profit,
    obercoins: valEd.obercoins,
    mp: valEd.mp,
    comision: valEd.comision,
    tasa: valEd.tasa,
    rentas: valEd.rentas,
    costosDeEnvio: valEd.costosDeEnvio,
  });
  console.log(input);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  // Handle changes in "rentas" fields
  function handlerentasChange(key, value) {
    setInput({
      ...input,
      rentas: {
        ...input.rentas,
        [key]: parseFloat(value), // Convert value to a number if needed
      },
    });
  }

  // Handle changes in "costosDeEnvio" fields
  function handleCostosDeEnvioChange(index, value) {
    const updatedCostosDeEnvio = [...input.costosDeEnvio];
    updatedCostosDeEnvio[index] = {
      ...updatedCostosDeEnvio[index],
      costo: parseFloat(value), // Convert value to a number if needed
    };
    setInput({
      ...input,
      costosDeEnvio: updatedCostosDeEnvio,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(putValAction(id, input));
  }

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-12'>
          <h1 className='text-center'>SUPER ADMIN VALUES EDITION V-3.1</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <h3 className='text-center'>Editor de Valores</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='form-group'>
              <label>Blue</label>
              <input
                className='form-control'
                type='number'
                value={input.dolarBlue}
                name='dolarBlue'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className='form-group'>
              <label>Costos Generales</label>
              <input
                className='form-control'
                type='number'
                value={input.costoGeneral}
                name='costoGeneral'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className='form-group'>
              <label>Flete Local</label>
              <input
                className='form-control'
                type='number'
                value={input.flete}
                name='flete'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className='form-group'>
              <label>Profit General</label>
              <input
                className='form-control'
                type='number'
                value={input.profit}
                name='profit'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label>Obercoins</label>
              <input
                className='form-control'
                type='number'
                value={input.obercoins}
                name='obercoins'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className='form-group'>
              <label>Mercado Pago</label>
              <input
                className='form-control'
                type='number'
                value={input.mp}
                name='mp'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label>Rentas</label>
              <input
                className='form-control'
                type='number'
                value={input.rentas}
                name='rentas'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className='form-group'>
              <label>Comision</label>
              <input
                className='form-control'
                type='number'
                value={input.comision}
                name='comision'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className='form-group'>
              <label>Tasa</label>
              <input
                className='form-control'
                type='number'
                value={input.tasa}
                name='tasa'
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <br />
            <b>Costos de Envio</b>
            <div style={{ height: "300px", overflowY: "scroll" }}>
              {input.costosDeEnvio.map((item, index) => (
                <div className='form-group' key={index}>
                  <label>{item.lugar}</label>
                  <input
                    className='form-control'
                    type='number'
                    value={item.costo}
                    name={`costosDeEnvio[${index}].costo`}
                    onChange={(e) => handleCostosDeEnvioChange(index, e.target.value)}
                  ></input>
                </div>
              ))}
            </div>
            <br />
            <div id='centeringSideB'>
              <button
                className='btn btn-outline-success me-2'
                type='submit'
                onClick={handleSubmit}
              >
                Modificar
              </button>
              <button className='btn btn-outline-success me-2'>
                <Link to={"/admin"}>Cancelar</Link>
              </button>
            </div>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
