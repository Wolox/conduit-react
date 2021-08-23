import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ContentEditor() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={ContentEditor.modules}
      formats={ContentEditor.formats}
    />
  );
}

ContentEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: true
  }
};

ContentEditor.formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link'];

export default ContentEditor;
