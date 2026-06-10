import { calculateBMI,getJudgement } from "./functions.js";
// 【Step 1】 基本的なDOM操作とイベント
// HTMLの要素を取得して、定数に代入しよう
// 例: const heightInput = document.getElementById('height');

// 1.身長の入力欄の要素を取得
const heightInput = document.querySelector('input#height');
// 2.体重の入力欄の要素を取得
const weightInput = document.querySelector('input#weight');
// 3.「計算する」ボタンの要素を取得
const calcBtn = document.querySelector('button#calc-btn');
// 4.計算結果を表示する要素を取得
const bmiResult = document.querySelector('p#bmi-result');
// 計算履歴を表示する要素を取得
const historyList = document.querySelector('ul#history-list');

// 【Todo】関数の定義

// 履歴一覧を描画する関数
const renderHistory = () => {
    historyList.innerHTML = '';
    historyData.forEach((history) => {
        const liElm = document.createElement('li');
        liElm.className = 'list-group-item d-flex justify-content-between align-items-center';
        liElm.innerHTML = `<span class="text-muted small">${new Date(history.date).toLocaleString('ja-JP')}</span>
        <span>BMI: ${history.bmi}</span>
        <span>${history.judge}</span>`;
        historyList.appendChild(liElm);
    })
};

// 計算履歴保存用の配列(localStorageからデータを読み込み)
const savedData = localStorage.getItem('bmiHistory');
// 三項(条件)演算子
let historyData = savedData ? JSON.parse(savedData) : [];
// ページを開いたときに履歴を表示
renderHistory();

// 「計算する」ボタンがクリックされたときの処理を追加しよう
// 例: calcBtn.addEventListener('click', () => { ... });
calcBtn.addEventListener('click', () => {
    // calcBtnがクリックされたときに実行したい処理
    // 5. 入力された身長の値を取得
    const heightValue = heightInput.value;
    // 6. 入力された体重の値を取得
    const weightValue = weightInput.value;

    // 追加機能2: 入力値の検証
    // 未入力のチェック
    if (heightValue === '' || weightValue === '') {
        alert('身長と体重を入力してください。');
        return; //プログラムを終了させる
    }
    // 数字かどうかチェック
    if (isNaN(heightValue) || isNaN(weightValue)) {
        alert('身長と体重は半角数字で入力してください。');
        return; //プログラムを終了させる
    }

    // 7. BMIを計算する(体重[kg] ÷ (身長[m] × 身長[m]))
    const bmi = calculateBMI(heightValue, weightValue);
    // 8．計算結果をbmiResultに表示する
    bmiResult.innerText = bmi;

    // 追加機能1: 肥満度の判定
    // 1. 表示領域の要素を取得
    // document.getElementById('ID属性の値');
    const judgeResult = document.getElementById('judgment-result');
    // 3. 判定結果を画面に表示
    const judgeInfo = getJudgement(bmi);
    judgeResult.innerText = judgeInfo;

    // 追加機能3: 計算履歴の表示
    // 1. 履歴のオブジェクトを作る
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const sec = String(today.getSeconds()).padStart(2, '0');
    const newRecord = {
        bmi: bmi,
        judge: judgeInfo,
        date: `${year}-${month}-${date}T${hour}:${min}:${sec}`,
    }
    // 2. 履歴の配列にオブジェクトを入れる
    historyData.unshift(newRecord);
    console.log(historyData);
    // 2-2. historyData配列をbmiHistoryというキーでlocalStorageに保存
    localStorage.setItem('bmiHistory', JSON.stringify(historyData));
    // 3. 履歴一覧を画面に表示する
    renderHistory();
});


