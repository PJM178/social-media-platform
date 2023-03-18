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
  value: string
}

export interface TokenUser {
  username: string
  id: string
}

export interface UserLogin {
  username: string
  password: string
}