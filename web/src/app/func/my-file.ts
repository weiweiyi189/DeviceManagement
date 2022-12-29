
export interface MyFile {
  id: number;

  sha1: string;

  md5: string;

  /** 文件存储路径 */
  path: string;

  /** 文件存储名称（包含扩展名） */
  name: string;

  /**文件mime*/
  mime: string;

  /** 文件被引用次数 */
  quoteNumber: number;
}
