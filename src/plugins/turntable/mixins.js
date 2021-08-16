export default {
  data(){
    return {
      isShowAlert: false,
      alertText: ''
    }
  },
  methods: {
    showAlert(text){
      this.isShowAlert = true
      this.alertText = text
    },
    closeAlert(){
      this.alertText = ''
      this.isShowAlert = false
    }
  }
}