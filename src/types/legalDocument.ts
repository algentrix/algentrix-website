export type LegalListBlock = {
  title?: string
  items: string[]
}

export type LegalSectionContent = {
  id: string
  title: string
  intro?: string
  paragraphs?: string[]
  lists?: LegalListBlock[]
  contact?: boolean
}

export type LegalTocItem = {
  id: string
  title: string
}
