import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  resources,
  SpriteFrame,
  ImageAsset,
  Sprite,
} from "cc";
import play_config from "./chess_config";
const { ccclass, property } = _decorator;
let QT = play_config.chessType;
let PT = play_config.playerType;
let arrMapPR = [
  // 红子
  { name: QT.R, team: PT.R, initPos: [1, 1] },
  { name: QT.R, team: PT.R, initPos: [9, 1] },
  { name: QT.N, team: PT.R, initPos: [2, 1] },
  { name: QT.N, team: PT.R, initPos: [8, 1] },
  { name: QT.B, team: PT.R, initPos: [3, 1] },
  { name: QT.B, team: PT.R, initPos: [7, 1] },
  { name: QT.A, team: PT.R, initPos: [4, 1] },
  { name: QT.A, team: PT.R, initPos: [6, 1] },
  { name: QT.K, team: PT.R, initPos: [5, 1] },

  { name: QT.C, team: PT.R, initPos: [2, 3] },
  { name: QT.C, team: PT.R, initPos: [8, 3] },

  { name: QT.P, team: PT.R, initPos: [1, 4] },
  { name: QT.P, team: PT.R, initPos: [3, 4] },
  { name: QT.P, team: PT.R, initPos: [5, 4] },
  { name: QT.P, team: PT.R, initPos: [7, 4] },
  { name: QT.P, team: PT.R, initPos: [9, 4] },

  // 黑子
  { name: QT.R, team: PT.B, initPos: [1, 10] },
  { name: QT.R, team: PT.B, initPos: [9, 10] },
  { name: QT.N, team: PT.B, initPos: [2, 10] },
  { name: QT.N, team: PT.B, initPos: [8, 10] },
  { name: QT.B, team: PT.B, initPos: [3, 10] },
  { name: QT.B, team: PT.B, initPos: [7, 10] },
  { name: QT.A, team: PT.B, initPos: [4, 10] },
  { name: QT.A, team: PT.B, initPos: [6, 10] },
  { name: QT.K, team: PT.B, initPos: [5, 10] },

  { name: QT.C, team: PT.B, initPos: [2, 8] },
  { name: QT.C, team: PT.B, initPos: [8, 8] },

  { name: QT.P, team: PT.B, initPos: [1, 7] },
  { name: QT.P, team: PT.B, initPos: [3, 7] },
  { name: QT.P, team: PT.B, initPos: [5, 7] },
  { name: QT.P, team: PT.B, initPos: [7, 7] },
  { name: QT.P, team: PT.B, initPos: [9, 7] },
];
// let arrMapPB = [
//   // 红子
//   { name: QT.R, team: PT.B, initPos: [1, 1] },
//   { name: QT.R, team: PT.B, initPos: [9, 1] },
//   { name: QT.N, team: PT.B, initPos: [2, 1] },
//   { name: QT.N, team: PT.B, initPos: [8, 1] },
//   { name: QT.B, team: PT.B, initPos: [3, 1] },
//   { name: QT.B, team: PT.B, initPos: [7, 1] },
//   { name: QT.A, team: PT.B, initPos: [4, 1] },
//   { name: QT.A, team: PT.B, initPos: [6, 1] },
//   { name: QT.K, team: PT.B, initPos: [5, 1] },

//   { name: QT.C, team: PT.B, initPos: [2, 3] },
//   { name: QT.C, team: PT.B, initPos: [8, 3] },

//   { name: QT.P, team: PT.B, initPos: [1, 4] },
//   { name: QT.P, team: PT.B, initPos: [3, 4] },
//   { name: QT.P, team: PT.B, initPos: [5, 4] },
//   { name: QT.P, team: PT.B, initPos: [7, 4] },
//   { name: QT.P, team: PT.B, initPos: [9, 4] },

//   // 黑子
//   { name: QT.R, team: PT.R, initPos: [1, 10] },
//   { name: QT.R, team: PT.R, initPos: [9, 10] },
//   { name: QT.N, team: PT.R, initPos: [2, 10] },
//   { name: QT.N, team: PT.R, initPos: [8, 10] },
//   { name: QT.B, team: PT.R, initPos: [3, 10] },
//   { name: QT.B, team: PT.R, initPos: [7, 10] },
//   { name: QT.A, team: PT.R, initPos: [4, 10] },
//   { name: QT.A, team: PT.R, initPos: [6, 10] },
//   { name: QT.K, team: PT.R, initPos: [5, 10] },

//   { name: QT.C, team: PT.R, initPos: [2, 8] },
//   { name: QT.C, team: PT.R, initPos: [8, 8] },

//   { name: QT.P, team: PT.R, initPos: [1, 7] },
//   { name: QT.P, team: PT.R, initPos: [3, 7] },
//   { name: QT.P, team: PT.R, initPos: [5, 7] },
//   { name: QT.P, team: PT.R, initPos: [7, 7] },
//   { name: QT.P, team: PT.R, initPos: [9, 7] },
// ];
@ccclass("board")
export class Chessboard extends Component {
  @property(Prefab)
  public pieces: Prefab;
  @property(Node)
  public mainNode: Node;
  @property(Prefab)
  public point: Prefab;
  private playType: string = PT.R;
  // 棋子宽度
  private QW = 64;
  private pointMap = [];
  onLoad() {
    // 初始化棋盘
    // this.initChessMap();
    for (let i = 0; i < arrMapPR.length; i++) {
      this.initPieces(arrMapPR[i]);
    }
    this.initPoint();
  }

  start() {
    // [3]
  }
  // pt: team
  // qt: name
  // 初始化棋盘
  initPieces(pieces) {
    let node: Node = instantiate(this.pieces);
    node.position.x = (pieces.initPos[0] - 1) * this.QW;
    node.position.y = (pieces.initPos[1] - 1) * this.QW;
    if (this.playType === PT.B) {
      this.mainNode.angle = 180;
      console.log(this.mainNode);
      this.mainNode.position.x = 256;
      this.mainNode.position.y = 289;
      node.angle = 180;
    } else {
      this.mainNode.angle = 0;
    }
    let pieces_img = `pieces/${pieces.team}${pieces.name}`;
    resources.load(pieces_img, ImageAsset, (err: any, imageAsset) => {
      if (!err) {
        const sprite = node.getComponent(Sprite);
        sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset);
        this.mainNode.addChild(node);
      }
    });
    // node.on(Node.EventType.MOUSE_DOWN, this.onTouchEnd, this);
  }
  // 初始化
  initPoint() {
    // let;
    for (let j = 0; j < 10; j++) {
      this.pointMap[j] = [];
      for (let i = 0; i < 9; i++) {
        this.pointMap[j].push(0);
        console.log(i, j);
      }
    }
    console.log(this.pointMap);
  }
  onTouchEnd(e) {
    console.log(e.target);
    console.log([e.target.position.x, e.target.position.y]);
  }
}
