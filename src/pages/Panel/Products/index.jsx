import { Route, Routes } from "react-router-dom";
import { ProductList } from "./list";
import { AddProductPage } from './add.jsx'
import { EditProductPage } from "./edit";

export const ProductsPage = () => {
  return (
    <div className= "products" >
      <Routes>
        <Route path="/:productID" element ={<EditProductPage />} />
        <Route path="/add" element ={<AddProductPage />} />
        <Route path="/" element ={<ProductList />} />
      </Routes>
    </div>
  );
};
