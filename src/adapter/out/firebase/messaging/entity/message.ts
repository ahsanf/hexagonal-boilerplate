export type MessageFCM = {
  id: string
  title: string
  subtitle: string
  image: string
  content: string
  url: string
  sender: string
  receiver: string
  destination: string
  reference_id?: string
}