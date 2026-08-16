import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  fallback: string;
}

export function ProjectImage({
  src,
  alt,
  width,
  height,
  objectPosition,
  fallback,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="image-fallback" role="img" aria-label={fallback}>
        <ImageOff aria-hidden="true" />
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{ objectPosition }}
      onError={() => setFailed(true)}
    />
  );
}
