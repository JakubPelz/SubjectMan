//@@viewOn:imports
import UU5 from "uu5g04";
import Lsi from "./subject-list.lsi";

import { createComponent, useRef, useLsiValues } from "uu5g04-hooks";
import Config from "./config/config";


import SubjectCreateForm from "../bricks/subject-create-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  //@@viewOff:statics
};

export const SubjectList = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {

    const lsiValues = useLsiValues(Lsi)
    //@@viewOn:private
    const createFormRef = useRef()
    function openForm(){
      createFormRef.current.open()
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );
    console.log(createFormRef)

    return  (
      <>
      <UU5.Bricks.Button
      colorSchema="blue"
      onClick= {()=> openForm()}
      >{lsiValues.newSubjectBtn} <UU5.Bricks.Icon icon="uu5-plus"/></UU5.Bricks.Button>

      <SubjectCreateForm ref = {createFormRef} />
      </>
      
    ) 
    //@@viewOff:render
  },
});

export default SubjectList;
