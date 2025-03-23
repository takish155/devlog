import { auth } from "@/auth";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export const revalidate = 0;

export type GetSessionResponse =
  | {
      success: true;
      data: Session;
      message: string;
      status: 200;
    }
  | {
      success: false;
      data: null;
      message: string;
      status: 401 | 500;
    };

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: null,
          status: 401,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Session fetched successfully",
        data: session,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch session",
        data: null,
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
