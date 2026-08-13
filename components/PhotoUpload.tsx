"use client";
import { upload } from "@vercel/blob/client";
import { useMemo, useState } from "react";
import type { LeadPhoto } from "@/integrations/storage/photo-types";

const MAX_FILES = 3;
const MAX_SIZE = 12 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export function PhotoUpload({ requestId, value, onChange }: { requestId: string; value: LeadPhoto[]; onChange: (photos: LeadPhoto[]) => void }) {
  const [status, setStatus] = useState("");
  const remaining = Math.max(0, MAX_FILES - value.length);
  const label = useMemo(() => remaining ? `Add up to ${remaining} more photo${remaining === 1 ? "" : "s"}` : "Maximum 3 photos uploaded", [remaining]);

  async function choose(files: FileList | null) {
    if (!files || !remaining) return;
    const selected = Array.from(files).slice(0, remaining);
    setStatus("Uploading…");
    try {
      const uploaded: LeadPhoto[] = [];
      for (const file of selected) {
        if (!ALLOWED.has(file.type)) throw new Error("Only JPG, PNG and WebP files are accepted.");
        if (file.size > MAX_SIZE) throw new Error("Each photo must be 12 MB or smaller.");
        const blob = await upload(`lead-photos/${requestId}/${file.name}`, file, {
          access: "private",
          handleUploadUrl: "/api/uploads",
          clientPayload: JSON.stringify({ requestId }),
        });
        uploaded.push({ pathname: blob.pathname, contentType: file.type, size: file.size });
      }
      onChange([...value, ...uploaded]);
      setStatus(`${uploaded.length} photo${uploaded.length === 1 ? "" : "s"} uploaded.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    }
  }

  async function removePhoto(photo: LeadPhoto) {
    setStatus("Removing…");
    try {
      const response = await fetch("/api/uploads", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ requestId, pathname: photo.pathname }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Photo could not be removed.");
      }
      onChange(value.filter(item => item.pathname !== photo.pathname));
      setStatus("Photo removed.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Photo could not be removed.");
    }
  }

  return <div className="upload-panel">
    <label className="upload-drop">{label}<input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={!remaining} onChange={e => choose(e.target.files)} /></label>
    {value.length > 0 && <ul className="upload-list">{value.map(photo => <li key={photo.pathname}>{photo.pathname.split("/").at(-1)} <button type="button" onClick={() => removePhoto(photo)}>Remove</button></li>)}</ul>}
    {status && <p className="upload-status">{status}</p>}
    <small>Customer photos are intended for private storage and are not published on the website.</small>
  </div>;
}
