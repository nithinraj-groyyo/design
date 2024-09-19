export interface IUserProfile {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    mobileNo: string;
    profileImage: string | null;
    gender: string | null;
    isActive: boolean;
    roleId: number;
    lastLoggedIn: string | null;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
}

export interface IUserDetailsRequest {
    userId: string | null;
    firstName: string;
    lastName: string;
    gender: string;
    emailId: string;
    mobileNo: string;
    fileName: File | string | null;
}

export interface IAddressRequest {
    addressId: string | number | nulll;
    userId: string;
    addressName: string;
    addressType: string;
    streetAddress1: string;
    streetAddress2?: string;
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
    streetAddress1: string;
    streetAddress2: string;
    phone: string;
    landmark: string;
    city: string;
    state: string;
    emailId: string;
    country: string;
    zip: number;
    isActive: boolean;
    flag: boolean;
    createdDate: string;
    createdBy: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
  }