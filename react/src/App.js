import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Client from "./pages/Client"
import Clients from "./pages/Clients"

function App() {
	return (
		<div className="contenedor">
			<BrowserRouter>
				<Routes>
					{/* Rutas de la página principal con el listado de clientes de la API */}
					<Route path="/" element={<Clients></Clients>}></Route>
					<Route path="/clients/" element={<Clients></Clients>}></Route>
					{/* Ruta de la página específica de cada cliente */}
					<Route path="/clients/:id" element={<Client></Client>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
