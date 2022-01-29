//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import SubjectManInstanceProvider from "../bricks/subjectMan-instance-provider"
import SubjectManInstanceContext from "../bricks/subjectMan-instance-context";

import Config from "./config/config";
import Left from "./left";
import Bottom from "./bottom";
import Home from "../routes/home";

import StudyProgrammeRoute from "../routes/StudyProgramme/studyProgramme-route";
import StudyProgrammeDetail from "../routes/StudyProgramme/studyProgramme-datail-route"
import SubjectsRoute from "../routes/Subjects/subjects-route";
import SubjectsDetailRoute from "../routes/Subjects/subjects-datail-route";


//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SpaReady",
  //@@viewOff:statics
};

const About = UU5.Common.Component.lazy(() => import("../routes/about"));
const InitAppWorkspace = UU5.Common.Component.lazy(() => import("../routes/init-app-workspace"));
const ControlPanel = UU5.Common.Component.lazy(() => import("../routes/control-panel"));

const DEFAULT_USE_CASE = "home";
const ROUTES = {
  "": DEFAULT_USE_CASE,
  home: { component: <Home /> },
  studyProgrammes: { component: <StudyProgrammeRoute /> },
  studyProgrammeDetail: { component: <StudyProgrammeDetail />, params: { id: "" } },
  subjectsList: { component: <SubjectsRoute /> },
  subjectDetail: { component: <SubjectsDetailRoute /> },
  about: { component: <About /> },
  "sys/uuAppWorkspace/initUve": { component: <InitAppWorkspace /> },
  controlPanel: { component: <ControlPanel /> },
};

export const SpaReady = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let [initialActiveItemId] = useState(() => {
      let url = UU5.Common.Url.parse(window.location.href);
      return url.useCase || DEFAULT_USE_CASE;
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (

          <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
            <Plus4U5.App.Page
              {...props}
              top={<Plus4U5.App.TopBt />}
              topFixed="smart"
              bottom={<Bottom />}
              type={3}
              displayedLanguages={["cs", "en"]}
              left={<Left />}
              leftWidth="!xs-300px !s-300px !m-288px !l-288px !xl-288px"
              leftFixed
              leftRelative="m l xl"
              leftResizable="m l xl"
              leftResizableMinWidth={220}
              leftResizableMaxWidth={500}
              isLeftOpen="m l xl"
              showLeftToggleButton
              fullPage
              
            >
              <Plus4U5.App.MenuConsumer>
                {({ setActiveItemId }) => {
                  let handleRouteChanged = ({ useCase, parameters }) => setActiveItemId(useCase || DEFAULT_USE_CASE);
                  return <UU5.Common.Router routes={ROUTES} controlled={false} onRouteChanged={handleRouteChanged} />;
                }}
              </Plus4U5.App.MenuConsumer>
            </Plus4U5.App.Page>
          </Plus4U5.App.MenuProvider>

    );
    //@@viewOff:render
  },
});

export default SpaReady;
