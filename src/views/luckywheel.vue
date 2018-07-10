<template>
    <div class="turnTable">
        <div class="lucky-wheel">
            <div class="lucky-title">
              <div class="user">账户金币:666, 抽奖10金币/次</div>
               <!-- 广播 -->
              <div class="broadcast">
                <vue-marquee :duration="600" :interval="1000" v-if="broadList.length">
                  <p v-for="(item,index) in broadList" :key="index">{{item}}</p>
                </vue-marquee>
              </div>
            </div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="rotate_handle()" :style="{transition:rotate_transition_pointer}"></div>
                </div>           
                <div class="wheel-bg">                
                    <div class="prize-list" :style="{transform:rotate_angle,transition:rotate_transition}">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.img">
                            </div>
                            <div class="prize-type">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wheel-light" :class="{'light1': flag == true, 'light2': flag == false}">
                  <img src="../images/home/caidai.png" class="caidai" alt="">   </div> 
            </div>
            <div class="button">
              <div class="toRule btn" @click="toast_control=true;toast_rule=true">活动规则</div>
              <div class="toMyPrize btn">我的奖品</div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control">
          <!-- 规则 -->
          <div class="toast rule" v-show="toast_rule">
            <div class="toast-container">
                <div class="close" @click="toast_control=false;toast_rule=false"></div>
                <div class="toast-content">
                    <h1>亲爱的鱼粉们：这个暑期小鱼带你畅游水乐园!玩赚金币大转盘喽~</h1>
                    <div>
                      <i></i>
                      <p>即日起，通过小鱼优品app完成相应签到等任务，即可赚取相应数额点金币；</p>
                    </div>
                    <div>
                      <i></i>
                      <p>累计每100个点金币即可以换取一次大转盘抽奖。就有机会赢取玛雅水上游乐园或迪斯尼门票。</p>
                    </div>
                    <p class="tip">抽奖次数无上限，玩赚金币大转盘</p>
                </div>
            </div>
          </div>
          <!-- 我的奖品列表 -->
          <div class="toast prizeList">
            <div class="toast-container">
              <div class="close"></div>
                <div class="toast-content">
                  <h3>暂无中奖纪录~</h3>
                  <ul></ul>
                </div>
            </div>
          </div>
          <!-- 奖品 -->
          <div class="toast prize" v-show="toast_prize">
            <div class="toast-container">
              <div class="close" @click="toast_control=false;toast_prize=false"></div>
                <div class="toast-content">
                  <div class="title">获得50金币</div>
                  <img src="../images/home/50jinbi.png" alt="">
                  <p>50金币已放入您的账户中，</p>
                  <p>您可在“我的奖品”中查看您的全部中奖纪录。</p>
                  <div class="button" @click="toast_control=false;toast_prize=false">确定</div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import Marquee from "vue-marquee";
export default {
  data() {
    return {
      flag: false, // 跑马灯
      lottery_ticket: 0, //抽奖次数
      toast_control: false, //抽奖结果弹出框控制器
      toast_rule: false, // 规则弹框
      toast_prize: false, // 中奖弹框
      toast_noPrize: false,
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      broadList: [
        "18:06:51 尾号2276 获得 5元还款抵扣券",
        "07:00:23 尾号6994 获得10元储值卡",
        "04:45:23 尾号8294 获得玛雅水上乐园门票",
        "10:17:16 尾号0232 获得 5元满减券",
        "18:08:32 尾号2401 获得 5元还款抵扣券",
        "05:57:01 尾号2061 获得10元储值卡",
        "02:39:02 尾号2194 获得 5元满减券",
        "01:31:28 尾号0432 获得 5元还款抵扣券"
      ], // 轮播列表
      prize_list: [
        {
          img: require("../images/home/5yuan.png"),
          position: "1",
          title: "还款抵扣"
        },
        {
          img: require("../images/home/yama.png"),
          position: "2",
          title: "玛雅乐园"
        },
        {
          img: require("../images/home/no_prize.png"),
          position: "3",
          title: "擦肩而过"
        },
        {
          img: require("../images/home/50jinbi.png"),
          position: "4",
          title: "金币(个)"
        },
        {
          img: require("../images/home/disney.png"),
          position: "5",
          title: "迪士尼"
        },
        {
          img: require("../images/home/disney.png"),
          position: "6",
          title: "满减券"
        },
        {
          img: require("../images/home/10yuan.png"),
          position: "7",
          title: "储值卡"
        },
        {
          img: require("../images/home/1000jinbi.png"),
          position: "8",
          title: "金币(个)"
        }
      ], // 转盘列表
    };
  },
  created() {
    setInterval(() => {
      this.blink();
    }, 600);
  },
  methods: {
    // 时间戳处理
    timestampToTime(time) {
      var date = new Date(time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear();
      var M =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      var D = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      var h = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      var m =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      var s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return Y + "-" + M + "-" + D + "  " + h + ":" + m + ":" + s;
    },
    //此方法为处理奖品数
    rotate_handle() { 
      this.rotating(3, 50)  
    },
    rotating(index, prize_coin) {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = index || random; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        // 转动指针
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over(index, prize_coin);
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over(index, prize_coin) {
        this.toast_control = true;
        this.toast_prize = true;
    },
    blink() {
      this.flag = !this.flag;
    }

  },
  components: {
    "vue-marquee": Marquee
  }
};
</script>
<style lang="less" scoped>
@import "./luckywheel.less";
</style>

