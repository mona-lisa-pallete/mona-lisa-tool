import React, { Suspense } from "react";
import { Button } from "antd";

import { DebounceClass } from "../utils";
// import MonacoEditor from "react-monaco-editor";
const MonacoEditor = React.lazy(() => import("react-monaco-editor"));

const debounce = new DebounceClass();

export interface LowCodeEditorProps {
  onSubmit?: (submitOptions: { code: string; json?: {} }) => void;
  defaultValue?: {
    code: string;
  };
  language?: string;
  width?: string | number;
  height?: string | number;
  options?: {};
  notSave?: boolean;
}

export class LowCodeEditor extends React.Component<
  LowCodeEditorProps,
  {
    code: string;
    ready: boolean;
  }
> {
  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    const defCode = defaultValue?.code || "";
    this.state = {
      code: defCode,
      ready: !!defCode,
    };
  }

  async componentDidMount() {
    if (!this.state.code) {
      // const defaultCode = await getDefaultLowcodeSnipet();
      this.setState({
        code: "",
        ready: true,
      });
    }
  }

  onChange = (newValue) => {
    debounce.exec(() => {
      this.setState({
        code: newValue,
      });
    }, 300);
    // console.log("onChange", newValue, e);
  };

  editorWillMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: "JSXAlone.createElement",
    });
  };

  editorDidMount = (editor, monaco) => {
    // editor.setPosition({ column: 1, lineNumber: 3 });
    editor.focus();
  };

  onSubmit = () => {
    const { code } = this.state;
    let json;
    try {
      json = JSON.parse(code);
    } catch (e) {}
    this.props.onSubmit?.({
      code,
      json,
    });
  };

  render() {
    const { code, ready } = this.state;
    const {
      language = "javascript",
      width = "800",
      height = "600",
      options = {
        selectOnLineNumbers: true,
        insertSpaces: false,
        tabSize: 2,
      },
      notSave,
    } = this.props;
    return (
      <Suspense fallback={<div>editor loading</div>}>
        <div className="low-code-editor" id="LowCodeEditorContainer">
          {!notSave && <Button onClick={this.onSubmit}>保存</Button>}
          {ready && (
            <div className="flex">
              <div className="method-selector"></div>
              <div className="">
                <MonacoEditor
                  width={width}
                  height={height}
                  language={language}
                  // theme="vs-dark"
                  value={code}
                  options={options}
                  onChange={this.onChange}
                  editorDidMount={this.editorDidMount}
                  editorWillMount={this.editorWillMount}
                />
              </div>
            </div>
          )}
        </div>
      </Suspense>
    );
  }
}
