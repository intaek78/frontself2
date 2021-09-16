<template>
  <div id="crawling">
  <br/>
  <h1>아마존 할인쿠폰 크롤링14 (https://couponfollow.com/site/amazon.com)</h1>
  <h3>Amazon 할인쿠폰을 마이페이지에 등록하세요&nbsp;<input type="text" v-model="copiedcode">&nbsp;<button class="btn-insert" v-on:click="insertCode">등록</button></h3>
    <table>
      <thead>
        <tr>
          <th>제목</th>
          <th>설명</th>
          <th>쿠폰</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(data, index) in crawlingList" :key="index">
        <td v-if="data.type === 'COUPON CODE'">{{data.title}}</td>
        <td v-if="data.type === 'COUPON CODE'">{{data.explain}}</td>
        <td v-if="data.type === 'COUPON CODE'">{{data.code}}<button v-on:click="moveCoupon(data.code)">확인</button></td>
      </tr>
      </tbody>
    </table>
    <p/>
    <button class="btn-small" v-on:click="goMypage">마이페이지</button>&nbsp;
    <button class="btn-small" v-on:click="goCoupon" align="left">쿠폰리스트</button>&nbsp;
    <button class="btn-small" v-on:click="goMember">멤버리스트</button>&nbsp;
  </div>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
// import VueAxios from 'vue-axios'

export default {
  name: 'crawling',
  data () {
    return {
      crawlingList: [],
      body: '',
      user: this.$route.params.memId,
      memNo: this.$route.params.memNo,
      copiedcode: ''
    }
  },
  created () {
    console.log('process.env=>' + process.env, 'process.env')
    console.log('VUE_APP_URL=>' + process.env.VUE_APP_URL)
    console.log('NODE_ENV=>' + process.env.NODE_ENV)
    this.getMember()
  },
  methods: {
    getMember () {
      this.body = {
        memId: this.$route.params.memId
      }
      // axios.get('/site/amazon.com', {
      const url = process.env.VUE_APP_URL
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      // alert('url===>' + url)
      axios.get(proxyurl+url, {
      // axios.get('https://couponfollow.com/site/amazon.com', {
      // axios.get('/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
      ).then(res => {
        let result = []
        const $ = cheerio.load(res.data)
        const noarr = $('.content>section>article').toArray()
        noarr.forEach((div) => {
          const aFirst = $(div).find('a').first()
          const url = aFirst.attr('href')
          const title = aFirst.text().trim()

          const cvalue = $(div).children('.deal').children('.deal-desc').children('.cr').first()
          const cvalue2 = cvalue.find('a').first()
          const cvalue3 = cvalue2.attr('data-url')
          const code = cvalue3

          const pFirst = $(div).find('p').first()
          const explain = pFirst.text().trim()

          const type = $(div).children('.deal').children('.deal-info').children('.type').text()
          // alert(type)

          result.push({
            url,
            title,
            code,
            explain,
            type
          })
          // console.log("result===>"+result)
        })

        this.crawlingList = result

        // $crawlingList.each(function(i, elem) {
        //  cList[i] = {
        //    url: $(this).find('div.snbArea').attr('href'),
        //    title: $(this).find('div.snbArea').text()
        //   }
        //  tmpcList.push(cList[i])
        //  console.log("tmpcList===>"+tmpcList[i].title)
        // })
        // const data = cList.filter(n => n.title);
        // console.log("cList===>"+cList[0].title)
      }).catch(err => {
        alert('연결실패')
        alert(err)
        console.log(err)
      })
    },
    moveCoupon (code) {
      window.open(code)
    },
    goMypage () {
      this.$router.push({name: 'mypage', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goCoupon () {
      this.$router.push({name: 'coupon', params: { memId: this.$route.params.memId, memNo: this.$route.params.memNo }})
    },
    goMember () {
      this.$router.push({name: 'member',
        params:
          { memId: this.$route.params.memId,
            memNo: this.$route.params.memNo
          }})
    },
    insertCode () {
      this.$axios.post('http://localhost:8088/coupons',
        { memId: this.$route.params.memId,
          couponId: this.copiedcode,
          memNo: this.$route.params.memNo,
          status: 'amazon discount coupon added!!' }
      ).then(res => {
        alert('쿠폰이 마이페이지에 저장되었습니다.')
        this.couponReqres = res.data
        this.copiedcode = ''
      }).catch(err => {
        alert(err)
        console.log(err)
      })
    }
  }
}
</script>
