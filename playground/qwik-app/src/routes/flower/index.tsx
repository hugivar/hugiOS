import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import styles from './flower.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    count: 0,
    number: 20,
  });

  return (
    <>
      <input
        type="range"
        value={state.number}
        max={50}
        onInput$={(ev) => {
          state.number = (ev.target as HTMLInputElement).valueAsNumber;
        }}
      />
      <div
        style={{
          '--state': `${state.count * 0.1}`,
        }}
        class={{
          host: true
        }}
      >
        {Array.from({ length: state.number }, (_, i) => (
          <div
            key={i}
            class={{
              square: true,
              odd: i % 2 === 0,
            }}
            style={{ '--index': `${i + 1}` }}
          />
        )).reverse()}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
