import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { config } from "../config/index";


export class RAGService {
    
  private vectorStore!: QdrantVectorStore;
  private llm: ChatOpenAI;
  private embeddings = new OpenAIEmbeddings({apiKey: config.openaiKey});
  private client = new QdrantClient({
      url: config.qdrantUrl,
      apiKey: config.qdrantKey,
  });

  constructor() {
    this.llm = new ChatOpenAI({
      model: "gpt-5-nano",
      apiKey: config.openaiKey,
    });
  }

  // 1. Initialize Vector Store
  async init() {
      this.vectorStore = await QdrantVectorStore.fromDocuments(
          [],
          this.embeddings,
          {
              client: this.client,
              collectionName: "rag-docs"
          }
        );
      }

  // 2. Add documents (chunk + embed + store)
  async addDocuments(text: string) {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
      });
      const chunks = await splitter.createDocuments([text]);

      this.vectorStore = await QdrantVectorStore.fromDocuments(
        chunks,
        this.embeddings,
        {
          client: this.client,  
          collectionName: "rag-docs",
        }
      );
  }

  // 3. Ask question (RAG pipeline)
  async ask(question: string) {
      const results = await this.vectorStore.similaritySearch(question, 3);
      const context = results.map(r => r.pageContent).join("\n");
      const response = await this.llm.invoke(`
        Answer using only this context:
        ${context}
        Question: ${question}
      `);

      const content = response.content;

      return typeof content === "string" ? content : content.map((c: any) => c.text ?? "").join("");

    }
}