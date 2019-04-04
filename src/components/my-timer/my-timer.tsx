import { Component, State } from '@stencil/core';
 import { setCookie,getCookie,getMyTimes } from '../../utils/utils';
 let agearray:object={
  'a0':'刚来到地球，你要做的是慢慢感知这个地球',
  'a1':'现在你应该开始学习了，应对各种技能考试',
  'a2':'通过各种技能检验，你也找到了你的方向',
  'a3':'这个阶段的你正在验证你的方向是否正确，不要灰心',
  'a4':'现在你深刻了解了你的任务和责任，还需要继续努力',
  'a5':'下一代已经长大了，你可以安排他们去做一些事情了，帮助你完成任务',
  'a6':'任务是不是差不多完成了？可以去做真真自己的事情了，例如去周游地球',
  'a7':'你要给下一代做一个导师，让他们少走一些弯路',
  'a8':'你这个导师合格吗？',
  'a9':'把你的故事讲给下下代听吧',
  'a10':'。。。',
}
@Component({
  tag: 'my-timer',
  styleUrl: 'my-timer.styl',
  shadow:true
})

export class CustomTimer {
 
  timer: number;
 
  @State() time: number = Date.now();
  borthTimeEl:HTMLInputElement
  typeEl:HTMLSelectElement
  timerEl:HTMLSelectElement
  @State() borthTime:number
  list:Array<String> = ['以年显示','以月显示','以天显示','以时显示','以分显示','以秒显示']
  nowTimes:number = +new Date() / 1000
  nowyearTimes:number = (new Date()).getFullYear()
  // lowerYearTime:number = this.nowyearTimes-80
  @State() showTimes:string=''
  @State() seek:number=1
  youYear:number
  yourAge:number
  youEndTime:Date
  typesarray:Array<string>=['y','M','d','h','m','s']
  @State() types:number = 0
  componentWillLoad() {
    let borthTime = getCookie('borthTime');
    let types = getCookie('types');
    if(borthTime){
      this.initE(borthTime)
      this.types = +types
    }
  }
  private initE(borthTime){
    this.borthTime = +borthTime
    let yourAge = new Date(+borthTime*1000)
    this.youEndTime = new Date(`${yourAge.getFullYear()+100}-${yourAge.getMonth()+1}-${yourAge.getDate()}`)
    this.nowTimes = +new Date() / 1000
    this.strtTime()
  }
  componentDidLoad() {
   
  }
  private strtTime(){
    this.timer = window.setInterval(() => {
    this.yourAge = (new Date(this.nowTimes*1000)).getFullYear()- new Date(+this.borthTime*1000).getFullYear()
      this.showTimes = getMyTimes(this.nowTimes+=this.seek,+this.youEndTime/1000,this.typesarray[this.types]);
      if(this.nowTimes>(+this.youEndTime/1000)){
        this.stopTime()
      }
    }, 1000);
  }
  private stopTime(){
    if(this.timer){
      clearTimeout(this.timer)
      this.timer = 0
    }
  }
  componentDidUnload() {
    this.stopTime()
  }
  private selectChange(){
    // console.log(this.typeEl.value)
    this.types = +this.typeEl.value
    setCookie('types',this.types.toString());
  }
  private selectBothtime(){
    if(this.borthTimeEl.value){
      if((new Date(this.borthTimeEl.value)).getFullYear()<this.nowyearTimes-80){
        alert('请选择大于'+(this.nowyearTimes-80)+'的年份')
        return false
      }
      if((new Date(this.borthTimeEl.value)).getFullYear()>=this.nowyearTimes){
        alert('请选择小于'+this.nowyearTimes+'的年份')
        return false
      }
      console.log(this.borthTimeEl.value)
      this.initE(+new Date(this.borthTimeEl.value) / 1000)
      setCookie('borthTime',this.borthTime.toString())
    }
  }
  private switchOther(){
    this.stopTime()
    this.borthTime=0
  }
  private getTextForAge(){
    return agearray['a'+(this.yourAge/10).toFixed(0)]
  }
  private selectTimerChange(){
     // console.log(this.typeEl.value)
     this.seek = [1,60*60,60*60*24,60*60*24*30,60*60*24*365][+this.timerEl.value]
     
  }
  render() {
    // let time = new Date(this.time).toLocaleTimeString();
    let text =this.getTextForAge()
    return (
     <div class='timer-root'>
        <p class='times'>时间一去不复返,把握现在</p>
        <div class= {this.borthTime?"hide input-info":"show input-info"}>
          <h1>请选择您的出生日期</h1>
          <input  ref={(el:HTMLInputElement)=>this.borthTimeEl=el} type="date"/>
          <button onClick={this.selectBothtime.bind(this)}>确定</button>
        </div>
        <div class= {!this.borthTime?"hide row":"show row"} >
          <div class='info'>
            {text}
            <br/>
            <br/>
            距离离开还有
          </div>
          <div class=" timer">
            <span class={this.showTimes.includes('你来地')?'none':''}>{ this.showTimes }</span>
          </div>
          <div class="select ">
            <p class='times s-i'>时间显示</p>
            <select ref={(el:HTMLSelectElement)=>this.typeEl=el} onChange={this.selectChange.bind(this)} name="" id="">
              {this.list.map((v,i)=>
                <option selected={i==this.types} value={i}>{v}</option>
              )}
            </select>
            <p class='times s-i'>时间加速器</p>
            <select ref={(el:HTMLSelectElement)=>this.timerEl=el} onChange={this.selectTimerChange.bind(this)} name="" id="">
              {['秒','时','天','月','年'].map((v,i)=>
                <option  value={i}>{v}</option>
              )}
            </select>
            <span onClick={this.switchOther.bind(this)} class='times'>查看他人离开时间</span>
          </div>
        </div>
     </div>
    );
  }
}
