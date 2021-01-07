import * as React from 'react';

//import './styles.scss';

import Editor from '@monaco-editor/react'

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <Editor height="900px" language="typescript"  value="console.log('hello')"/>
      <h3>End of page</h3>
    </section>
  );
};

export default Popup;
