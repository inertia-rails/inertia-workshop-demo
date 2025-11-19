export interface Message {
  id: number
  body: string
  user: User
  created_at: string
}

export interface Topic {
  id: number
  title: string
  category: {
    name: string
  }
  user: User
  messages: Message[]
}

export interface Category {
  id: number
  name: string
  topics: Topic[]
  topics_count: number
}

export interface User {
  id: number
  username: string
  email?: string
  about_me?: string | null
  topics_count?: number
  messages_count?: number
}

export interface SharedProps {
  categories: Category[],
  current_user: User,
  search_results: { topics: Topic[], q: string }
}

export interface ChatMessage {
  id: number
  user: Pick<User, 'username'>
  body: string
  created_at: string
}

export interface Meta {
  title: string
  description: string
  tag_name?: string,
  http_equiv?: string,
  head_key?: string,
  inner_content?: string | object,
  [key: string]: any
}
