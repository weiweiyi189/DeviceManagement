import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled2905';
  timer: any;
  imgList = [
    {
      icon: 'http://www.gov.cn/xinwen/2022-01/11/5667625/images/331282d29e494c75b5fa4e5bbe9d6ea5.jpg',
      text: '推动完善民企债券融资支持机制',
    },
    {
      icon: 'http://www.gov.cn/xinwen/2022-01/11/5667625/images/189767452a08421d834d8f004e202f95.jpg',
      text: '出台方案深入推进减税降费工作',
    }, {
      icon: 'http://www.gov.cn/xinwen/2022-01/11/5667625/images/5bd4069711074376848ccd524de4f6fb.jpg',
      text: '印发实施意见 改革完善社会救助制度',
    }
  ]; // 图片数组
  img = ''; // 图片路径
  text = ''; // 图片路径
  id = 0; // 默认id 从零开始

  ngOnInit() {
    this.gif();
  }

  gif() {
    // 页面显示 加载默认图片
    this.img = this.imgList[this.id].icon;
    // 设置一个定时器，达到动画切换效果
    this.timer = setInterval(() => {
      // 如果当前图片是最后一张就把id清零 从第一张开始
      if (this.id === this.imgList.length - 1) {
        this.id = 0;
        this.img = this.imgList[this.id].icon;
        this.text = this.imgList[this.id].text;
      } else {
        // 如果当前不是最后一张 就切换下一张
        this.id += 1;
        this.img = this.imgList[this.id].icon;
        this.text = this.imgList[this.id].text;
      }
    }, 1500)
  }

  getData(url:string){
    console.log(url);
  }
}
