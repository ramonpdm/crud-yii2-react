import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { modalStyles, handleChange } from "../../functions/Shared"
import { POST, PUT, DELETE } from "../../data/API"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

const AddressesModal = ({ data, setData, address, setAddress, modalInsertAddress, setModalInsertAddress, modalEditAddress, setModalEditAddress, modalDeleteAddress, setModalDeleteAddress }) => {
	const toggleModalInsertAddress = () => {
		setModalInsertAddress(!modalInsertAddress)
	}

	const toggleModalEditAddress = () => {
		setModalEditAddress(!modalEditAddress)
	}

	const toggleModalDeleteAddress = () => {
		setModalDeleteAddress(!modalDeleteAddress)
	}

	return (
		<>
			<Modal isOpen={modalInsertAddress} style={modalStyles}>
				<ModalHeader>Agregar Dirección</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Dirección</label>
						<br />
						<input type="text" className="form-control" name="address" onChange={handleChange(setAddress)} />
						<label>País</label>
						<br />
						<input type="text" className="form-control" name="country" onChange={handleChange(setAddress)} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalInsertAddress()}>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await POST(address, "addresses")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({ ...prevData, addresses: data.addresses.concat(request.data) }))
								toggleModalInsertAddress()
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

			<Modal isOpen={modalEditAddress} style={modalStyles}>
				<ModalHeader>Editar Dirección</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Email</label>
						<br />
						<input type="text" className="form-control" name="address" onChange={handleChange(setAddress)} value={address && address.address} />
						<label>Telefono</label>
						<br />
						<input type="text" className="form-control" name="country" onChange={handleChange(setAddress)} value={address && address.country} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalEditAddress()}>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await PUT(address.id_address, address, "addresses")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({
									...prevData,
									addresses: data.addresses.map((row) => {
										if (address.id_address === row.id_address) {
											return { ...row, address: address.address, country: address.country }
										}
										return row
									}),
								}))
								toggleModalEditAddress()
							} else {
								MySwal.fire({
									title: <p>Hubo un error al realizar esta acción</p>,
									icon: "error",
								})
							}
						}}
					>
						Editar
					</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={modalDeleteAddress} style={modalStyles}>
				<ModalBody>¿Seguro que quieres eliminar la dirección {address && address.id_address}?</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalDeleteAddress()}>
						No
					</button>{" "}
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await DELETE(address.id_address, "addresses")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({
									...prevData,
									addresses: prevData.addresses.filter((row) => row.id_address !== address.id_address),
								}))
								toggleModalDeleteAddress()
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

export default AddressesModal
