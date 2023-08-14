import axios from "axios"

const baseUrl = "http://localhost/mnt"

// METODO API CREATE: Crear registros
const POST = async (object, table = "clients") => {
	try {
		var f = new FormData()

		// Incluir en el FormData cada clave y su valor
		// obtenido del 'object' o 'instancia' del registro
		for (const key in object) {
			if (Object.hasOwnProperty.call(object, key)) {
				f.append(key, object[key])
			}
		}

		const request = await axios.post(`${baseUrl}/${table}`, f)
		return { data: request.data, err: false }
	} catch (error) {
		console.error("Error en la solicitud:", error)
		return { err: error }
	}
}

// METODO API READ: Leer todos los registros
const GET = async (setData, table = "clients") => {
	try {
		const request = await axios.get(`${baseUrl}/${table}`)

		// Si axios no tira una excepción,
		// se cargarán los datos
		setData(request.data)

		return { data: request.data, err: false }
	} catch (error) {
		console.error("Error en la solicitud:", error)
		return { err: error }
	}
}

// METODO API READ: Leer un solo registro
const VIEW = async (id, setData, table = "clients") => {
	try {
		const request = await axios.get(`${baseUrl}/${table}/${id}?expand=addresses,profiles`)

		// Si axios no tira una excepción,
		// se cargarán los datos
		setData(request.data)

		return { data: request.data, err: false }
	} catch (error) {
		console.error("Error en la solicitud:", error)
		return { err: error }
	}
}

// METODO API UPDATE: Actualizar un registro
const PUT = async (id, object, table = "clients") => {
	try {
		var f = new FormData()

		// Incluir en el FormData cada clave y su valor
		// obtenido del 'object' o 'instancia' del registro
		for (const key in object) {
			if (Object.hasOwnProperty.call(object, key)) {
				f.append(key, object[key])
			}
		}

		const request = await axios.put(`${baseUrl}/${table}/${id}`, f)
		return { data: request.data, err: false }
	} catch (error) {
		console.error("Error en la solicitud:", error)
		return { err: error }
	}
}

// METODO API DELETE: Eliminar un registro
const DELETE = async (id, table = "clients") => {
	try {
		const request = await axios.delete(`${baseUrl}/${table}/${id}`)
		return { data: request.data, err: false }
	} catch (error) {
		console.error("Error en la solicitud:", error)
		return { err: error }
	}
}

export { POST, GET, VIEW, PUT, DELETE }
