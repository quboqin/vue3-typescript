<template>
  <div>
    <header></header>
    <nav-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, Ref, watch } from 'vue'

import navBar from '@/components/NavBar.vue'
import { userAuthInject } from '@/store/user'
import { getAllTasks, saveTask, removeTask } from '@/apis/task'
import {
  Task,
  TASK_STATUS,
  TASK_PRIORITY,
} from 'quboqin-lib-typescript/lib/task'

export default defineComponent({
  name: 'Home',
  components: {
    navBar,
  },
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
