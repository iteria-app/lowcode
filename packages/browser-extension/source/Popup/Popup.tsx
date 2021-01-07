import * as React from 'react';

import './styles.scss';

import Editor from '@monaco-editor/react'

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>Popup</h2>
      <Editor width="300px" height="90vh" language="typescript" />
    </section>
  );
};

export default Popup;
