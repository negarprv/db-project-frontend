import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import { ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "react-query"
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import 'react-toastify/dist/ReactToastify.css'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#006daf",
    },
    secondary: {
      main: "#00FF00",
    },
  },
  direction:"rtl"
});

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </QueryClientProvider>
  </React.StrictMode>
);
