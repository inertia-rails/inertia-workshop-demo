export * from './serializers'

export interface Meta {
  title: string
  description: string
  tag_name?: string,
  http_equiv?: string,
  head_key?: string,
  inner_content?: string | object,
  [key: string]: any
}
