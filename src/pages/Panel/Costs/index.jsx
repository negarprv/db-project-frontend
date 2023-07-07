import { Route, Routes } from "react-router-dom"
import { CostList } from './List'
import { AddNewCostPage } from './add'

export const CostsPage = () => {
  return (
    <div className="users">
      <Routes>
        <Route path="/" element={<CostList />} />
        <Route path="/add" element={<AddNewCostPage />} />
      </Routes>
    </div>
  )
}