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
      checkMobile(value) {
        const pattern = /^09[0-9]{8}$/
        return pattern.test(value) || 'Please enter the correct phone number'
      }
    }
  }
}
