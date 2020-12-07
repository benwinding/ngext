import { NgextConfig } from "ngext";

declare global {
  interface Window { 
    PROCESS: NgextConfig;
  }
}
