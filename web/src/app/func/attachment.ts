import {MyFile} from './my-file';

/**
 * 附件实体
 */
export interface Attachment {
  /** 被删与否 */
  deleted: boolean;
  /**
   * 扩展名
   */
  ext: string;
  /** 文件 */
  file: MyFile;
  /** id */
  id: number;
  /**文件名*/
  name: string;
}
