<template>
  <div id="coupon">
  <br/>
    <h1>쿠폰리스트</h1>
    <table>
      <div>
        <tr>
          <th width=200  align="center">멤버ID</th>
          <th width=200  align="center">쿠폰ID</th>
          <th width=200  align="center">유효기간시작일</th>
          <th width=200  align="center">유효기간종료일</th>
          <th width=500  align="center">상태</th>
        </tr>
      </div>
      <tr v-for="(data, index) in couponList" :key="index">
        <div>
          <tr v-for="(data2, index2) in data.coupons" :key="index2">
            <td  width=210 align="center">{{data2.memId}}</td>
            <td  width=210 align="center">{{data2.couponId}}</td>
            <td  width=210 align="center">{{data2.startDate}}</td>
            <td  width=210 align="center">{{data2.endDate}}</td>
            <td  width=510 align="center">{{data2.status}}</td>
          </tr>
        </div>
      </tr>
    </table>
    <br/>
    <button class="btn-small" v-on:click="goMember">멤버리스트</button>&nbsp;
    <button class="btn-small" v-on:click="goMypage">마이페이지</button>&nbsp;
    <button class="btn-small" v-on:click="goCrawling">크롤링</button>&nbsp;
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      couponList: [],
      body: '',
      user: this.$route.params.memId
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.body = {
        memId: this.$route.params.memId
      }
      this.$axios.get('http://localhost:8088/coupons', {
        params: this.body
      }
      ).then(res => {
        this.couponList = res.data
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
    goMypage () {
      this.$router.push({name: 'mypage', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goCrawling () {
      this.$router.push({name: 'crawling', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    }
  }
}
</script>
