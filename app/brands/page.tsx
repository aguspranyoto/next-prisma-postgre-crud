import { PrismaClient } from "@prisma/client";
import AddBrand from "./addBrand";
import UpdateBrand from "./updateBrand";
import DeleteBrand from "./deleteBrand";
const prisma = new PrismaClient();

const getBrands = async () => {
  const res = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return res;
};

const Brand = async () => {
  const [brands] = await Promise.all([getBrands()]);

  return (
    <div>
      <div className="mb-2">
        <AddBrand />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Brand Name</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand.id}>
              <td>{index + 1}</td>
              <td>{brand.name}</td>
              <td className="flex justify-center space-x-1 ">
                <UpdateBrand brand={brand} />
                <DeleteBrand brand={brand} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
