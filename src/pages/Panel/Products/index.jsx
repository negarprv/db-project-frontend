import { Route, Routes } from "react-router-dom";
import { ProductList } from "./list";
import { AddProductPage } from './add.jsx'

export const ProductsPage = () => {
  return (
    <div className= "products" >
      <Routes>
        <Route path="/" element ={<ProductList />} />
        <Route path="/add" element ={<AddProductPage />} />
      </Routes>
    </div>
  );
};
