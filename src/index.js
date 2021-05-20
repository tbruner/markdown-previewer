import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'
let marked = require("marked");

const renderer = new marked.Renderer();

const placeholder = `# Heading
## sub-heading

---

some text

a paragraph

> block quote

**bold**
*italic*
***bold and italic!!!***

Here's some code:
\`\`\`
you = input()
def hello(name):
  print("hello {}".format(name))
hello(you)
\`\`\`
my web page [Trevor](https://tbruner.github.io)

Numbered List:
1. Number one
2. Number two
3. Number three

Embedded image:

![React Logo](logo512.png)
`

const Editor = (props) => (
    <textarea
      type = "text"
      id = "editor"
      onChange = {props.onChange}
      value = {props.markdown}
    />
)
const Preview = (props) => (
    <div
      id = "preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, {renderer: renderer})
      }}
    />
)

const Toolbar = (props) => (
  <div className = "toolbar text-left">{props.text}</div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }

  render() {
    return(
      <div>
        <div className = "mt-4 text-center">
            <h1 id = "title">Markdown Previewer</h1>
        </div>
        <div className = "container-fluid">
          <div className = "row mt-4">
            <div className = "col-sm-6 text-center">
              <Toolbar text = "Editor"></Toolbar>
              <Editor
                markdown = {this.state.markdown} 
                onChange = {this.handleChange}
              />
            </div>
            <div className = "col-sm-6 flex justify-content-center">
              <Toolbar text = "Preview"></Toolbar>
              <Preview
                markdown = {this.state.markdown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);