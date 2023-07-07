import { Route, Routes } from "react-router-dom"
import { MenuAppBar } from "./Header"
import { Menu } from "./Menu"
import { Grid } from "@mui/material"

export const PanelPage = () => {
  return (
    <div className="panel-cont">
      <MenuAppBar />
      <Grid container spacing={2}>
        <Grid item flexShrink={true}>
          <Menu />
        </Grid>
        <Grid item flexGrow={1}>
          <Routes>
            <Route path={"users/*"} element={<h1>Users</h1>} />
          </Routes>
        </Grid>
      </Grid>
      
    </div>
  )
}