"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTransaction = ({
  brands,
  products,
}: {
  brands: Brand[];
  products: Product[];
}) => {
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post("/api/transactions", {
      customerName: customerName,
      amount: Number(amount),
      brandId: Number(brand),
      productId: Number(product),
    });
    setIsLoading(false);
    setCustomerName("");
    setAmount("");
    setBrand("");
    setProduct("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Transaction</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="input input-bordered"
                placeholder="Customer Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered"
                placeholder="Amount"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Product
                </option>
                {products.map((product) => (
                  <option value={product.id} key={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" disabled className="btn btn-primary">
                  <span className="loading loading-spinner loading-lg"></span>
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
