import { NextResponse } from "next/server";
import { createUser } from "../authentication";

export async function POST(request) {
  const requestBody = await request.json();

  const fullName = requestBody.name;
  const userEmail = requestBody.email;
  const userPassword = requestBody.password;

  if (!fullName || !userEmail || !userPassword) {
    return NextResponse.json({ success: false, msg: "Invalid Data Provided!" });
  }

  const result = await createUser(fullName, userEmail, userPassword);

  return NextResponse.json(result);
}
