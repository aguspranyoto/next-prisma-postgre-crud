"use client";
import { useState, SyntheticEvent } from "react";
import type { Brand, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Transaction = {
  id: number;
  customerName: string;
  amount: number;
  brandId: number;
  productId: number;
};

const UpdateProduct = ({
  brands,
  products,
  transaction,
}: {
  brands: Brand[];
  products: Product[];
  transactions: Transaction;
}) => {
  const [customerName, setCustomerName] = useState(transaction.customerName);
  const [amount, setAmount] = useState(transaction.amount);
  const [brand, setBrand] = useState(transaction.brandId);
  const [product, setProduct] = useState(transaction.productId);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.patch(`/api/transactions/${transaction.id}`, {
      customerName: customerName,
      amount: Number(amount),
      brandId: Number(brand),
      productId: Number(product),
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-sm btn-info" onClick={handleModal}>
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Transaction</h3>
          <form onSubmit={handleUpdate}>
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
              <label className="label font-bold">amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input input-bordered"
                placeholder="amount"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))}
                className="select select-bordered"
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">product</label>
              <select
                value={product}
                onChange={(e) => setProduct(Number(e.target.value))}
                className="select select-bordered"
              >
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
                  Update
                </button>
              ) : (
                <button type="button" disabled className="btn btn-primary">
                  <span className="loading loading-spinner loading-lg"></span>
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
