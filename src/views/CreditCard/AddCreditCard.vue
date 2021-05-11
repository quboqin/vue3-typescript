<template>
  <el-form ref="form" :model="form" label-width="200px">
    <el-form-item style="vertical-align: middle" label="Card Number">
      <div id="card-number"></div>
    </el-form-item>
    <el-form-item label="Expiration Date">
      <div id="card-expiry"></div>
    </el-form-item>
    <el-form-item label="CVV">
      <div id="card-cvc"></div>
    </el-form-item>
    <el-form-item :v-show="false">
      <div id="card-errors" role="alert"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSaveCreditCard"
        >保 存</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, onMounted, ref } from 'vue'
import { stripe, cardNumber, cardExpiry, cardCvc } from '@/utils/stripe'

import { saveCard } from '@/apis/credit'
import { Card } from 'quboqin-lib-typescript/lib/card'

export default defineComponent({
  name: 'CreditCard',

  setup() {
    let card: Card = new Card()

    const disabled = ref(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripeTokenHandler = async (token: any) => {
      const result = await stripe.createSource(cardNumber)
      if (result.error) {
        // Inform the user if there was an error.
        disabled.value = false
      } else {
        // Send the token to your server.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ret: any = await saveCard({
          cardId: uuidv4(),
          stripeToken: token.id,
          sourceId: result.source?.id,
          cardInfo: {
            brand: result.source?.card?.brand,
            country: result.source?.card?.country,
            expirationMonth: result.source?.card?.exp_month,
            expirationYear: result.source?.card?.exp_year,
            last4: result.source?.card?.last4,
          },
        })
        card.cardId = ret.cardId

        if (ret.code === 400) {
          console.log(ret.message)
        }
      }
    }

    async function onSaveCreditCard(): Promise<void> {
      const result = await stripe.createToken(cardNumber)
      if (result.error) {
        // Inform the user if there was an error.
        console.log(result.error.message)
      } else {
        // Send the token to your server.
        await stripeTokenHandler(result.token)
      }
    }

    onMounted(() => {
      cardNumber.mount('#card-number')
      cardExpiry.mount('#card-expiry')
      cardCvc.mount('#card-cvc')
    })

    cardNumber.addEventListener('change', (error: Error) => {
      const displayError: HTMLElement | null = document.getElementById(
        'card-errors',
      )
      if (displayError) {
        if (error) {
          displayError.textContent = error.message
        } else {
          displayError.textContent = ''
        }
      }
    })

    return { onSaveCreditCard }
  },
})
</script>
