import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function parsePDF(filePath: string) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  return docs.map(d => d.pageContent).join("\n");
}