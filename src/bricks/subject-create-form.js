//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useImperativeHandle, useRef, useLsiValues } from "uu5g04-hooks";
import Config from "./config/config";


import Lsi from "./subject-create-form.lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectCreateForm",
  //@@viewOff:statics
};

export const SubjectCreateForm = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSave: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }, ref) {
    //@@viewOn:hooks
    const modalRef = useRef();
    const subjectFormRef = useRef()

  

        //@@viewOff:hooks

  //@@viewOn:private




    const lsiValues = useLsiValues(Lsi)



    function onSave(opt){
      return  console.log(opt.component.getValues())
    }
    function onCancel(opt){
      console.log(handlerMap)
      return  console.log(opt.component.getValues())
   
    //@@viewOff:private
   
       //  modalRef.current.close();
    }
   //@@viewOn:render
    function renderForm() {
      return (
        <UU5.Forms.ContextForm
          onSave={onSave}
          onCancel = {onCancel}
          ref = {subjectFormRef}
        >
          <UU5.Forms.Text
            name="name"
            label= {lsiValues.name}
            placeholder= {lsiValues.placeholderName}
            size="m"
            required
       
            pattern="[A-Za-z0-9]{3}"
            patternMessage= {lsiValues.patternThreeLetter}
          />
          <UU5.Forms.TextArea
            name="description"
            label= {lsiValues.description}
            placeholder= {lsiValues.placeholderDescription}
            autoResize={true}
            pattern="[A-Za-z0-9]{3}"
            patternMessage={lsiValues.patternThreeLetter}
            inputAttrs={{ maxLength: 4000 }}
          />
          <UU5.Forms.Number
            name="numCredits"
            label= {lsiValues.numCredits}
            min = {1}
            value = {1}
            placeholder= {lsiValues.placeholderCredits}
            size="m"
            required
           
          />
          <UU5.Forms.Text
            name="supervisor"
            label= {lsiValues.supervisor}
            placeholder= {lsiValues.placeholderSupervisor}
            size="m"
            required
           
            pattern="[A-Za-z]{3}"
            patternMessage= {lsiValues.patternThreeLetter}
          />
          <UU5.Forms.TextArea
            name="subjectGoal"
            label= {lsiValues.subjectGoal}
            placeholder= {lsiValues.placeholderGoal}
            autoResize={true}
            pattern="[A-Za-z0-9]{3}"
            patternMessage= {lsiValues.patternThreeLetter}
            inputAttrs={{ maxLength: 4000 }}
            required
          />
          <UU5.Forms.Select name = "studyProgramme" label= {lsiValues.studyProgramme} size="m" required>
            <UU5.Forms.Select.Option value="Bc." />
            <UU5.Forms.Select.Option value="Mgr." />
          </UU5.Forms.Select>

          <UU5.Forms.Select name = "language" label= {lsiValues.language} size="m" required>
            <UU5.Forms.Select.Option value="CZ" />
            <UU5.Forms.Select.Option value="EN" />
          </UU5.Forms.Select>

          <UU5.Forms.TextArea
            name="informations"
            label= {lsiValues.informations}
            placeholder= {lsiValues.placeholderInformations}
            autoResize={true}
            pattern="[A-Za-z0-9]{3}"
            patternMessage= {lsiValues.patternThreeLetter}
          />
         
        </UU5.Forms.ContextForm>
      );
    }
    function renderHeader() {
      return <UU5.Bricks.Box content= {lsiValues.header} colorSchema="blue" className="font-size-m" />;
    }
    function renderFooter() {
      return <UU5.Forms.ContextControls align = "center" />;
    }

    useImperativeHandle(ref, () => ({
      open: () => {
       
        modalRef.current.open({
          header: renderHeader(),
          content: renderForm(),
          footer: renderFooter(),
        });
      },
    }));

  



 

    return(   
  
    <UU5.Forms.ContextModal ref_={modalRef} />
    
    )
    //@@viewOff:render)
  },
});

export default SubjectCreateForm;
