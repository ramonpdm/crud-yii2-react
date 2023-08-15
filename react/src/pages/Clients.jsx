import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { MdDelete, MdEdit } from "react-icons/md"

import { GET } from "../data/API"
import ModalClients from "../components/modals/ClientsModal"

const Clients = () => {
	// Almacén de datos
	const [data, setData] = useState(null)

	// Obtener todos los datos
	useEffect(() => {
		GET(setData)
	}, [])

	// Datos de referencia para editar o eliminar
	const [client, setClient] = useState({
		id_client: "",
		client_name: "",
	})

	// Modales
	const [modalInsert, setModalInsert] = useState(false)
	const [modalEdit, setModalEdit] = useState(false)
	const [modalDelete, setModalDelete] = useState(false)

	const toggleModalInsert = () => {
		setModalInsert(!modalInsert)
	}

	const toggleModalEdit = () => {
		setModalEdit(!modalEdit)
	}

	const toggleModalDelete = () => {
		setModalDelete(!modalDelete)
	}

	return (
		<>
			<div>
				<br />
				<button className="btn btn-success" onClick={() => toggleModalInsert()}>
					Crear Cliente
				</button>
				<hr />
				{data !== null && data.length > 0 ? (
					<div>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nombre</th>
									<th>Perfiles</th>
									<th>Direcciones</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{data.map((row) => (
									<tr key={row.id_client}>
										<td style={{ verticalAlign: "middle" }}>{row.id_client}</td>
										<td style={{ verticalAlign: "middle" }}>{row.client_name}</td>
										<td style={{ verticalAlign: "middle" }}>{row.profiles_count}</td>
										<td style={{ verticalAlign: "middle" }}>{row.addresses_count}</td>
										<td style={{ textAlign: "right" }}>
											<button
												className="btn btn-danger"
												onClick={() => {
													setClient(row)
													toggleModalDelete()
												}}
											>
												<MdDelete />
											</button>{" "}
											<button
												className="btn btn-warning pr-2"
												style={{ color: "white" }}
												onClick={() => {
													setClient(row)
													toggleModalEdit()
												}}
											>
												<MdEdit />
											</button>{" "}
											<a className="btn btn-primary" href={`/clients/${row.id_client}`}>
												Ver
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<h2>No hay datos disponibles</h2>
					</div>
				)}
				{/* Llamar a los Modals de Insertar, Editar y Eliminar */}
				<ModalClients
					data={data}
					setData={setData}
					client={client}
					setClient={setClient}
					modalInsert={modalInsert}
					setModalInsert={setModalInsert}
					modalEdit={modalEdit}
					setModalEdit={setModalEdit}
					modalDelete={modalDelete}
					setModalDelete={setModalDelete}
				></ModalClients>
			</div>
		</>
	)
}

export default Clients
