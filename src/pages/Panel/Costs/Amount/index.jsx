import { Route, Routes } from "react-router-dom";
import { AddNewCostAmount } from "./add";
import { EditCostAmount } from "./edit";
import { CostAmountList } from "./list";

export const CostsAmountPage = () => {
  return (
    <div className="users">
      <Routes>
        <Route path="/add/:costID" element={<AddNewCostAmount />} />
        <Route path="/edit/:costID" element={<EditCostAmount />} />
        <Route path="/:costID" element={<CostAmountList />} />
      </Routes>
    </div>
  );
};
