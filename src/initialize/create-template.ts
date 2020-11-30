import copy from "copy-template-dir";
import path from "path";

export async function InitNgextDir(ROOT_DIR: string) {
  const vars = { foo: "bar" };
  const inDir = path.join(__dirname, "..", "..", "templates", ".ngext");
  const outDir = path.join(ROOT_DIR, ".ngext");
  await CopyDir(inDir, outDir, vars, false);
}

export async function MakeNewProject(TARGET_DIR: string) {
  const vars = { foo: "bar" };
  const inDir = path.join(__dirname, "..", "..", "templates", "new-project");
  const outDir = path.join(TARGET_DIR);
  await CopyDir(inDir, outDir, vars, true);
}

async function CopyDir(
  inDir: string,
  outDir: string,
  vars: {},
  hasLogging: boolean
) {
  return new Promise((resolve, reject) => {
    copy(inDir, outDir, vars, (err: any, createdFiles: string[]) => {
      if (err) {
        return reject(err);
      }
      if (hasLogging) {
        createdFiles.forEach((filePath) =>
          console.log(`-> created ${filePath}`)
        );
        console.log("done!");
      }
      resolve();
    });
  });
}
