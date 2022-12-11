import { _decorator, Component, Node, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Test")
export class Test extends Component {
  @property
  public foo=100;

  private _init = false;

  onLoad() {
    console.log("onLoad");
  }

  onEnable() {
    console.log("onEnable");
  }

  start() {
    // [3]
    this.node.on('touch-start',()=>{
        console.log('success btn');
        director.loadScene('play');
        console.log(222);
        
        
    })
  }
  update(deltaTime: number) {
    // [4]
    if (!this._init) {
      console.log("Update");
    }
  }
  lateUpdate() {
    if (!this._init) {
      console.log("lateUpdate");
      this._init = true;
    }
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
