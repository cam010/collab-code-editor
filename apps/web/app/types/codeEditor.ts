export type Language =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'cpp';

export type FileItem = {
  id: string,
  name: string,
  language: Language,
  content: string
}