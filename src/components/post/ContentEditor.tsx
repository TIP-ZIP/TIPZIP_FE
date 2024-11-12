import React from 'react';
import ReactQuill from 'react-quill';
import { QuillWrapper } from './ContentEditor.Styled';
import 'react-quill/dist/quill.snow.css';

interface ContentEditorProps {
    content: string;
    setContent: (content: string) => void;
}

const modules = {
    toolbar: {
        container: [
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        ],
    },
};

const ContentEditor: React.FC<ContentEditorProps> = ({ content, setContent }) => {
    return (
        <QuillWrapper>
        <ReactQuill
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="~하게 작성하세요"
        />
        </QuillWrapper>
    );
};

export default ContentEditor;
