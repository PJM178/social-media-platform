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
