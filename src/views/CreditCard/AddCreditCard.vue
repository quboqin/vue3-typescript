<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Credit Card</span>
        <el-button type="primary" @click="onSaveCreditCard" :disabled="disabled"
          >Save</el-button
        >
      </div>
    </template>
    <el-row>
      <el-col :span="24">
        <div>
          <div>Card Number</div>
          <div id="card-number"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <div>Expiration Date</div>
          <div id="card-expiry"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <div>CVV</div>
          <div id="card-cvc"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <div id="card-errors" role="alert"></div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-button type="primary" @click="onPayOrder">Pay</el-button>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, onMounted, ref } from 'vue'
import { result } from '@/utils/axios'
import { stripe, cardNumber, cardExpiry, cardCvc } from '@/utils/stripe'

import { Card } from 'quboqin-lib-typescript/lib/card'

const saveCard = (params: Record<string, unknown> = {}) => {
  return result('post', '/cards', params)
}

const payOrder = (params: Record<string, unknown> = {}) => {
  return result('post', '/orders', params)
}

export default defineComponent({
  name: 'AddCreditCard',
  setup() {
    const disabled = ref(false)

    let card: Card = new Card()

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

    async function onPayOrder(): Promise<void> {
      await payOrder({
        cardId: card.cardId,
        amount: '0.5',
      })
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

    return { disabled, onSaveCreditCard, onPayOrder }
  },
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
