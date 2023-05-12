// 定義表示記分牌的類
class ScorePanel {

    // score 和 level 用來記錄分數和等級
    score = 0;
    level = 1;

    // 分數和等級所在的元素，在構造函數中進行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(public maxLevel: number = 10, public upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }
    // 設置一個加分的方法
    addScore() {
        // 分數自增
        this.scoreEle.innerHTML = ++this.score + '';
        // 判斷分數是多少來判斷是否升級
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    // 提升等級的方法
    levelUp() {
        // 等級自增
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
} 

export default ScorePanel;