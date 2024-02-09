import { useState } from "react";

import "./App.css"


function SearchAbleProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <>
      <tr>
        <td colSpan={2} className="category">{category}</td>
      </tr>
    </>
  );
}

function ProductRow({ product }) {
  let name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}> {product.name}</span>
  );
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    </>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  let rows = [];
  let last_category = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return
    }
    if (inStockOnly && !product.stocked){
      return
    }
    if (product.category != last_category){
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />)
    }
    rows.push(<ProductRow key={product.name} product={product} />);
    last_category = product.category
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

function SearchBar({ filterText, inStockOnly, setFilterText, setInStockOnly }) {
  return (
    <>
      <label>
        <input
          type="text"
          value={filterText}
          placeholder="Enter your search here"
          onChange={(e) => setFilterText(e.target.value)}
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />
        Only Show products in stock
      </label>
    </>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return (
    <div>
      <SearchAbleProductTable products={PRODUCTS} />
    </div>
  );
}
