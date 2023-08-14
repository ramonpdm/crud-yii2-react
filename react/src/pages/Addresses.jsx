import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { MdDelete, MdEdit } from "react-icons/md"

import AddressesModal from "../components/modals/AddressesModal"

const Addresses = ({ data, setData }) => {
	const params = useParams()

	const [address, setAddress] = useState({
		id_client: params.id,
		id_address: "",
		address: "",
		country: "",
	})

	const [modalInsertAddress, setModalInsertAddress] = useState(false)
	const [modalEditAddress, setModalEditAddress] = useState(false)
	const [modalDeleteAddress, setModalDeleteAddress] = useState(false)

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
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h2 className="display-inline">Direcciones</h2>
				{data && data != null && (
					<>
						<button className="btn btn-success" onClick={() => toggleModalInsertAddress()}>
							Agregar Direccion
						</button>
					</>
				)}
			</div>

			<hr />

			{data && data.addresses && data.addresses.length > 0 ? (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Dirección</th>
							<th>País</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.addresses.map((row) => (
							<tr key={row.id_address}>
								<td style={{ verticalAlign: "middle" }}>{row.id_address}</td>
								<td style={{ verticalAlign: "middle" }}>{row.address}</td>
								<td style={{ verticalAlign: "middle" }}>{row.country}</td>
								<td style={{ textAlign: "right" }}>
									<button
										className="btn btn-danger"
										onClick={() => {
											setAddress(row)
											toggleModalDeleteAddress()
										}}
									>
										<MdDelete />
									</button>{" "}
									<button
										className="btn btn-warning pr-2"
										style={{ color: "white" }}
										onClick={() => {
											setAddress(row)
											toggleModalEditAddress()
										}}
									>
										<MdEdit />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No posee direcciones</p>
			)}

			<AddressesModal
				data={data}
				setData={setData}
				address={address}
				setAddress={setAddress}
				modalInsertAddress={modalInsertAddress}
				setModalInsertAddress={setModalInsertAddress}
				modalEditAddress={modalEditAddress}
				setModalEditAddress={setModalEditAddress}
				modalDeleteAddress={modalDeleteAddress}
				setModalDeleteAddress={setModalDeleteAddress}
			></AddressesModal>
		</>
	)
}

export default Addresses
