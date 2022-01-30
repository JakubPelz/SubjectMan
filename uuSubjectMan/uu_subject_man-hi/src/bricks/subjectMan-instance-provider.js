//@@viewOn:imports
import { createComponent, useDataObject, useSession } from "uu5g04-hooks";
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
    const session = useSession();
    console.debug(session.session.isAuthenticated());
    const state = useDataObject({
      handlerMap: {
        load: handleLoad
      }
    });
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleLoad() {
        if (session.session.isAuthenticated()){
        const dtoOut = await Calls.loadStudyProgrammeInstance();
        console.debug(dtoOut.authorizedProfiles);

        if(dtoOut.authorizedProfiles)
          return { authorizedProfiles: dtoOut.authorizedProfiles };
        else
          return { authorizedProfiles: [] };
      }
      else
        return { authorizedProfiles: [] };
    }
    //@@viewOff:private

    //@@viewOn:render
    return <SubjectManInstanceContext.Provider value={state}>{children}</SubjectManInstanceContext.Provider>;
    //@@viewOff:render
  }
});

export default SubjectManInstanceProvider;