/**
 * 棋子移动规则
 */
import play_config from "./chess_config";
export default {
  checkPiecesMove(o, n, boardPoint) {
    this.boardPoint = boardPoint;
    // return this[`checkMovef`](o, n);
    return this[`checkMove${o.pieces.qt}`](o, n);
  },
  /**
   * 兵卒规则
   * @param o
   * @param n
   */
  checkMoveP(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);
    if (absi + absj !== 1) {
      console.log("兵卒走一格");
      return false;
    }
    // 红
    if (player == "R") {
      if (oj > nj) {
        console.log("不能后退");
        return false;
      }
      if (oj < 5 && absi > 0) {
        console.log("没过河不能横着走");

        return false;
      }
    }
    // 黑
    if (player == "B") {
      if (oj < nj) {
        console.log("不能后退");
        return false;
      }
      if (oj > 4 && absi > 0) {
        console.log("没过河不能横着走");

        return false;
      }
    }
    console.log(oi, oj, " ====> ", ni, nj);
    return true;
  },
  /**
   * 炮规则
   * @param o
   * @param n
   */
  checkMoveC(o, n) {
    let player = o.pieces.pt;
    let pieceCount = 0;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);

    if (absi !== 0 && absj !== 0) {
      console.log("炮走直线");
      return false;
    }
    while (true) {
      // 判断走向 横纵 oi=0 纵向走 oj=0 横向走
      oi = absi == 0 ? oi : ni > oi ? ++oi : --oi;
      oj = absj == 0 ? oj : nj > oj ? ++oj : --oj;
      if (oi == ni && oj == nj) break;
      if (this.boardPoint[oj][oi]) ++pieceCount;
    }
    console.log(oi, oj, " ====> ", ni, nj);
    return n.pieces ? pieceCount == 1 : pieceCount == 0;
  },
  /**
   * 車规则
   * @param o
   * @param n
   */
  checkMoveR(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);

    if (absi !== 0 && absj !== 0) {
      console.log("車走直线");
      return false;
    }
    while (true) {
      // 判断走向 横纵 oi=0 纵向走 oj=0 横向走
      oi = absi == 0 ? oi : ni > oi ? ++oi : --oi;
      oj = absj == 0 ? oj : nj > oj ? ++oj : --oj;
      if (oi == ni && oj == nj) break;
      if (this.boardPoint[oj][oi]) return false;
    }
    console.log(oi, oj, " ====> ", ni, nj);
    return true;
  },
  /**
   * 马规则
   * @param o
   * @param n
   */
  checkMoveN(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);
    if (absi + absj !== 3 || (absj !== 2 && absi !== 2)) {
      console.log("马走日");
      return false;
    }
    // 蹩脚
    let newAbsi = (oi - ni) / 2;
    let newAbsj = (oj - nj) / 2;
    if (Math.abs(newAbsi) < 1) newAbsi = 0;
    if (Math.abs(newAbsj) < 1) newAbsj = 0;
    console.log("蹩脚位置", Math.abs(oi - newAbsi), Math.abs(oj - newAbsj));
    if (this.boardPoint[Math.abs(oj - newAbsj)][Math.abs(oi - newAbsi)]) {
      console.log("蹩脚马");
      return false;
    }
    console.log(oi, oj, " ====> ", ni, nj);
    return true;
  },
  /**
   * 象相规则
   * @param o
   * @param n
   */
  checkMoveB(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);
    console.log(oi, oj, " ====> ", ni, nj);
  },
  /**
   * 士仕规则
   * @param o
   * @param n
   */
  checkMoveA(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);
    console.log(oi, oj, " ====> ", ni, nj);
  },
  /**
   * 将帅规则
   * @param o
   * @param n
   */
  checkMoveK(o, n) {
    let player = o.pieces.pt;
    let { oi, oj, ni, nj, absi, absj } = this.getXY(o, n);
    console.log(oi, oj, " ====> ", ni, nj);
  },
  getXY(o, n) {
    // 获取棋子坐标
    let oi = o.pos[0];
    let oj = o.pos[1];
    let ni = n.pos[0];
    let nj = n.pos[1];
    // 绝对值 判断走了多少格
    let absi = Math.abs(oi - ni);
    let absj = Math.abs(oj - nj);

    return { oi, oj, ni, nj, absi, absj };
  },
};
