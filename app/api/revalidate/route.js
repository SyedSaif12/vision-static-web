import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const secretKey = request.nextUrl.searchParams.get("secret");
    const revalidateTags = request.nextUrl.searchParams.get("tag"); // variable ka naam ye hai

    if (secretKey !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!revalidateTags) {
      return NextResponse.json({ message: "Tag is required" }, { status: 400 });
    }

    revalidateTag(revalidateTags);
    console.log(
      `[CACHE PURGED] Tag: ${revalidateTags} at ${new Date().toISOString()}`,
    );
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Cache cleared for tag: ${revalidateTags}`,
    });
  } catch (err) {
    console.error("Revalidation Error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 },
    );
  }
}
