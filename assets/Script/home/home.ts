// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let ws = new WebSocket("ws://localhost:3000");
    ws.onopen = (res) => {
      console.log("on open", res);
    };
    ws.onmessage = (res) => {
      console.log("on message", res);
    };
    ws.onerror = (res) => {
      console.log("on error", res);
    };
  }

  start() {}

  // update (dt) {}
}
