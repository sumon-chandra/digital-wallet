import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./Pages/providers/theme.provider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Toaster richColors position="bottom-right" closeButton duration={2000} />
				<RouterProvider router={router} />
			</ThemeProvider>
		</ReduxProvider>
	</StrictMode>
);
