import '../../css/styles.scss';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { useEffect } from 'react';

type ContentFn = (s: string) => void;

type Props = {
    content: string;
    setContent: ContentFn;
    editorRef?: (editor: Editor) => void;
};

export default ({ content = '', setContent, editorRef }: Props) => {
    useEffect(() => {
        if (editor && editorRef) {
            editorRef(editor);
        }
    });

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Heading.configure({
                levels: [1, 2, 3],
            }),
        ],
        content: content,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="control-group relative bottom-5">
                <div className="button-group">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const content = document.querySelector('.tiptap');
                            console.log(content);
                            editor.chain().focus().toggleBold().run();
                        }}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const content = document.querySelector('.tiptap');
                            console.log(content);
                            editor.chain().focus().toggleItalic().run();
                        }}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleHeading({ level: 1 }).run();
                        }}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleHeading({ level: 2 }).run();
                        }}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            editor.chain().focus().toggleHeading({ level: 3 }).run();
                        }}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        H3
                    </button>
                </div>
            </div>
            <EditorContent editor={editor} />
        </>
    );
};
