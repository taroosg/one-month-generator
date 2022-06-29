import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import styles from './App.module.css';

const [year, setYear] = createSignal((new Date()).getFullYear());
const [month, setMonth] = createSignal((new Date()).getMonth() + 1);

const getLastDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const getDay = (dayNumber: number) => ['日', '月', '火', '水', '木', '金', '土'][dayNumber]

const formatDate = (year: number, month: number, day: number) => `${String(year).padStart(4, '0')}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`
const createDays = (year: number, month: number) => {
  const days = [...new Array(getLastDay(year, month)).keys()]
    .map((x) => x + 1)
    .map((x, i) => `${formatDate(year, month, x)}（${getDay(new Date(`${year}/0${month}/${x}`).getDay())}）`);
  return days;
}

const incrementYear = () => {
  setYear(prev => prev + 1);
}

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>日付を一覧にするやつ</h1>
      </header>
      <main class={styles.main}>
        <div>
          <button type="button" onClick={() => setYear(prev => prev - 1)}>&lt;</button>
          <p>{year()}</p>
          <button type="button" onClick={() => setYear(prev => prev + 1)}>&gt;</button>
        </div>
        <div>
          <button type="button" onClick={() => setMonth(prev => prev === 1 ? 12 : (prev - 1))}>&lt;</button>
          <p>{month()}</p>
          <button type="button" onClick={() => setMonth(prev => prev === 12 ? 1 : (prev + 1))}>&gt;</button>
        </div>
        <textarea readonly name="" id="result" cols="30" rows="10">{createDays(year(), month()).join('\n')}</textarea>
      </main>
    </div>
  );
};

export default App;
