import { createSignal, createEffect } from 'solid-js';
import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from "@hugios/solid-ui";

function MyComponent(props: any) {
  return <div>Hello {props.name}</div>
}

const App: Component = () => {
  const [first, setFirst] = createSignal("JSON");
  const [last, setLast] = createSignal("Bourne");

  createEffect(() => console.log(`${first()} ${last()}`));

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <Button>Click Me</Button>
        <MyComponent name="Hugivar" />
      </header>
    </div>
  );
};

export default App;
