<template>
  <el-button @click="dialogVisible = true">增加一个任务</el-button>
  <el-button @click="onToggleSelection(table)">全选</el-button>
  <el-button @click="onToggleSelection()">清除</el-button>
  <el-table
    ref="multipleTable"
    :data="table"
    tooltip-effect="dark"
    style="width: 100%"
    height="400"
    @selection-change="onSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"> </el-table-column>
    <el-table-column fixed prop="title" label="Title" width="180">
    </el-table-column>
    <el-table-column label="Due" width="120">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.due }}</span></template
      >
    </el-table-column>
    <el-table-column prop="status" label="Status" width="150">
      <template #default="scope">
        <el-tag
          :type="
            scope.row.status === TASK_STATUS.IN_PROGRESS ? 'primary' : 'success'
          "
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="priority" label="Priority" width="120">
      <template #default="scope">
        <el-tag
          :type="
            scope.row.priority === TASK_PRIORITY.HIGH ? 'primary' : 'success'
          "
          disable-transitions
          >{{ scope.row.priority }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="owner" label="Owner" width="100"> </el-table-column>
    <el-table-column prop="description" label="Detail" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="onEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="onDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="任务"
    v-model="dialogVisible"
    width="60%"
    :before-close="onClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="任务名称">
        <el-input v-model="form.title" @input="onChange($event)"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="form.owner" @input="onChange($event)"></el-input>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select
          v-model="form.status"
          placeholder="请选择任务状态"
          @input="onChange($event)"
        >
          <el-option
            :label="TASK_STATUS.IN_PROGRESS"
            :value="TASK_STATUS.IN_PROGRESS"
          ></el-option>
          <el-option
            :label="TASK_STATUS.DONE"
            :value="TASK_STATUS.DONE"
          ></el-option>
          <el-option
            :label="TASK_STATUS.WAITING"
            :value="TASK_STATUS.WAITING"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务优先级">
        <el-select
          v-model="form.priority"
          placeholder="请选择任务优先级"
          @input="onChange($event)"
        >
          <el-option
            :label="TASK_PRIORITY.HIGH"
            :value="TASK_PRIORITY.HIGH"
          ></el-option>
          <el-option
            :label="TASK_PRIORITY.MED"
            :value="TASK_PRIORITY.MED"
          ></el-option>
          <el-option
            :label="TASK_PRIORITY.LOW"
            :value="TASK_PRIORITY.LOW"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="完成时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.due"
            style="width: 100%"
            @input="onChange($event)"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input
          type="textarea"
          v-model="form.description"
          @input="onChange($event)"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCreate()">创 建</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, Ref, watch } from 'vue'

import { userAuthInject } from '@/store/user'
import { getAllTasks, saveTask, removeTask } from '@/apis/task'
import {
  Task,
  TASK_STATUS,
  TASK_PRIORITY,
} from 'quboqin-lib-typescript/lib/task'

export default defineComponent({
  name: 'Home',
  setup() {
    const { userInfo } = userAuthInject()
    const userPhone = userInfo.user?.phone

    let table: Ref<Task[]> = ref([])
    const multipleTable = ref()
    const multipleSelection: number[] = reactive([])

    let form: Task = reactive({
      title: 'task name',
      status: TASK_STATUS.IN_PROGRESS,
      priority: TASK_PRIORITY.HIGH,
      description: 'task description',
      owner: userPhone,
    })

    let dialogVisible = ref(false)

    function onToggleSelection(rows: unknown[]) {
      if (rows) {
        rows.forEach((row) => {
          multipleTable.value.toggleRowSelection(row)
        })
      } else {
        multipleTable.value.clearSelection()
      }
    }

    function onSelectionChange(val: () => IterableIterator<number>) {
      multipleSelection.values = val
    }

    async function onDelete(index: number, row: unknown) {
      await removeTask(row as Record<string, unknown>)
      table.value = table.value.splice(index, 1)
    }

    function onEdit(index: number, row: unknown) {
      const preForm = row as Task
      form = Object.assign(form, preForm)
      dialogVisible.value = true
    }

    const onChange = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(this as any).$forceUpdate()
    }

    function onClose() {
      console.log(`close dialog`)
    }

    async function onCreate() {
      let params = form as Record<string, unknown>
      params.phone = userPhone
      await saveTask(params)
      table.value.push(form)
      dialogVisible.value = false
    }

    const getTasks = async () => {
      table.value = (await getAllTasks({ phone: userPhone })) as Task[]
    }

    onMounted(getTasks)

    watch(form, (form, prevForm) => {
      console.log(`title = ${form.title}, prevTitle = ${prevForm.title}`)
    })

    return {
      TASK_PRIORITY,
      TASK_STATUS,
      dialogVisible,
      table,
      multipleTable,
      multipleSelection,
      onToggleSelection,
      onSelectionChange,
      onDelete,
      onEdit,
      onChange,
      onClose,
      onCreate,
      getTasks,
      userPhone,
      form,
    }
  },
})
</script>
