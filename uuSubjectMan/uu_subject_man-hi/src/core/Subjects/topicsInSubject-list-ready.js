//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import Lsi from "./lsi/topicsInSubjectListReady-lis"
import Config from "../config/config";

import TopicsTile from "../../bricks/Topics/topic-tile"

import Profiles from "../../config/profiles";
import SubjectManInstanceContext from "../../bricks/subjectMan-instance-context"

//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const TopicsInSubjectListReady = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        data: UU5.PropTypes.array,
        handleTopicAdd: UU5.PropTypes.func,
        handleTopicRemove: UU5.PropTypes.func,
        handleDigitalContentAdd: UU5.PropTypes.func,
        handleDigitalContentRemove: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        data: [],
        handleTopicAdd: () => { },
        handleTopicRemove: () => { },
        handleDigitalContentAdd: () => { },
        handleDigitalContentRemove: () => { },
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const TOPICS_ACTIONS = ({ screenSize }) => {
            return [
                {
                    content: Lsi.addTopic,
                    onClick: () => { props?.handleTopicAdd() },
                    icon: "mdi-plus-circle",
                    colorSchema: "primary",
                    bgStyle: "filled",
                    active: true
                }
            ];
        };

        const TOPICS_COLUMNS = [
            {
                cell: cellProps => <UU5.Bricks.Lsi lsi={cellProps.data.data.name} />,
                header: <UU5.Bricks.Lsi lsi={Lsi.name} />
            }
        ];

        const hasPermissionToAdd = () => {
            return UU5.Common.Tools.hasSomeProfiles(authorizedProfiles, [Profiles.TEACHERS, Profiles.STUDYDEP]);
        }
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:hooks
        const addFormRef = useRef();
        const authorizedProfiles = useContext(SubjectManInstanceContext).data.authorizedProfiles;
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
                <Uu5Tiles.ControllerProvider data={props.data ? props.data : []}>
                    <Uu5Tiles.ActionBar title={""} actions={hasPermissionToAdd() === true ? TOPICS_ACTIONS : []} />
                    <Uu5Tiles.Grid
                        tileMinWidth={400}
                        tileMaxWidth={1920}
                        tileSpacing={8}
                        rowSpacing={8}
                    >
                        <TopicsTile 
                        key={props.data?.id}
                        handleOpen={props.handleOpen}
                        handleUpdate={props.handleUpdate}
                        handleRemove={props.handleTopicRemove}
                        handleDigitalContentAdd={props.handleDigitalContentAdd}
                        handleDigitalContentRemove={props.handleDigitalContentRemove}
                        />
                    </Uu5Tiles.Grid>
                </Uu5Tiles.ControllerProvider>
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default TopicsInSubjectListReady;