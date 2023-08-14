// Estilos globales para los modales
export const modalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
}

// Manejador dinámico de cambios en inputs
export const handleChange = (setter) => (e) => {
	const { name, value } = e.target
	setter((prevState) => ({
		...prevState,
		[name]: value,
	}))
}
