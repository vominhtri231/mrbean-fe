import {convertFromRaw, EditorState} from "draft-js";

class EditorContentUtils {
  static convertToEditorContent(value) {
    if (!value) return EditorState.createEmpty();
    const convertedState = convertFromRaw(JSON.parse(value))
    return EditorState.createWithContent(convertedState);
  };
}

export default EditorContentUtils;