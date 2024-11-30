import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart"; // Import the Cart component
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Ensure proper import

const App = () => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    role: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      console.log(decodedUser)
      setUser({
        id: decodedUser.id,
        name: decodedUser.name,
        email: decodedUser.email,
        role: decodedUser.role,
      });
    }
  }, []);
  console.log("user is:",user);

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("token");

    setUser({
      id: '',
      username: '',
      email: '',
      role: ''
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} handleLogout={handleLogout} />,
      children: [
        {
          path: "/register/customer",
          element: (
            <RegistrationForm/>
          ),
        },
        {
          path: "/login",
          element: <LoginForm/>,
        },
        {
          path: "/products",
          element: <Products user={user} />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/cart", // Add cart route
          element: <Cart user={user} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
