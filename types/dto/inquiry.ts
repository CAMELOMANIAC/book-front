export enum InquiryType {
  EVENT = "event",
  OTHER = "other",
}

export type Inquiry = {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};
