import { convertToRelativePath, stripTsExtension } from './path-helpers';
import * as path from "path";

const CWD = '/random/dir/some/';
describe("path-helpers", () => {
  test("convertToRelativePath", () => {
    const testFilePath = path.join(CWD, 'myfile.ts'); 
    const targetPath = convertToRelativePath(CWD, testFilePath);
    expect(targetPath).toBe('./myfile.ts');
  });

  test("convertToRelativePath nested", () => {
    const testFilePath = path.join(CWD, 'some/nested/myfile.ts'); 
    const targetPath = convertToRelativePath(CWD, testFilePath);
    expect(targetPath).toBe('./some/nested/myfile.ts');
  });

  test("stripTsExtension", () => {
    const targetPath = stripTsExtension('./some/nested/myfile.ts');
    expect(targetPath).toBe('./some/nested/myfile');
  });

  test("stripTsExtension", () => {
    const targetPath = stripTsExtension('./some/nested/myfile.ts');
    expect(targetPath).toBe('./some/nested/myfile');
  });
});
