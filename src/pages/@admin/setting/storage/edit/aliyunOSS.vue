<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { FormInstance } from '@arco-design/web-vue'
import type { Storage } from '~/api/interface/storage'
import { storageInfo, storageUpdate } from '~/api/modules/storage'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const updateStorageForm = reactive({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  enable: undefined,
  endpoint: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucketName: '',
  mount_path: '',
})
const updateStorageData = ref<Storage.UpdateStorageRequestData>({
  /** 存储id */
  id: undefined,
  /** 存储名称 */
  name: '',
  /** 存储类型 */
  type: 2,
  /** 存储 key */
  storageKey: '',
  /** 备注 */
  remark: '',
  enable: undefined,
  configList: [],
})

const list = ref<Array<Storage.StorageConfig>>([])
const endpoint = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'Endpoint',
  configKey: 'endpoint',
  configValue: '',
  description: '填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。',
})
const accessKeyId = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'AccessKeyId',
  configKey: 'accessKeyId',
  configValue: '',
  description: '阿里云账号AccessKey ID，阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。',
})
const accessKeySecret = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'AccessKeySecret',
  configKey: 'accessKeySecret',
  configValue: '',
  description: '阿里云账号AccessKey Secret，阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。',
})
const bucketName = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: 'BucketName',
  configKey: 'bucketName',
  configValue: '',
  description: '阿里云 OSS Bucket 名称',
})
const mount_path = ref<Storage.StorageConfig>({
  id: undefined,
  storageId: undefined,
  name: '挂载路径',
  configKey: 'mount_path',
  configValue: '',
  description: '阿里云 OSS 挂载路径',
})

const handleFormData = () => {
  list.value = []
  endpoint.value.configValue = updateStorageForm.endpoint
  accessKeyId.value.configValue = updateStorageForm.accessKeyId
  accessKeySecret.value.configValue = updateStorageForm.accessKeySecret
  mount_path.value.configValue = updateStorageForm.mount_path
  list.value.push(endpoint.value)
  list.value.push(accessKeyId.value)
  list.value.push(accessKeySecret.value)
  list.value.push(mount_path.value)
  updateStorageData.value.configList = list.value
}

const handleSubmit = (formEl: FormInstance) => {
  Message.info('开发中！')
  formEl.validate((valid) => {
    if ((!valid)) {
      updateStorageData.value.name = updateStorageForm.name
      updateStorageData.value.storageKey = updateStorageForm.storageKey
      updateStorageData.value.remark = updateStorageForm.remark
      handleFormData()
      storageUpdate(updateStorageData.value).then((res) => {
        if (res.code === 200) {
          Message.info(res.message)
          router.push('/@admin/setting/storage')
        }
      })
    }
  })
}

onBeforeMount(() => {
  const id = Number(router.currentRoute.value.query.id)
  storageInfo(id).then((res) => {
    if (res.code === 200) {
      updateStorageForm.id = res.data.id
      updateStorageForm.name = res.data.name
      updateStorageForm.storageKey = res.data.storageKey
      updateStorageForm.remark = res.data.remark
      updateStorageForm.enable = res.data.enable
      const configList = res.data.configList
      for (const item of configList) {
        if (item.configKey === 'mount_path') {
          updateStorageForm.mount_path = item.configValue
        } else if (item.configKey === 'endpoint') {
          updateStorageForm.endpoint = item.configValue
        } else if (item.configKey === 'accessKeyId') {
          updateStorageForm.accessKeyId = item.configValue
        } else if (item.configKey === 'accessKeySecret') {
          updateStorageForm.accessKeySecret = item.configValue
        } else if (item.configKey === 'bucketName') {
          updateStorageForm.bucketName = item.configValue
        }
      }
    }
  })
})
</script>

<template>
  <div
    :style="{
      boxSizing: 'border-box',
      width: '100%',
      padding: '0.25rem',
      height: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-card hoverable :style="{ height: '100%', padding: '0.25rem' }" :title="t('tip.cardTitle')">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="handleSubmit(formRef)">{{ t('button.submit') }}</a-button>
        </a-space>
      </template>
      <icon-arrow-left class="cursor-pointer" @click="router.back()" />
      <br>
      <a-row>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
        <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form ref="formRef" :model="updateStorageForm" layout="vertical">
            <a-form-item field="name" :label="t('storage.name')" required>
              <a-input v-model="updateStorageForm.name" placeholder="请输入存储名称" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="storageKey" label="storageKey" required>
              <a-input v-model="updateStorageForm.storageKey" placeholder="请输入 storageKey" :max-length="{ length: 20, errorOnly: true }" show-word-limit allow-clear />
            </a-form-item>
            <a-form-item field="bucketName" label="BucketName" :help="bucketName.description" required>
              <a-textarea v-model="updateStorageForm.bucketName" placeholder="阿里云 OSS Bucket 名称" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="endpoint" label="Endpoint" :help="endpoint.description" required>
              <a-textarea v-model="updateStorageForm.endpoint" placeholder="请输入Bucket 地域的 Endpoint" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="accessKeyId" label="AccessKeyId" :help="accessKeyId.description" required>
              <a-textarea v-model="updateStorageForm.accessKeyId" placeholder="请输入 AccessKeyId" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="accessKeySecret" label="AccessKeySecret" :help="accessKeySecret.description" required>
              <a-textarea v-model="updateStorageForm.accessKeySecret" placeholder="请输入 AccessKeySecret" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="mount_path" label="挂载路径" :help="mount_path.description" required>
              <a-textarea v-model="updateStorageForm.mount_path" placeholder="请输入挂载路径" allow-clear auto-size show-word-limit />
            </a-form-item>
            <a-form-item field="remark" :label="t('storage.remark')">
              <a-textarea v-model="updateStorageForm.remark" placeholder="请输入备注" allow-clear auto-size :max-length="{ length: 200, errorOnly: true }" show-word-limit />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6" />
      </a-row>
      开发中
    </a-card>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
meta:
  layout: admin
</route>