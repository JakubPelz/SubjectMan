//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "../config/config";

import Lsi from "./lsi/studyProgrammeDetail-lsi"
import Css from "./studyProgramme-detail-css"

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const StudyProgrammeDetailReady = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.object,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: null,
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:hooks
        //@@viewOff:hooks

        //@@viewOn:render
        const className = Config.Css.css``;
        // { id, className, style, disabled, hidden }
        const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

        const component = (
            <div {...attrs}>
                {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
            </div>
        );

        return currentNestingLevel ? (
            <div {...attrs}>
                <UU5.Bricks.Card className={Css.studyProgrammeDetail()}>
                    <UU5.Bricks.Section header={props.data?.name} underline={true} level={2}>
                        <UU5.BlockLayout.Block>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.name} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.name}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.description} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.description}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Line/>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.degree} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.degree}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.form} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.forms}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.languages} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.languages}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Line/>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.credits} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.credits}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                           <UU5.BlockLayout.Line/>
                           <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={300}><UU5.Bricks.Lsi lsi={Lsi.state} /></UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column textAlign={"left"}>{props.data.state}</UU5.BlockLayout.Column>
                           </UU5.BlockLayout.Row>
                        </UU5.BlockLayout.Block>
                    </UU5.Bricks.Section>
                </UU5.Bricks.Card>
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default StudyProgrammeDetailReady;