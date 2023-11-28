import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: Transaction = await request.json();
  const transaction = await prisma.transaction.create({
    data: {
      customerName: body.customerName,
      amount: body.amount,
      brandId: body.brandId,
      productId: body.productId,
    },
  });
  return NextResponse.json(transaction, { status: 201 });
};
