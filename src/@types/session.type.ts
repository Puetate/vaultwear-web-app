export interface Session {
  user: SessionUser | null;
  accessToken: string;
}

export interface SessionUser {
  userID: number;
  email: string;
  status: boolean;
  person: SessionPerson;
  role: SessionRole;
}

export interface SessionPerson {
  personID: number;
  fullName: string;
  address: string;
  phone: string;
}

export interface SessionRole {
  roleID: number;
  roleName: string;
}
