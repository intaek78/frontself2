
<template>

  <div class="bgcolor">
  <br/>
  <br/>
  <br/>
  <br/>
  <h1>Amazon 할인쿠폰 크롤링시스템</h1>
    <div class="loginForm">
    <h1 class="h1-black">회원가입</h1>
    <div class="idForm">
      <input class="id" type="text" v-model="memid" placeholder="ID : ">
    </div>
    <div class="idForm">
      <input class="id" type="text" v-model="pw" placeholder="PW : ">
    </div>
    <div class="idForm">
      <input class="id" type="text" v-model="memNm" placeholder="이름 : ">
    </div>
      <button v-on:click="regist" class="btn">가입</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      memid: '',
      myStyle: {
        backgroundColor: '#16a085'
      }
    }
  },
  methods: {
    regist () {
      this.$axios.post('http://localhost:8088/members',
        { memId: this.memid,
          memNm: this.memNm }
      ).then(res => {
        alert('회원가입이 완료되었습니다. 가입쿠폰이 발급되었으니 쿠폰리스트 화면에서 확인해보세요')
        this.memReqres = res.data
        this.$router.push({name: 'coupon', params: { memId: this.memid, memNo: res.data.memNo }})
      }).catch(err => {
        alert('errrr1234444')
        alert(err)
        console.log(err)
      })
    }
  }
}
</script>
