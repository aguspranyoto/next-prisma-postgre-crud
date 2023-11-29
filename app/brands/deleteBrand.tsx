"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Brand = {
  id: number;
  name: string;
};

const DeleteBrand = ({ brand }: { brand: Brand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (brandId: number) => {
    setIsLoading(true);
    await axios.delete(`/api/brands/${brandId}`);

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
            Are you sure to delete this data {brand.name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                onClick={() => handleDelete(brand.id)}
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

export default DeleteBrand;
