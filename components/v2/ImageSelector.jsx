
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Upload, X, ImagePlus } from "lucide-react";

const MAX_IMAGES = 5;

const ImageSelector = ({ value = [], onChange, disabled = false }) => {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");

  // Generate image previews and cleanup object URLs
  useEffect(() => {
    const urls = value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(urls);

    return () => {
      urls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [value]);

  // Handle multiple image selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const remaining = MAX_IMAGES - value.length;

    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== selectedFiles.length) {
      setError("Please select valid image files only.");
    } else {
      setError("");
    }

    if (remaining <= 0) {
      setError("You can upload a maximum of 5 images.");
      e.target.value = "";
      return;
    }

    if (validFiles.length > remaining) {
      setError(`You can only select ${remaining} more image(s).`);
    }

    const newFiles = validFiles.slice(0, remaining);

    if (newFiles.length) {
      onChange([...value, ...newFiles]);
    }

    // Allow selecting the same image again
    e.target.value = "";
  };

  // Remove selected image
  const handleRemove = (index) => {
    const updatedImages = value.filter((_, i) => i !== index);

    onChange(updatedImages);
    setError("");
  };

  return (
    <div className="w-full">
      <label className="mb-2 block font-heading text-[13px] font-semibold text-ink-2">
        Attach photos or a video (optional)
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={disabled || value.length >= MAX_IMAGES}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Area */}
      {value.length < MAX_IMAGES && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex min-h-[136px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-white px-4 py-6 text-slate-400 transition hover:border-primary hover:bg-primary/[0.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload size={24} strokeWidth={1.8} />

          <span className="text-sm font-medium">
            Tap to upload
          </span>

          <span className="text-xs text-slate-400">
            Select images (Maximum 5)
          </span>
        </button>
      )}

      {/* Selected Images */}
      {!!previews.length && (
        <div className="mt-4 flex flex-wrap gap-3">
          {previews.map(({ file, url }, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="group relative w-[calc(50%-6px)] overflow-hidden rounded-xl border border-light-100 bg-white sm:w-32"
            >
              {/* Image Preview */}
              <div className="relative aspect-square w-full bg-slate-50">
                <img
                  src={url}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleRemove(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={16} />
                </button>
              </div>

              {/* File Name */}
              <div className="p-2">
                <p
                  title={file.name}
                  className="truncate text-xs font-medium text-ink-2"
                >
                  {file.name}
                </p>
                <p className="mt-1 text-[10px] text-muted">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}

          {/* Add More Images */}
          {value.length < MAX_IMAGES && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square w-[calc(50%-6px)] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400 transition hover:border-primary hover:text-primary sm:w-32 disabled:opacity-50"
            >
              <div className="flex flex-col items-center gap-2">
                <ImagePlus size={24} />
                <span className="text-xs font-medium">
                  Add more
                </span>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Image Counter */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-muted">
          JPG, PNG, WEBP and other image formats
        </p>

        <p className="text-xs font-semibold text-ink-2">
          {value.length}/{MAX_IMAGES}
        </p>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageSelector;
