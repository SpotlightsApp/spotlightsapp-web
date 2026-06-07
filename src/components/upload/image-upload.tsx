"use client";

import { useRef, useState } from "react";
import { Loader2, ImagePlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  bucket: string;
  /**
   * Folder the file is stored under, e.g. an event slug. For the "avatars"
   * bucket this is ignored and the user's id is used instead, because storage
   * RLS requires the first path segment to equal auth.uid().
   */
  pathPrefix: string;
  value?: string;
  onUploaded: (url: string) => void;
  shape?: "circle" | "square";
  label?: string;
};

export function ImageUpload({
  bucket,
  pathPrefix,
  value,
  onUploaded,
  shape = "square",
  label,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function pick() {
    setError(null);
    inputRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Allow picking the same file again later.
    e.target.value = "";
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const supabase = createClient();

      // Avatars must live under <auth.uid()>/ per storage RLS.
      let prefix = pathPrefix;
      if (bucket === "avatars") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          throw new Error("You must be signed in to upload.");
        }
        prefix = user.id;
      }

      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${prefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  const isCircle = shape === "circle";

  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border bg-surface-2 text-muted-foreground",
          isCircle ? "rounded-full" : "rounded-lg",
        )}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt={label || "Uploaded image"}
            className="h-full w-full object-cover"
          />
        ) : isCircle ? (
          <User className="h-8 w-8" />
        ) : (
          <ImagePlus className="h-8 w-8" />
        )}
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Loader2 className="h-5 w-5 animate-spin text-accent-strong" />
          </div>
        ) : null}
      </div>

      <div className="grid gap-1.5">
        {label ? (
          <span className="text-sm font-medium text-foreground">{label}</span>
        ) : null}
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={pick}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {value ? "Change" : "Upload"}
          </Button>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}
