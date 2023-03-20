import { Request, Response } from 'express';

// Type for new user mutation
export interface UserEntry {
  username: string
  name: string
  password: string
}

// Type for single user query - maybe define this at the query level
export interface SingleUser {
  id: number
}

export interface Token {
  token: string
}

export interface Cookies {
  req: Request
  res: Response
}

export interface TokenUser {
  username: string
  id: string
}

export interface UserLogin {
  username: string
  password: string
}