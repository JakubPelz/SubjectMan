//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import SubjectManInstanceContext from "./subjectMan-instance-context";
//@@viewOff:imports

const SubjectManInstanceProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeInstanceProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    const state = useDataObject({
      handlerMap: {
        load: handleLoad
      }
    });
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleLoad() {
      const dtoOut = await Calls.loadStudyProgrammeInstance();
      console.debug(dtoOut);
      return { ...dtoOut.data };
    }
    //@@viewOff:private

    //@@viewOn:render
    return <SubjectManInstanceContext.Provider value={state}>{children}</SubjectManInstanceContext.Provider>;
    //@@viewOff:render
  }
});

export default SubjectManInstanceProvider;