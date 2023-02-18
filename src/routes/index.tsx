import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";

export function AppRoutes() {
    const { toggleTheme } = useAppThemeContext();

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleTheme}>Toggle theme</Button>} />

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}