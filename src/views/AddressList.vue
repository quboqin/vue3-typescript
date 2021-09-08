<template>
  <Header title="我的地址"></Header>
  <div class="mt-14">
    <div class="text-left mx-4">我的收货地址</div>
    <AddressCell
      v-for="(address, index) in addresses"
      :key="index"
      :firstName="firstName"
      :lastName="lastName"
      :address="address"
      :isDefault="address.id === defaultAddress"
      @click="onEditAddress(index)"
      class="my-2 mx-4"
    ></AddressCell>
    <div class="text-left mx-4 text-blue-400" @click="onAddAddress">
      添加新的地址
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Header from '@/components/HeaderWithBack.vue'
import AddressCell from '@/components/AddressCell.vue'

import { userAuthInject } from '@/store/user'
import { getUserByPhone, getAllAddresses } from '@/apis/user'
import { Address } from 'quboqin-lib-typescript/lib/address'
import { User } from 'quboqin-lib-typescript/lib/user'

export default defineComponent({
  name: 'AddressList',
  components: {
    Header,
    AddressCell,
  },
  setup() {
    const router = useRouter()
    const { userInfo, setUserInfo } = userAuthInject()

    const state = reactive({
      phone: userInfo.user.phone,
      firstName: userInfo.user.firstName,
      lastName: userInfo.user.lastName,
      defaultAddress: userInfo.user.defaultAddress,
      addresses: userInfo.user.addresses ? userInfo.user.addresses : [],
    })

    function onEditAddress(index: number) {
      const address = state.addresses[index]
      router.push({
        name: 'AddressDetail',
        params: {
          phone: state.phone,
          zipCode: address.zipCode,
          city: address.city,
          street: address.street,
          id: address.id,
        },
      })
    }

    function onAddAddress() {
      router.push({
        name: 'AddressDetail',
        params: {
          phone: state.phone,
        },
      })
    }

    const init = async () => {
      state.addresses = (await getAllAddresses({
        phone: state.phone,
      })) as Address[]

      const user = (await getUserByPhone({
        phone: state.phone,
      })) as User

      setUserInfo({
        cognitoUser: userInfo.cognitoUser,
        user: user,
      })
    }
    onMounted(init)

    return {
      ...toRefs(state),
      onEditAddress,
      onAddAddress,
    }
  },
})
</script>
