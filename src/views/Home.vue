<template>
  <el-table
    ref="multipleTable"
    :data="table"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column label="日期" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([table[1], table[2]])"
      >切换第二、第三行的选中状态</el-button
    >
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useAsync } from '@/utils/async'
import { result } from '@/utils/axios'
import { User } from 'quboqin-lib-typescript/lib/user'

const getUserById = (params: Record<string, unknown> = {}) => {
  return result('get', '/users', params)
}

const checkHealth = (params: Record<string, unknown> = {}) => {
  return result('get', '/health', params)
}

export default defineComponent({
  name: 'Home',
  setup() {
    const multipleTable = ref()

    const table = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ]

    const multipleSelection: number[] = reactive([])

    function toggleSelection(rows: unknown[]) {
      if (rows) {
        rows.forEach((row) => {
          multipleTable.value.toggleRowSelection(row)
        })
      } else {
        multipleTable.value.clearSelection()
      }
    }

    function handleSelectionChange(val: () => IterableIterator<number>) {
      multipleSelection.values = val
    }

    const user: User = {
      userId: '4d53f6c8-528e-4c79-ac05-d296ba1a5a90',
      phone: '+8613004151097',
    }

    async function onGetUserById(): Promise<unknown> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return await getUserById(user as any)
    }

    async function onGetUsers(): Promise<unknown> {
      return await getUserById()
    }

    const loading = useAsync(() => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          checkHealth()
          resolve()
        }, 2000)
      })
    })

    return {
      loading,
      table,
      multipleTable,
      multipleSelection,
      toggleSelection,
      handleSelectionChange,
      user,
      onGetUserById,
      onGetUsers,
      onMounted,
    }
  },
})
</script>
