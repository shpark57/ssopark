import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import {useEffect} from "react";

type Props = {
    editorRef: React.RefObject<Editor> | null;
    content?: string;
};

const toolbar = [['heading', 'bold', 'italic', 'strike'], ['hr', 'quote', 'ul', 'ol'], ['image']];


function TuiEditor({ content, editorRef }: Props) {
    return (
        <Editor
            initialValue={content ?? ' '}
            initialEditType='wysiwyg'
            autofocus={false}
            ref={editorRef}
            toolbarItems={toolbar}
            hideModeSwitch
            height='500px'
        />
    );
}

export default TuiEditor;