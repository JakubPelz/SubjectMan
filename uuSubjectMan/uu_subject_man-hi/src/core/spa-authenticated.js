//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import subjectManInstanceContext from "../bricks/subjectMan-instance-context.js";
import SubjectManInstanceProvider from "../bricks/subjectMan-instance-provider.js";

import Config from "./config/config.js";

import SpaReady from "./spa-ready.js";
//@@viewOff:imports

const SpaAuthenticated = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <SubjectManInstanceProvider>
        <subjectManInstanceContext.Consumer>
          {({ state, errorData }) => {
            switch (state) {
              case "pending":
              case "pendingNoData":
                return <UU5.Bricks.Loading />;
              case "error":
              case "errorNoData":
                return <UU5.Bricks.Error error={errorData.error} />;
              case "ready":
              case "readyNoData":
              default:
                return <SpaReady />;
            }
          }}
        </subjectManInstanceContext.Consumer>
      </SubjectManInstanceProvider>
    );
    //@@viewOff:render
  }
});

export default SpaAuthenticated;