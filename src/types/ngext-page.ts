import { SourceFile } from "ts-morph";

export interface NgextPage {
  sourceFile?: SourceFile;
  layout?: {
    componentName: string;
    importPath: string;
  }
}

export interface NgextRoot {
  root?: string;
  sourcePath?: string;
  routePath?: string;
  importPath?: string;
  template?: {
    text: string
  }
  beforePage?: {
    text: string
  }
  afterPage?: {
    text: string
  }
}