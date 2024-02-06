import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const EditorComponent = ({ className, setDescription, description, ...rest }) => {

    const jsonData =
        '{"blocks":[{"key":"a1buj","text":"Hello, this is markdown data","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a6avt","text":"This is title","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}';

    const realData = '{"blocks": [], "entityMap":{}}';

    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(description ? description : realData)))
    );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }

    const handleOnChange = (rawDraftContent) => {
        console.log("html", draftToHtml(rawDraftContent))
        setDescription(JSON.stringify(rawDraftContent))
    }

    return (
        <Editor
            editorState={editorState}
            wrapperClassName={`text-black dark:text-white ${className}`}
            editorClassName='border border-gray-500 rounded-lg bg-transparent'
            onEditorStateChange={onEditorStateChange}
            onChange={handleOnChange}
            {...rest}
            toolbar={{
                image: { uploadEnabled: true }
            }}
        />
    )
}

export default EditorComponent