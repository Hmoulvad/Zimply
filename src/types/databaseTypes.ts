export namespace DatabaseTypes {
  export type User = {
    id: number;
    name: string;
    email: string;
  };

  export type Token = { type: "battlenet"; token: string; expires: number };
}
