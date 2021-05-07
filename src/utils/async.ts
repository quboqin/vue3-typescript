import { ref, onMounted } from 'vue'

type AsyncFun = () => Promise<unknown>

export const useAsync: (func: AsyncFun) => void = (func: AsyncFun) => {
  const loading = ref(false)

  onMounted(async () => {
    try {
      loading.value = true
      await func()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      loading.value = false
    }
  })

  return loading
}
