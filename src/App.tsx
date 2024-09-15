import '@fontsource/inter';
import { Home } from './Home/Home';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CssVarsProvider } from '@mui/joy';
import { theme } from './theme';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from './Error/ErrorPage';
import { Profile } from './Profile/Profile';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/:id",
    element: <Profile />
  }
], {
  basename: '/shades-of-react-vite'
});

function App() {
  return (
    <>
      <CssVarsProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </CssVarsProvider>
    </>
  )
}

export default App
