import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Providers from "./providers/Providers.tsx";
import Yo from "./Yo.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/yo" element={<Yo />} />
				</Routes>
			</BrowserRouter>
		</Providers>
	</StrictMode>,
);
