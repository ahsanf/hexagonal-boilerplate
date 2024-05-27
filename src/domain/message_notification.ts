export type MessageNotification = {
  id: string
  title: string
  subtitle: string
  image: string
  content: string
  isRead: boolean
  url: string
  sender: string
  receiver: string
  destination: string
  referenceId?: string
  isMuted?: boolean
  type?: string
  createdAt: Date
  updatedAt: Date
}