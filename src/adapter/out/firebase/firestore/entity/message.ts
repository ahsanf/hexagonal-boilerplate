export type MessageFirestore = {
  id?: string
  title: string
  subtitle: string
  image: string
  content: string
  is_read: boolean
  url: string
  sender: string
  receiver: string
  destination: string
  reference_id?: string
  type?: string
  created_at: Date
  updated_at: Date
}