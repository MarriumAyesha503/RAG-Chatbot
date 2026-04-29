import { Request, Response, NextFunction } from "express";
import { ChatRequest } from "../types/chatRequest";
import { ChatResponse } from "../types/chatResponse";
import { RAGService } from "../services/ragService";
import { parsePDF } from "../loader/pdfLoader";
import { RAGError } from "../middlewares/errorMiddleware";
import { questionValidator } from "../validators/questionValidator";


type UploadedFile = Express.Multer.File;

export class RAGController {

  constructor(private ragService: RAGService) {}

  async init() {
    await this.ragService.init();
  };

  // 📄 upload MULTIPLE PDFs
  async uploadPDFs(req: Request, res: Response, next: NextFunction) : Promise<void>
  {
    try {
      const files = req.files as UploadedFile[] | undefined;

      if (!files || files.length === 0) {
        throw new RAGError("No files uploaded", 400);
      }

      let combinedText = "";

      for (const file of files) {
        const text = await parsePDF(file.path);
        combinedText += text + "\n";
      }

      await this.ragService.addDocuments(combinedText);

      res.json({
        message: "PDFs uploaded successfully",
        count: files.length,
      });
    } catch (err) {
          if (err instanceof RAGError) {
            return next(err); 
          }
        return next(new RAGError(err instanceof Error ? err.message : "Failed to upload PDFs" , 500));
      }
  };

  // ask questions
  async ask ( req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse>, next: NextFunction) : Promise<void>
  {
    try {
        const { error, value } = questionValidator.validate(req.body);
        if (error) {
            throw new RAGError(error.details[0].message, 400);
        }
      const  question  = value.question;
      const answer = await this.ragService.ask(question);
      res.status(200).json({ answer });
    } 
    catch (err) {
        if (err instanceof RAGError) {
            return next(err); 
        }
        return next(new RAGError(err instanceof Error ? err.message : "Failed to get answer", 500));
      }
  };
}