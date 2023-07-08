import { Route, Routes } from "react-router-dom"
import { MenuAppBar } from "./Header"
import { Menu } from "./Menu"
import { UsersPage } from "./Users"
import { CostsPage } from './Costs'
import { ProductsPage } from './Products'
import { Grid } from "@mui/material"

export const PanelPage = () => {
  return (
    <div className="panel-cont">
      <MenuAppBar />
      <Grid container  spacing={2} flexShrink={1}>
        <Grid item xs={2}>
          <Menu />
        </Grid>
        <Grid item xs={10} flexGrow={1}>
          <Routes>
            <Route path={"users/*"} element={<UsersPage />} />
            <Route path={"costs/*"} element={<CostsPage />} />
            <Route path={"products/*"} element={<ProductsPage />} />
          </Routes>
        </Grid>
      </Grid>
      
    </div>
  )
}