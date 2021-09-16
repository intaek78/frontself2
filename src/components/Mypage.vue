<template>
  <div id="coupon">
    <h1>마이페이지</h1>
    <table>
      <div>
        <tr>
          <th width=180  align="center">멤버ID</th>
          <th width=140  align="center">회원번호</th>
          <th width=190  align="center">이름</th>
          <th width=200  align="center">쿠폰ID</th>
          <th width=200  align="center">유효기간시작일</th>
          <th width=200  align="center">유효기간종료일</th>
          <th width=500  align="center">상태</th>
          <th width=200  align="center">가입일</th>
          <th width=200  align="center">탈퇴일</th>
        </tr>
      </div>
      <tr v-for="(data, index) in mypageList" :key="index">
        <div>
          <tr v-for="(data2, index2) in data.mypages" :key="index2">
            <td  width=210 align="center">{{data2.memId}}</td>
            <td  width=160 align="center">{{data2.memNo}}</td>
            <td  width=210 align="center">{{data2.memNm}}</td>
            <td  width=210 align="center">{{data2.couponId}}</td>
            <td  width=210 align="center">{{data2.startDate}}</td>
            <td  width=210 align="center">{{data2.endDate}}</td>
            <td  width=510 align="center">{{data2.status}}</td>
            <td  width=210 align="center">{{data2.regDate}}</td>
            <td  width=210 align="center">{{data2.withdrawDate}}</td>
          </tr>
        </div>
      </tr>
    </table>
    <br/>
    <button class="btn-small" v-on:click="goCoupon">쿠폰리스트</button>&nbsp;
    <button class="btn-small" v-on:click="goMember">멤버리스트</button>&nbsp;
    <button class="btn-small" v-on:click="goCrawling">크롤링</button>&nbsp;
    <button class="btn-small" v-on:click="goLogout">로그아웃</button>&nbsp;
  </div>
</template>

<script>
export default {
  name: 'mypage',
  data () {
    return {
      mypageList: [],
      body: '',
      user: this.$route.params.memId
    }
  },
  created () {
    this.getMypageData()
  },
  methods: {
    getMypageData () {
      this.body = {
        memId: this.$route.params.memId
      }
      this.$axios.get('http://localhost:8088/mypages', {
        params: this.body
      }
      ).then(res => {
        this.mypageList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    goMember () {
      this.$router.push({name: 'member',
        params:
          { memId: this.$route.params.memId,
            memNo: this.$route.params.memNo
          }})
    },
    goCoupon () {
      this.$router.push({name: 'coupon', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goCrawling () {
      this.$router.push({name: 'crawling', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goLogout () {
      this.$router.push({name: 'login', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    }
  }
}
</script>
