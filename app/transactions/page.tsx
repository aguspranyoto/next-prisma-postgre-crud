import { PrismaClient } from "@prisma/client";
import AddTransaction from "./addTransaction";
import UpdateTransaction from "./updateTransaction";
import DeleteTransaction from "./deleteTransaction";
const prisma = new PrismaClient();

const getTransactions = async () => {
  const res = await prisma.transaction.findMany({
    select: {
      id: true,
      customerName: true,
      amount: true,
      brandId: true,
      brand: true,
      productId: true,
      product: true,
    },
  });
  return res;
};

const getProducts = async () => {
  const res = await prisma.product.findMany();
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

const Transaction = async () => {
  const [products, transactions, brands] = await Promise.all([
    getProducts(),
    getTransactions(),
    getBrands(),
  ]);
  return (
    <div>
      <div className="mb-2">
        <AddTransaction brands={brands} products={products} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Brand</th>
            <th>Product</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.customerName}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.brand.name}</td>
              <td>{transaction.product.title}</td>
              <td className="flex justify-center space-x-1 ">
                <UpdateTransaction
                  brands={brands}
                  products={products}
                  transaction={transaction}
                />
                <DeleteTransaction transaction={transaction} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
