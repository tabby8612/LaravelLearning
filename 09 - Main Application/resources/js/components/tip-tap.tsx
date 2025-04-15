import '../../css/styles.scss';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';

export default () => {
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
        content: `
        <p>This isn’t bold.</p>
        <p><strong>This is bold.</strong></p>
        <p><b>And this.</b></p>
        <p style="font-weight: bold">This as well.</p>
        <p style="font-weight: bolder">Oh, and this!</p>
        <p style="font-weight: 500">Cool, isn’t it!?</p>
        <p style="font-weight: 999">Up to font weight 999!!!</p>
      `,
    });

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="control-group">
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
