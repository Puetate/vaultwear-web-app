export interface User {
  userID: number;
  fullName: string;
  role: {
    roleID: number;
    roleName: string;
  };
  email: string;
  status: string;
}

export interface Person {
  personID: number;
  name: string;
  surname: string;
  identification: string;
  phone: string;
  address: string;
  status: string;
}
