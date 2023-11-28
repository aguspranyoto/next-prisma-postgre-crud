"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/products/${productId}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="btn btn-sm btn-error" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete this data {product.title}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                onClick={() => handleDelete(product.id)}
                type="button"
                className="btn btn-primary"
              >
                yes
              </button>
            ) : (
              <button type="button" disabled className="btn btn-primary">
                <span className="loading loading-spinner loading-lg"></span>
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
