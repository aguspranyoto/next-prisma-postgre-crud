"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Transaction = {
  id: number;
  customerName: string;
  amount: number;
  brandId: number;
  productId: number;
};

const DeleteTransaction = ({ transaction }: { transaction: Transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (transactionId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/transactions/${transactionId}`);
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
            Are you sure to delete this data {transaction.customerName}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                onClick={() => handleDelete(transaction.id)}
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

export default DeleteTransaction;
