// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import play_config from "./chess_config";
import rule from "./rule";
let QT = play_config.chessType;
let PT = play_config.playerType;

let arrMap = [
  // 红子
  { qt: QT.R, pt: PT.R, initPos: [1, 1] },
  { qt: QT.R, pt: PT.R, initPos: [9, 1] },
  { qt: QT.N, pt: PT.R, initPos: [2, 1] },
  { qt: QT.N, pt: PT.R, initPos: [8, 1] },
  { qt: QT.B, pt: PT.R, initPos: [3, 1] },
  { qt: QT.B, pt: PT.R, initPos: [7, 1] },
  { qt: QT.A, pt: PT.R, initPos: [4, 1] },
  { qt: QT.A, pt: PT.R, initPos: [6, 1] },
  { qt: QT.K, pt: PT.R, initPos: [5, 1] },

  { qt: QT.C, pt: PT.R, initPos: [2, 3] },
  { qt: QT.C, pt: PT.R, initPos: [8, 3] },

  { qt: QT.P, pt: PT.R, initPos: [1, 4] },
  { qt: QT.P, pt: PT.R, initPos: [3, 4] },
  { qt: QT.P, pt: PT.R, initPos: [5, 4] },
  { qt: QT.P, pt: PT.R, initPos: [7, 4] },
  { qt: QT.P, pt: PT.R, initPos: [9, 4] },

  // 黑子
  { qt: QT.R, pt: PT.B, initPos: [1, 10] },
  { qt: QT.R, pt: PT.B, initPos: [9, 10] },
  { qt: QT.N, pt: PT.B, initPos: [2, 10] },
  { qt: QT.N, pt: PT.B, initPos: [8, 10] },
  { qt: QT.B, pt: PT.B, initPos: [3, 10] },
  { qt: QT.B, pt: PT.B, initPos: [7, 10] },
  { qt: QT.A, pt: PT.B, initPos: [4, 10] },
  { qt: QT.A, pt: PT.B, initPos: [6, 10] },
  { qt: QT.K, pt: PT.B, initPos: [5, 10] },

  { qt: QT.C, pt: PT.B, initPos: [2, 8] },
  { qt: QT.C, pt: PT.B, initPos: [8, 8] },

  { qt: QT.P, pt: PT.B, initPos: [1, 7] },
  { qt: QT.P, pt: PT.B, initPos: [3, 7] },
  { qt: QT.P, pt: PT.B, initPos: [5, 7] },
  { qt: QT.P, pt: PT.B, initPos: [7, 7] },
  { qt: QT.P, pt: PT.B, initPos: [9, 7] },
];

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  pieces: cc.Prefab = null;
  @property(cc.Prefab)
  point: cc.Prefab = null;
  @property(cc.Node)
  mainNode: cc.Node = null;

  @property(cc.Node)
  BSNode: cc.Node = null;

  @property(cc.Node)
  RSNode: cc.Node = null;
  @property(cc.Node)
  deadNode: cc.Node = null;
  @property(cc.Button)
  backButton: cc.Button = null;

  private playType = PT.R;
  private QW = 64;
  private boardPoint = [];
  private selectData = null;
  private moveArray = []; // 存放移动轨迹
  onLoad() {
    if (this.playType === PT.B) {
      this.mainNode.angle = 180;
      this.mainNode.x = 256;
      this.mainNode.y = 289;
    } else {
      this.mainNode.angle = 0;
    }
    this.deadNode.angle = 180;
    this.initPieces();
    this.initPoint();

    this.backButton.node.on("click", this.onclickBackButton, this);

    console.log(this.boardPoint);
  }

  initPieces() {
    for (let i = 0; i < arrMap.length; i++) {
      this.createPieces(arrMap[i]);
    }
  }
  createPieces(pieces) {
    let node = cc.instantiate(this.pieces);
    let i = pieces.initPos[0] - 1;
    let j = pieces.initPos[1] - 1;

    node.x = i * this.QW;
    node.y = j * this.QW;
    if (this.playType === PT.B) {
      node.angle = 180;
    }
    let pieces_img = `pieces/${pieces.pt}${pieces.qt}`;
    cc.resources.load(pieces_img, cc.SpriteFrame, (err: any, asset) => {
      if (!err) {
        const sprite = node.getComponent(cc.Sprite);
        sprite.spriteFrame = asset;
        // 添加棋子信息
        node.qt = pieces.qt;
        node.pt = pieces.pt;
        node.initPos = [i, j];
        this.mainNode.addChild(node);
        this.boardPoint[j][i] = node;
      }
    });
  }
  initPoint() {
    for (let i = 0; i < 10; i++) {
      this.boardPoint[i] = [];
      for (let j = 0; j < 9; j++) {
        this.boardPoint[i].push(0);
        let node = cc.instantiate(this.point);
        if (this.playType === PT.B) {
          this.mainNode.angle = 180;
          this.mainNode.x = 256;
          this.mainNode.y = 289;
          node.angle = 180;
        } else {
          this.mainNode.angle = 0;
        }
        node.x = j * this.QW;
        node.y = i * this.QW;
        node.curPos = [j, i];
        this.mainNode.addChild(node);
        node.on(cc.Node.EventType.MOUSE_DOWN, this.onTouchEnd, this);
      }
    }
  }
  start() {}
  // 触摸结束事件
  onTouchEnd(e) {
    let i = e.target.curPos[0];
    let j = e.target.curPos[1];
    let item = this.boardPoint[j][i];
    // 数据更新
    let oldData = this.selectData;
    let newData = {
      pos: e.target.curPos,
      pieces: item,
    };
    // 条件判断
    if (oldData && oldData.pos === newData.pos) {
      this.setBSNode();
      this.selectData = null;
      return;
    }
    if (item) {
      if (!oldData || oldData.pieces.pt === newData.pieces.pt) {
        this.selectData = newData;
        this.setBSNode({ i, j });
        return;
      }
    }
    this.movePieces(oldData, newData);
  }
  setBSNode(pos = null) {
    this.BSNode.active = !!pos;
    // 显示位置
    if (!!pos) {
      this.BSNode.x = pos.i * this.QW;
      this.BSNode.y = pos.j * this.QW;
    }
  }
  setRSNode(pos = null) {
    this.RSNode.active = !!pos;
    // 显示位置
    if (!!pos) {
      this.RSNode.x = pos.i * this.QW;
      this.RSNode.y = pos.j * this.QW;
    }
  }
  movePieces(oldData, newData) {
    if (!oldData || !oldData.pieces) {
      return;
    }
    if (oldData.pieces) {
      console.log(rule.checkPiecesMove(oldData, newData, this.boardPoint));

      if (!rule.checkPiecesMove(oldData, newData, this.boardPoint)) {
        return;
      }
      let { oi, oj, ni, nj } = rule.getXY(oldData, newData);
      this.setRSNode({ i: ni, j: nj });
      cc.tween(oldData.pieces)
        // 设置位置
        .to(0.3, {
          position: cc.v2(ni * this.QW, nj * this.QW),
        })
        // 清空当前集合
        .call(() => {
          console.log("oldData.pieces", oldData);
          oldData.pieces.zIndex = 0;
          this.setBSNode();
          this.setRSNode();
          this.selectData = null;
          // 棋盘
          if (newData.pieces) {
            console.log(newData);
            // newData.pieces.destroy();
            this.setDeadPieces(newData.pieces);
          }
          // 新的坐标点存放 旧的坐标点清零
          this.boardPoint[nj][ni] = oldData.pieces;
          this.boardPoint[oj][oi] = 0;

          this.moveArray.push({
            oldData,
            newData,
          });
        })
        .start();
    }
    console.log(this.boardPoint);
  }
  onclickBackButton() {
    console.log("悔棋");
    console.log(this.moveArray);
    let len = this.moveArray.length;
    if (!len) return;
    let { oldData, newData } = this.moveArray[len - 1];
    let { oi, oj, ni, nj } = rule.getXY(oldData, newData);
    let oldNode = oldData.pieces;
    let newNode = newData.pieces;

    oldNode.zIndex = 99;

    if (newNode) {
      newNode.parent = this.mainNode;
      newNode.setPosition(cc.v2(ni * this.QW, nj * this.QW));
    } else {
      this.boardPoint[nj][ni] = 0;
    }

    cc.tween(oldNode)
      // 设置位置
      .to(0.3, {
        position: cc.v2(oi * this.QW, oj * this.QW),
      })
      // 清空当前集合
      .call(() => {
        oldData.pieces.zIndex = 0;
        // oldNode.parent = this.deadNode;
        this.boardPoint[oj][oi] = oldNode;
        this.moveArray.splice(len - 1, 1);
      })
      .start();
  }
  setDeadPieces(node) {
    node.parent = this.deadNode;
    node.setPosition(cc.v2(0, 0));
  }
  // update (dt) {}
}
