import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Transaction = await request.json();
  const transaction = await prisma.transaction.update({
    where: {
      id: Number(params.id),
    },
    data: {
      customerName: body.customerName,
      amount: body.amount,
      brandId: body.brandId,
      productId: body.productId,
    },
  });
  return NextResponse.json(transaction, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const transaction = await prisma.transaction.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(transaction, { status: 200 });
};
