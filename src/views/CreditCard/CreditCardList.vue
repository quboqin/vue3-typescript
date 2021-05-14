<template>
  <el-button @click="onToggleSelection(table)">全选</el-button>
  <el-button @click="onToggleSelection()">清除</el-button>
  <el-button @click="onDelete()">删除</el-button>
  <el-table
    ref="multipleTable"
    :data="table"
    tooltip-effect="dark"
    style="width: 100%"
    height="400"
    @selection-change="onSelectionChange"
  >
    <el-table-column fixed type="selection" width="55"> </el-table-column>
    <el-table-column fixed prop="brand" label="Brand" width="180">
    </el-table-column>
    <el-table-column label="Month" width="120">
      <template #default="scope">
        <span style="margin-left: 10px">{{
          scope.row.expirationMonth
        }}</span></template
      >
    </el-table-column>
    <el-table-column label="Year" width="120">
      <template #default="scope">
        <span style="margin-left: 10px">{{
          scope.row.expirationYear
        }}</span></template
      >
    </el-table-column>
    <el-table-column prop="last4" label="Last4" width="100"> </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          type="danger"
          @click="onDelete(scope.$index, scope.row)"
          >删除</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="onDonate(scope.$index, scope.row)"
          >Donate</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'

import { getAllCards } from '@/apis/credit'
import { userAuthInject } from '@/store/user'
import { payOrder } from '@/apis/payment'
import { Card } from 'quboqin-lib-typescript/lib/card'

export default defineComponent({
  name: 'CreditCardList',

  setup() {
    const { userInfo } = userAuthInject()
    const userPhone = userInfo.user?.phone

    let table: Card[] = reactive([])

    const multipleTable = ref()
    const multipleSelection: number[] = reactive([])

    const getCards = async () => {
      table = (await getAllCards({ phone: userPhone })) as Card[]
    }

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

    function onDelete(index: number, row: unknown) {
      console.log(`delete item  ${row} ar ${index}`)
    }

    function onDonate(index: number, row: unknown) {
      console.log(`donate ${row} ar ${index}`)
      payOrder({
        cardId: 'card.cardId',
        amount: '0.5',
        phone: userPhone,
      })
    }

    onMounted(getCards)

    return {
      table,
      getCards,
      multipleTable,
      multipleSelection,
      onToggleSelection,
      onSelectionChange,
      onDelete,
      onDonate,
    }
  },
})
</script>
