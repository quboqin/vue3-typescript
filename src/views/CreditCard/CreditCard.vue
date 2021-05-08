<template>
  <el-container>
    <el-header align="center">Credit Card</el-header>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>Credit Card</span>
            <el-button
              type="primary"
              @click="onSaveCreditCard"
              :disabled="disabled"
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
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { userAuthInject } from '@/store/user'
import { result } from '@/utils/axios'
import { stripe, cardNumber, cardExpiry, cardCvc } from '@/utils/stripe'

const saveCard = (params: Record<string, unknown> = {}) => {
  return result('post', '/save-card', params)
}

export default defineComponent({
  name: 'CreditCard',
  setup() {
    const disabled = ref(false)
    const { userInfo } = userAuthInject()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripeTokenHandler = async (token: any) => {
      const result = await stripe.createSource(cardNumber)
      if (result.error) {
        // Inform the user if there was an error.
        disabled.value = false
      } else {
        // Send the token to your server.
        const cognitoUser = userInfo.cognitoUser
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ret: any = await saveCard({
          userId: cognitoUser?.getUsername(),
          stripeToken: token.id,
          phone: cognitoUser?.getUsername(),
          email: 'qubo.qin@gmail.com',
          sourceId: result.source?.id,
          cardInfo: {
            brand: result.source?.card?.brand,
            country: result.source?.card?.country,
            expMonth: result.source?.card?.exp_month,
            expYear: result.source?.card?.exp_year,
            last4: result.source?.card?.last4,
          },
        })
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

    return { disabled, onSaveCreditCard }
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
