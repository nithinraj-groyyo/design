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