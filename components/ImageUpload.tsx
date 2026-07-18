'use client';

import { useState, useCallback } from 'react';
import { uploadImage } from '@/lib/api-client';

interface ImageUploadProps {
  onImageAdded?: (url: string) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
}

export default function ImageUpload({ onImageAdded, onError, multiple = true }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        onError?.('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        onError?.('Image must be under 5MB');
        return;
      }

      setUploading(true);
      try {
        const data = await uploadImage(file);
        const newUrl = data.url;
        
        if (multiple) {
          setImages((prev) => [...prev, newUrl]);
        } else {
          setImages([newUrl]);
        }
        
        onImageAdded?.(newUrl);
      } catch (error) {
        onError?.(error instanceof Error ? error.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onImageAdded, onError, multiple]
  );

  return (
    <div className="space-y-4">
      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input')?.click()}
        className="rounded-lg border-2 border-dashed border-line bg-paper p-8 text-center text-sm text-ink/40 cursor-pointer hover:border-ink/20 hover:bg-paper/50 transition"
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="hidden"
        />
        <p>{uploading ? 'Uploading...' : 'Drag photos here, or click to upload'}</p>
        <p className="text-xs mt-1">(JPG/PNG, up to 5MB)</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((url) => (
            <div key={url} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="uploaded" className="w-full h-20 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((u) => u !== url))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
