import Image from "next/image";
import type { ReactNode } from "react";

/**
 * All workshop photos are bundled in /public/images and served by this site.
 * See public/images/PHOTO-CREDITS.md for the original Pexels photo licenses.
 */
const photography = {
  garage: {
    src: "/images/car-workshop.webp",
    alt: "Cars inside a professional automotive maintenance workshop",
  },
  service: {
    src: "/images/car-service.webp",
    alt: "Technician inspecting a car engine in an automotive service bay",
  },
  team: {
    src: "/images/car-team.webp",
    alt: "Automotive technicians working together inside a garage",
  },
  engine: {
    src: "/images/car-engine.webp",
    alt: "Mechanic repairing vehicle engine components in a workshop",
  },
  inspection: {
    src: "/images/car-inspection.webp",
    alt: "Mechanic inspecting and servicing an open car engine",
  },
  workshop: {
    src: "/images/garage-interior.webp",
    alt: "Cars undergoing repairs in a professional vehicle workshop",
  },
  bike: {
    src: "/images/bike-repair.webp",
    alt: "Motorcycle mechanic servicing a bike engine inside a workshop",
  },
  bikeTeam: {
    src: "/images/bike-team.webp",
    alt: "Motorcycle mechanic servicing a bike inside a repair garage",
  },
  bikeService: {
    src: "/images/bike-service.webp",
    alt: "Technician repairing a motorbike at a motorcycle service centre",
  },
} as const;

export type WorkshopPhotoKey = keyof typeof photography;

type WorkshopPhotoProps = {
  photo: WorkshopPhotoKey;
  className?: string;
  priority?: boolean;
  shade?: boolean;
  caption?: string;
  children?: ReactNode;
  sizes?: string;
};

export function WorkshopPhoto({
  photo,
  className = "",
  priority = false,
  shade = true,
  caption,
  children,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: WorkshopPhotoProps) {
  const asset = photography[photo];
  return (
    <figure className={"photo-frame " + className}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="photo-image"
      />
      {shade ? <div className="photo-shade" aria-hidden="true" /> : null}
      {children ? <div className="photo-content">{children}</div> : null}
      {caption ? <figcaption className="photo-caption">{caption}</figcaption> : null}
    </figure>
  );
}
