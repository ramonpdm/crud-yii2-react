import React from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { modalStyles, handleChange } from "../../functions/Shared"
import { POST, PUT, DELETE } from "../../data/API"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

const ProfilesModal = ({ data, setData, profile, setProfile, modalInsertProfile, setModalInsertProfile, modalEditProfile, setModalEditProfile, modalDeleteProfile, setModalDeleteProfile }) => {
	const toggleModalInsertProfile = () => {
		setModalInsertProfile(!modalInsertProfile)
	}

	const toggleModalEditProfile = () => {
		setModalEditProfile(!modalEditProfile)
	}

	const toggleModalDeleteProfile = () => {
		setModalDeleteProfile(!modalDeleteProfile)
	}

	return (
		<>
			<Modal isOpen={modalInsertProfile} style={modalStyles}>
				<ModalHeader>Agregar Perfil</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Email</label>
						<br />
						<input type="text" className="form-control" name="email" onChange={handleChange(setProfile)} />
						<label>Telefono</label>
						<br />
						<input type="text" className="form-control" name="phone" onChange={handleChange(setProfile)} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalInsertProfile()}>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await POST(profile, "profiles")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({ ...prevData, profiles: data.profiles.concat(request.data) }))
								toggleModalInsertProfile()
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

			<Modal isOpen={modalEditProfile} style={modalStyles}>
				<ModalHeader>Editar Perfil</ModalHeader>
				<ModalBody>
					<div className="form-group">
						<label>Email</label>
						<br />
						<input type="text" className="form-control" name="email" onChange={handleChange(setProfile)} value={profile && profile.email} />
						<label>Telefono</label>
						<br />
						<input type="text" className="form-control" name="phone" onChange={handleChange(setProfile)} value={profile && profile.phone} />
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalEditProfile()}>
						Cancelar
					</button>
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await PUT(profile.id_profile, profile, "profiles")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({
									...prevData,
									profiles: data.profiles.map((row) => {
										if (profile.id_profile === row.id_profile) {
											return { ...row, email: profile.email, phone: profile.phone }
										}
										return row
									}),
								}))
								toggleModalEditProfile()
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

			<Modal isOpen={modalDeleteProfile} style={modalStyles}>
				<ModalBody>¿Seguro que quieres eliminar el perfil {profile && profile.id_profile}?</ModalBody>
				<ModalFooter>
					<button className="btn btn-danger" onClick={() => toggleModalDeleteProfile()}>
						No
					</button>{" "}
					<button
						className="btn btn-primary"
						onClick={async () => {
							// Almacenar la respuesta de la API
							const request = await DELETE(profile.id_profile, "profiles")
							// Validar que no exista algún error
							if (request.err === false) {
								setData((prevData) => ({
									...prevData,
									profiles: prevData.profiles.filter((row) => row.id_profile !== profile.id_profile),
								}))
								toggleModalDeleteProfile()
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

export default ProfilesModal
