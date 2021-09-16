<template>
  <div id="coupon">
  <br/>
    <h1>탈퇴장부</h1>
    <table>
      <div>
        <tr>
          <th width=200  align="center">회원번호</th>
          <th width=200  align="center">멤버ID</th>
          <th width=200  align="center">이름</th>
          <th width=200  align="center">탈퇴일시</th>
          <th width=500  align="center">상태</th>
        </tr>
      </div>
      <tr v-for="(data, index) in cancellationList" :key="index">
        <div>
          <tr v-for="(data2, index2) in data.cancellations" :key="index2">
            <td  width=210 align="center">{{data2.memNo}}</td>
            <td  width=210 align="center">{{data2.memId}}</td>
            <td  width=210 align="center">{{data2.memNm}}</td>
            <td  width=210 align="center">{{data2.withdrawDate}}</td>
            <td  width=510 align="center">{{data2.status}}</td>
          </tr>
        </div>
      </tr>
    </table>
    <br/>
    <button class="btn-small" v-on:click="goMember">멤버리스트</button>
  </div>
</template>

<script>
export default {
  name: 'cancellation',
  data () {
    return {
      cancellationList: [],
      body: '',
      user: this.$route.params.memId
    }
  },
  created () {
    this.getCancelData()
  },
  methods: {
    getCancelData () {
      this.body = {
        memId: this.$route.params.memId
      }
      this.$axios.get('http://localhost:8088/cancellations', {
        params: this.body
      }
      ).then(res => {
        this.cancellationList = res.data
      }).catch(err => {
        alert('연결실패')
        alert(err)
        console.log(err)
      })
    },
    goMember () {
      this.$router.push({name: 'member',
        params:
          { memId: this.$route.params.memId,
            memNo: this.$route.params.memNo
          }})
    }
  }
}
</script>
