import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CartProvider } from "./context/CartContext";
import { TableProvider } from "./context/TableContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import FloatingCartButton from "./components/FloatingCartButton";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TableProvider>
                <CartProvider>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                        <Footer />
                        <FloatingCartButton />
                    </Router>
                </CartProvider>
            </TableProvider>
        </ThemeProvider>
    );
};

export default App;
