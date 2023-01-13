export namespace Storage {
  /** 存储启用状态更新请求参数 */
  export interface UpdateStorageStatusRequestData {
    /** 存储id */
    storageId: number | undefined
    /** 启用状态 */
    status: number | undefined
  }

  /** 存储配置参数 */
  export interface StorageConfig {
    /** 存储配置 id */
    id: number | undefined
    /** 存储id */
    storageId: number | undefined
    /** 存储配置名称 */
    name: string | undefined
    /** 存储配置键 */
    key: string | undefined
    /** 存储配置值 */
    value: number | undefined
    /** 存储配置描述 */
    description: string | undefined
  }

  /** 存储启用状态更改请求参数 */
  export interface ChangeStorageStatusRequestData {
    storageId: number
    status: boolean
  }

  /** 新增存储请求参数 */
  export interface AddStorageRequestData {
    /** 存储名称 */
    name: string | undefined
    /** 存储类型：0->本地存储；1->OneDrive */
    type: string | undefined
    /** 备注 */
    remark: string | undefined
    /** 存储配置列表 */
    configList: Array<StorageConfig> | unknown
  }

  /** 更新存储请求参数 */
  export interface UpdateStorageRequestData {
    /** 存储id */
    id: number | undefined
    /** 存储名称 */
    name: string | undefined
    /** 存储类型：0->本地存储；1->OneDrive */
    type: string | undefined
    /** 存储启用状态：0->禁用；1->启用 */
    enable: number | undefined
    /** 备注 */
    remark: string | undefined
    /** 存储配置列表 */
    configList: Array<StorageConfig> | unknown
  }
}
