import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { modalStyles, handleChange } from "../../functions/Shared"
import { POST, PUT, DELETE } from "../../data/API"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

const ModalClients = ({ data, setData, client, setClient, modalInsert, setModalInsert, modalEdit, setModalEdit, modalDelete, setModalDelete }) => {
	const toggleModalInsert = () => {
		setModalInsert(!modalInsert)
	}

	const toggleModalDelete = () => {
		setModalDelete(!modalDelete)
	}

	const toggleModalEdit = () => {
		setModalEdit(!modalEdit)
	}

	return (
		<>
			<Modal isOpen={modalInsert} style={modalStyles}>
				<ModalHeader>Insertar Nuevo Cliente</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Nombre</label>
						<br />
						<input type="text" className="form-control" name="client_name" onChange={handleChange(setClient)} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalInsert()}>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await POST(client)
							// Validar que no exista algún error
							if (request.err === false) {
								// Concatenar los actuales datos con la inserción
								setData(data.concat(request.data))
								toggleModalInsert()
							} else {
								MySwal.fire({
									title: <p>Hubo un error al realizar esta acción</p>,
									icon: "error",
								})
							}
						}}
					>
						Insertar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={modalEdit} style={modalStyles}>
				<ModalHeader>Editar Cliente</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Nombre</label>
						<br />
						<input type="text" className="form-control" name="client_name" value={client && client.client_name} onChange={handleChange(setClient)} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalEdit()}>
						Cancelar
					</button>{" "}
					<button
						className="btn btn-primary"
						onClick={async () => {
							const request = await PUT(client.id_client, client)
							// Validar que no exista algún error
							if (request.err === false) {
								// Actualizar el nombre del cliente en los datos actuales
								const newData = data.map((row) => {
									if (row.id_client === client.id_client) {
										return { ...row, client_name: client.client_name }
									}
									return row
								})
								setData(newData)
								toggleModalEdit()
							}
						}}
					>
						Editar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={modalDelete} style={modalStyles}>
				<ModalBody>¿Seguro que quieres eliminar el cliente {client && client.id_client}?</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalDelete()}>
						No
					</button>{" "}
					<button
						className="btn btn-primary"
						onClick={async () => {
							const request = await DELETE(client.id_client)
							// Validar que no exista algún error
							if (request.err === false) {
								// Actualizar la data actual removiendo el cliente
								setData(data.filter((row) => row.id_client !== client.id_client))
								toggleModalDelete()
							} else {
								MySwal.fire({
									title: <p>Hubo un error al realizar esta acción</p>,
									icon: "error",
								})
							}
						}}
					>
						Si
					</button>
				</ModalFooter>
			</Modal>
		</>
	)
}

export default ModalClients
