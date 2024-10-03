const useToken = () => {
   function setToken(value: string | null) {
      sessionStorage.setItem('session_token', value || '')
   }

   function getToken() {
      return sessionStorage.getItem('session_token')
   }

   function removeToken() {
      sessionStorage.removeItem('session_token')
   }

   return { setToken, getToken, removeToken }
}

export default useToken
