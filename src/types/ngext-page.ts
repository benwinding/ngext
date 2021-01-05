import { SourceFile } from "ts-morph";

export interface NgextPage {
  sourceFile?: SourceFile;
  layout?: {
    componentName: string;
    importPath: string;
  }
}
