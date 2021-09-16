<template>
  <div id="coupon">
  <br/>
    <h1>멤버리스트</h1>
    <input type="hidden" id="inputmemNo">
        <table>
      <div>
        <tr>
          <th width=200  align="center">회원번호</th>
          <th width=200  align="center">멤버ID</th>
          <th width=200  align="center">이름</th>
          <th width=200  align="center">쿠폰발행여부</th>
          <th width=500  align="center">상태</th>
        </tr>
      </div>
      <tr v-for="(data, index) in memberList" :key="index">
        <div>
          <tr v-for="(data2, index2) in data.members" :key="index2">
            <td  width=210 align="center">{{data2.memNo}}</td>
            <td  width=210 align="center">{{data2.memId}}</td>
            <td  width=210 align="center">{{data2.memNm}}</td>
            <td  width=210 align="center">{{data2.couponYN}}</td>
            <td  width=510 align="center">{{data2.status}}</td>
          </tr>
        </div>
      </tr>
    </table>
    <p/>
    <button class="btn-small" v-on:click="goCoupon" align="left">쿠폰리스트</button>&nbsp;
    <button class="btn-small" v-on:click="goCancellation">탈퇴장부</button>&nbsp;
    <button class="btn-small" v-on:click="goMypage">마이페이지</button>&nbsp;
    <button class="btn-small" v-on:click="goCrawling">크롤링</button>&nbsp;
    <button class="btn-small" v-on:click="cancelMember">회원탈퇴</button>
  </div>
</template>

<script>
export default {
  name: 'member',
  data () {
    return {
      memberList: [],
      memId: '',
      memNo: this.$route.params.memNo,
      user: this.$route.params.memId
    }
  },
  created () {
    this.getMember()
  },
  methods: {
    getMember () {
      this.body = {
        memId: this.$route.params.memId
      }
      this.$axios.get('http://localhost:8088/members', {
        params: this.body
      }
      ).then(res => {
        this.memberList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    goCoupon () {
      this.$router.push({name: 'coupon', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goCancellation () {
      this.$router.push({name: 'cancellation', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goMypage () {
      this.$router.push({name: 'mypage', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    cancelMember () {
      alert('withdraw!!!!')
      this.$axios.delete('http://localhost:8088/members/' + this.memNo
      ).then(res => {
        alert('회원 탈퇴 완료!!')
        this.$router.push({name: 'login', params: { memId: this.memid, memNo: res.data.memNo }})
      }).catch(err => {
        alert(err)
      })
    },
    goCrawling () {
      this.$router.push({name: 'crawling', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    }
  }
}
</script>
