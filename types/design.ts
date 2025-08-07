export interface User {
  id: string;
  name: string;
  email?: string;
  profilePicture?: string;
  role: "USER" | "ADMIN";
}

export interface Fabric {
  id: string;
  name: string;
  type: string;
  color: string;
  imageUrl: string;
  composition?: string;
  description?: string;
  price?: number;
  status?: "PENDING_REVIEW" | "ACCEPTED" | "REJECTED" | undefined;
  source: "PLATFORM" | "USER_UPLOAD";
  inStock?: boolean; 
  sustainability?: string | undefined;
  usedInDesigns?: number;
  uploadedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
    profilePicture?: string;
    role: "USER" | "ADMIN";
  };
  designId?: string;
  renderedDesignId?: string;
}

export interface RenderedDesign {
  id: string;
  name: string;
  type: string;
  designId: string;
  fabricId: string;
  imageUrl: string;
  notes?: string;
  status: "PENDING_REVIEW" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  createdById?: string;
  createdBy?: {
    name: string;
  };
  fabric: Fabric;
  comment: Comment[];
}

export interface ImageMetadata {
    url: string;
    name: string;
    type: string;
    size: string;
}

export interface Design {
  id: string;
  name: string;
  description?: string;
  imageMetadata: ImageMetadata[];
  status:
    | "UPLOADED"
    | "RENDERING"
    | "REVIEW_PENDING"
    | "REVIEW_COMPLETED"
    | "RENDERED";
  initialFabricId?: string;
  initialFabric?: Fabric;
  createdById: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  activeRenderedDesignId?: string;
  activeRenderedDesign?: RenderedDesign;
  renderedDesigns: RenderedDesign[];
  comments: Comment[];
}

export type DesignStatus =
  | "UPLOADED"
  | "RENDERING"
  | "REVIEW_PENDING"
  | "REVIEW_COMPLETED"
  | "RENDERED";
