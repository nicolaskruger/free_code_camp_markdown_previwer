import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import marked from 'marked';

const MODIFY_TEXT = "MODIFY_TEXT";
/**
 * 
 * @param {string} text 
 */
const modifyText = (text) => {
  return {
    type: MODIFY_TEXT,
    text
  }
}
const inithialState = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`

const textReducer = (state = inithialState, action) => {
  switch (action.type) {
    case MODIFY_TEXT:
      return action.text;
    default:
      return state;
  }
}

const store = createStore(textReducer);

const mapStateToProps = (state) => {
  return {
    text: state
  }
}
const mapDispatchToProps = (dispatch) => ({
  newText: (text)  => {
    dispatch(modifyText(text))
  }
})

let MarkdownEditor = ({text,newText}) => {
  return (
    <textarea 
    id="editor"
    onChange={e => newText(e.target.value)}
    >
      {text}
    </textarea>
  )
}

MarkdownEditor = connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
let MarkdownView = ({text}) => {
  const getMarkdownText= ()=> {
    var rawMarkup = marked(text, {sanitize: true});
    return { __html: rawMarkup };
  }
  return (
    <div id="preview" dangerouslySetInnerHTML={getMarkdownText()} />
  )
}
MarkdownView = connect(mapStateToProps, null)(MarkdownView);
const App = () => {
  return (
    <section className="section__app">
        <MarkdownEditor/>
        <MarkdownView/>
    </section>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
