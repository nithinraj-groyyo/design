export interface IUserProfile {
    id: number;
    contactName: string | null;
    contactNumber: string | null;
    gender: string | null;
    email: string;
    role: Role;
    isAdmin: boolean;
}

export interface Role {
    id: number;
    name: string;
  }

export interface IUserDetailsRequest {
    id: number;
    contactName: string | null;
    contactNumber: string | null;
    gender: string | null;
    email: string;
    fileName: File | string | null;
}

export interface IAddressRequest {
    addressId: string | number | nulll;
    userId: string;
    addressName: string;
    addressType: string;
    streetAddress: string;
    // streetAddress2?: string;
    phone: string;
    landmark?: string;
    city: string;
    state: string;
    zip: string;
}

export interface IAddressResponse {
    id: number;
    userId: number;
    addressName: string;
    addressType: string;
    streetAddress: string;
    phone: string;
    landmark: string;
    city: string;
    state: string;
    emailId: string;
    country: string;
    postalCode: number;
    isActive: boolean;
    flag: boolean;
    createdDate: string;
    createdBy: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
  }