import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { MdDelete, MdEdit } from "react-icons/md"

import ProfilesModal from "../components/modals/ProfilesModal"

const Profiles = ({ data, setData }) => {
	const params = useParams()

	const [profile, setProfile] = useState({
		id_client: params.id,
		id_profile: "",
		email: "",
		phone: "",
	})

	const [modalInsertProfile, setModalInsertProfile] = useState(false)
	const [modalEditProfile, setModalEditProfile] = useState(false)
	const [modalDeleteProfile, setModalDeleteProfile] = useState(false)

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
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h2 className="display-inline">Perfiles</h2>
				{data && data != null && (
					<>
						<button className="btn btn-success" onClick={() => toggleModalInsertProfile()}>
							Agregar Perfil
						</button>
					</>
				)}
			</div>

			<hr />

			{data && data.profiles && data.profiles.length > 0 ? (
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Email</th>
							<th>Telefono</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.profiles.map((row) => (
							<tr key={row.id_profile}>
								<td style={{ verticalAlign: "middle" }}>{row.id_profile}</td>
								<td style={{ verticalAlign: "middle" }}>{row.email}</td>
								<td style={{ verticalAlign: "middle" }}>{row.phone}</td>
								<td style={{ textAlign: "right" }}>
									<button
										className="btn btn-danger"
										onClick={() => {
											setProfile(row)
											toggleModalDeleteProfile()
										}}
									>
										<MdDelete />
									</button>{" "}
									<button
										className="btn btn-warning pr-2"
										style={{ color: "white" }}
										onClick={() => {
											setProfile(row)
											toggleModalEditProfile()
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
				<p>No posee perfiles</p>
			)}

			<ProfilesModal
				data={data}
				setData={setData}
				profile={profile}
				setProfile={setProfile}
				modalInsertProfile={modalInsertProfile}
				setModalInsertProfile={setModalInsertProfile}
				modalEditProfile={modalEditProfile}
				setModalEditProfile={setModalEditProfile}
				modalDeleteProfile={modalDeleteProfile}
				setModalDeleteProfile={setModalDeleteProfile}
			></ProfilesModal>
		</>
	)
}

export default Profiles
