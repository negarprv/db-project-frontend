import { Route, Routes } from "react-router-dom";
import { CostList } from "./List";
import { AddNewCostPage } from "./add";
import { EditCostPage } from "./edit";
import { CostsAmountPage } from "./Amount";

export const CostsPage = () => {
  return (
    <div className="users">
      <Routes>
        <Route path="/" element={<CostList />} />
        <Route path="/add" element={<AddNewCostPage />} />
        <Route path="/:costID" element={<EditCostPage />} />
        <Route path="/amount/*" element={<CostsAmountPage />} />
      </Routes>
    </div>
  );
};
