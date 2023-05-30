export default {
  data() {
    return {
      valid: true,
      buttonLoading: false,
      required(value) {
        return !!value || 'Required'
      },
      checkIP(value) {
        const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        return (
          pattern.test(value) ||
          'Please enter the correct IP format.'
        )
      },
      checkPassword(value) {
        const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W).{8,16}$/
        return (
          pattern.test(value) ||
          'Enter a combination of at least eight numbers, letters and punctuation marks (likes ! and &).'
        )
      },
      checkEmail(value) {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid email format'
      },
      checkRoomID(value) {
        value = value.replace(/[^A-Z0-9]/g, '')
        const pattern =
          /^(\w{4})(\w{4})$/
        return pattern.test(value) || 'Invalid RoomID format'
      },
      checkOrgID(value) {
        const pattern =
          /(\w{4,})/
        return pattern.test(value) || 'Invalid organization ID format'
      },
      checkMobile(value) {
        const pattern = /^09[0-9]{8}$/
        return pattern.test(value) || 'Please enter the correct phone number'
      }
    }
  }
}
