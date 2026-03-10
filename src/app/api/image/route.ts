import { NextRequest, NextResponse } from "next/server";

/**
 * 代理 Google Drive 圖片，繞過直接連結的 403 限制
 * 伺服器端請求通常不受瀏覽器第三方 cookie 限制影響
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !/^[a-zA-Z0-9_-]{33,44}$/.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const url = `https://drive.google.com/uc?export=view&id=${id}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NextJS-Image-Proxy/1.0)",
      },
    });

    if (!res.ok) {
      // 若 uc 回傳 403，嘗試 thumbnail 端點
      const thumbRes = await fetch(
        `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; NextJS-Image-Proxy/1.0)",
          },
        }
      );
      if (!thumbRes.ok) {
        return NextResponse.json(
          { error: "Image not found or not accessible" },
          { status: 404 }
        );
      }
      const blob = await thumbRes.blob();
      const contentType = thumbRes.headers.get("content-type") || "image/png";
      return new NextResponse(blob, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const blob = await res.blob();
    const contentType = res.headers.get("content-type") || "image/png";
    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
