import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./components/dashboard"
import ManageStation from "./pages/station"
import ManageCategory from "./pages/category"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "station",
          element: <ManageStation />
        },
        {
          path: "category",
          element: <ManageCategory />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
