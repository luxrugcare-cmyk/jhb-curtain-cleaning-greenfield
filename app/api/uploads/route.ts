import { del } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Private upload storage is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json() as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const payload = clientPayload ? JSON.parse(clientPayload) : {};
        if (!payload.requestId || typeof payload.requestId !== "string") {
          throw new Error("Invalid upload session");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 12 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ requestId: payload.requestId }),
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload rejected" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Private upload storage is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json() as { requestId?: string; pathname?: string };
    const requestId = body.requestId?.trim();
    const pathname = body.pathname?.trim();

    if (!requestId || !pathname) {
      return NextResponse.json({ error: "Missing upload reference." }, { status: 400 });
    }

    const expectedPrefix = `lead-photos/${requestId}/`;
    if (!pathname.startsWith(expectedPrefix)) {
      return NextResponse.json({ error: "Invalid upload reference." }, { status: 403 });
    }

    await del(pathname);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 400 },
    );
  }
}
