import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import { VIEW } from "../data/API"
import Profiles from "./Profiles"
import Addresses from "./Addresses"

const Client = () => {
	const [data, setData] = useState(null)
	const params = useParams()

	useEffect(() => {
		VIEW(params.id, setData)
	}, [])

	return (
		<>
			{data != null ? (
				<div>
					<h2>{data.client_name}</h2>

					<hr />

					<Profiles data={data} setData={setData}></Profiles>

					<br />

					<Addresses data={data} setData={setData}></Addresses>
				</div>
			) : (
				<p>No existe el cliente...</p>
			)}
			<br />

			<div>
				<a href="/clients" className="btn btn-secondary">
					Regresar
				</a>
			</div>
		</>
	)
}

export default Client
