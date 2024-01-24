//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import logo from './assets/cadastro.png';
import React, { useState, useEffect } from 'react';
// import Login from './Login';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import 'react-toastify/dist/ReactToastify.css';

// import Register from './Register';
// import { ToastContainer } from 'react-toastify';
// import Appheader from './Appheader';
// import Customer from './Customer';



function Home() {

  const baseUrl = "https://localhost:7243/api/Task";
                  
  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [updateData, setUpdateData] = useState(true);
  const [modalExcluir, setModalExcluir] = useState(false);
  //const [value, setValue] = useState('00:00');

  const initialInputValues = {
    inicio: '',
    beginReservation: ''
 } 

  const [values, setValues] = useState(initialInputValues)

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({
      ...values,
      [name]: value,
    })
  }

  const [taskSelecionada, setTaskSelecionada] = useState({
    id: '',
    name: '',
    Begin: '',
    End: ''
  })

  const selecionarTask = (task, opcao) => {
    setTaskSelecionada(task);
    (opcao === "Editar") ?
      abrirFecharModalEditar():abrirFecharModalExcluir();
  }

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setTaskSelecionada({
      ...taskSelecionada, [name]: value
    });
    console.log(taskSelecionada);
  }

const pedidoGet = async () => {
  await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
}

const pedidoPost = async () => {
  delete taskSelecionada.taskId;
  await axios.post(baseUrl, taskSelecionada)
    .then(response => {
      setData(data.concat(response.data));
      setUpdateData(true);
      abrirFecharModalIncluir();
    }).catch(error => {
      console.log(error);
    })
}

const pedidoPut = async () => {
  await axios.put(baseUrl + "/" + taskSelecionada.taskId, taskSelecionada)
    .then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(task => {
        if (task.taskId === taskSelecionada.id) {
          task.name = resposta.name;
          task.date_Begin = resposta.date_Begin;
          task.date_End = resposta.date_End;
        }
      });
      setUpdateData(true);
      abrirFecharModalEditar();
    }).catch(error => {
      console.log(error);
    })
}

const pedidoDelete = async () => {
  await axios.delete(baseUrl + "/" + taskSelecionada.taskId)
    .then(response => {
      setData(data.filter(t => t.taskId !== response.data));
      setUpdateData(true);
      abrirFecharModalExcluir();
    }).catch(error => {
      console.log(error);
    })
}

useEffect(() => {
    pedidoGet();
})

  return (
    <div>
      <header>
        {/* <img src={logo}alt="logo" /> */}
        <button className="btn btn-success" onClick={() => abrirFecharModalIncluir()}>New Task</button>
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Begin</th>
            <th>End</th>
            <th>Operacao</th>
          </tr>
        </thead>
          <tbody>
          {data.map(t => (
            <tr key={t.taskId}>
              <td>{t.taskId}</td>
              <td>{t.name}</td>
              <td>{t.date_Begin}</td>
              <td>{t.date_End}</td>
              <td>
              <button className="btn btn-primary" onClick={() => selecionarTask(t, "Editar")}>Edit</button> {"  "}
                <button className="btn btn-danger" onClick={() => selecionarTask(t, "Excluir")}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Add Task</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name: </label>
            <br />
            <input type="text" className="form-control" name="name" onChange={handleChange} />
            <br />
            <label>Begin: </label>
            <br />
            {/* <input name="date_Begin" onChange={handleChange} type="time"/> */}
            <input name="date_Begin" value={values.date_Begin} onChange={handleInputChange}  type="time"/>

            {/* <input type="time"   className="form-control" name="date_Begin" onChange={handleChange} /> */}
            {/* <input type="time" onChange={ev => setValue(ev.target.value)} min="00:00" max="23:59" /> */}
            <br />
            <label>End: </label>
            <br />
            {/* <input type="time"   className="form-control" name="date_End" onChange={handleChange} /> */}
            {/* <input type="time" onChange={ev => setValue(ev.target.value)} min="00:00" max="23:59" step="60" value={value}/> */}
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>Add</button>
          <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir()} >Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input type="text" className="form-control" readOnly
              value={taskSelecionada && taskSelecionada.taskId} />
            <br />
            <label>Nome: </label><br />
            <input type="text" className="form-control" name="name" onChange={handleChange}
              value={taskSelecionada && taskSelecionada.name} /><br />
            <label>Email: </label><br />
            <input type="text" className="form-control" name="date_Begin" onChange={handleChange}
              value={taskSelecionada && taskSelecionada.date_Begin} /><br />
            <label>Idade: </label><br />
            <input type="text" className="form-control" name="date_End" onChange={handleChange}
              value={taskSelecionada && taskSelecionada.date_End} /><br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>Edit</button>{"  "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()} >Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirm delete this task  : {taskSelecionada && taskSelecionada.name} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()} > Sim </button>
          <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()}> Não </button>
        </ModalFooter>
      </Modal>

    </div>
  );
//   return(
//     <div className="App">
//     <ToastContainer theme='colored' position='top-center'></ToastContainer>
//     <BrowserRouter>
//     <Appheader></Appheader>
//     <Routes>
//       <Route path='/' element={<Home/>}></Route>
//       <Route path='/login' element={<Login/>}></Route>
//       <Route path='/register' element={<Register/>}></Route>
//       <Route path='/customer' element={<Customer/>}></Route>
//     </Routes>
    
//     </BrowserRouter>
    
//   </div>
//   );
}

export default Home;