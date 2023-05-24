import { Controller } from "@hotwired/stimulus"
import EditorJS from "@editorjs/editorjs";
import  Paragraph  from "@editorjs/paragraph";
import  Header  from "@editorjs/header";
import  List  from "@editorjs/list";
import  CodeTool  from "@editorjs/code";

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = ["article_content"]
  connect() {
    console.log("Hello Stimulus", this.element)

    const initialContent = this.getInitialContent();

    this.contentEditor = new EditorJS({
      // holder is the target element
      holder: this.article_contentTarget,
      data: initialContent,
      // here we will add all the tools which we are going to use for the form
      tools: {
        header: {
          class: Header,
        },
        list: {
          class: List,
        },
        paragraph: {
          class: Paragraph,
          config: {
            inlineToolbar: true,
          },
        },
        code: CodeTool,
      },
    });

    this.element.addEventListener("submit", this.saveEditorData.bind(this));
  }
  // sets initial data
  getInitialContent() {
    const hiddenContentField = document.getElementById("article_content_hidden");
    if (hiddenContentField && hiddenContentField.value){
      return JSON.parse(hiddenContentField.value);
    }
    return {};
  }

  async saveEditorData(event) {
    event.preventDefault();

    const outputData = await this.contentEditor.save();
    const articleForm = this.element;

    const hiddenInput = document.getElementById("article_content_hidden");
    hiddenInput.value = JSON.stringify(outputData);
    articleForm.submit();
  }
}
