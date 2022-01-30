//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataList, unmountedRef , useRef, useCallback, useContext, useDataObject } from "uu5g04-hooks";
import Calls from "../../calls";
import Config from "../config/config";

import SubjectsDetailReady from "../../core/Subjects/subjects-detail-ready"

import Lsi from "./lsi/subjects-detail-route-lsi";
import TopicsInSubjectList from "../../core/Subjects/topicsInSubject-list";

import Profiles from "../../config/profiles";
import SubjectManInstanceContext from "../../bricks/subjectMan-instance-context"
import SubjectsCreateModal from "../../bricks/Subjects/subjects-create-modal";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "UU5.Bricks.VisualComponent",
    nestingLevel: "bigBoxCollection"
    //@@viewOff:statics
};

export const SubjectsDetailRoute = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
    },
    //@@viewOff:defaultProps

    render(props) {
        // do NOT use keywords "this"!!!

        //@@viewOn:private
        const renderChild = () => {
            let child;
            switch (state) {
                case "pendingNoData":
                case "pending":
                    child = <UU5.Bricks.Loading />
                    break;
                case "ready":
                case "readyNoData":
                    child = (
                        <>
                            <SubjectsDetailReady
                                data={data}
                                onEdit={handleSubjectEdit}
                            />

                            {hasPermissionToVisitTopics() === true ?
                                <TopicsInSubjectList
                                    subjectId={props.params.id} />
                                : null
                            }
                        </>
                    )
                    break;
                case "error":
                case "errorNoData":
                    child = <UU5.Common.Error errorData={errorData} />
                    break;
            };
            return child;
        };

        const hasPermissionToVisitTopics = () => {
            return UU5.Common.Tools.hasSomeProfiles(authorizedProfiles, [Profiles.STUDENS, Profiles.STUDYDEP, Profiles.TEACHERS]);
        }
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:hooks
        const authorizedProfiles = useContext(SubjectManInstanceContext).data.authorizedProfiles;
        //@@viewOff:hooks

        //@@viewOn:render
        const className = Config.Css.css``;
        // { id, className, style, disabled, hidden }
        const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

        const { state, data, errorData, pendingData, handlerMap } = useDataObject({
            handlerMap: {
                load: Calls.getSubject,
                update: Calls.updateSubject
            },
            initialDtoIn: { pageInfo: {}, id: props.params.id }
        });

        const alertBusRef = useRef();
        const modalRef = useRef();
        const unmountedRef = useRef();


        const showModal = useCallback((subject, onSave) => {
            const modal = modalRef.current;
            modal.open({
                header: "Edituj předmět",
                content: <SubjectsCreateModal
                    onSave={onSave}
                    onSaveDone={(opt) => {
                        modal.close();
                        opt.component.getAlertBus().setAlert({
                            content: "Edit proběhl v pořádku",
                            colorSchema: "success",
                        });
                    }}
                    onSaveFail={(opt) => {
                        console.debug(opt);
                        opt.component.getAlertBus().setAlert({
                            content: "Edit neproběhl v pořádku",
                            colorSchema: "danger",
                        });
                    }}
                    onCancel={() => modal.close()}
                    subject={subject} />,
            });
        }, []);

        const handleSubjectEdit = useCallback((item) => {
            showModal(item, async ({ component, values }) => {
                let data, error;
                try {
                    data = await handlerMap.update({...values, id: item.id});
                    console.debug(data);
                } catch (e) {
                    error = e;
                    console.error(error);
                }
                if (unmountedRef.current) return;
                if (error) component.saveFail(error);
                else component.saveDone(data);
                
                if (!error && item.name !== data.name)handlerMap.load({id: data.id});
            });
        }, [showModal, handlerMap.load, unmountedRef]);


        const component = (
            <div {...attrs}>
                {UU5.Utils.Content.getChildren(props.children, props, STATICS)}
            </div>
        );

        return currentNestingLevel ? (
            <div {...attrs}>
                <UU5.Bricks.Section style={{ "padding": "48px" }} header={<UU5.Bricks.Lsi lsi={Lsi.header} />}>
                    {renderChild()}
                </UU5.Bricks.Section>

                <UU5.Bricks.AlertBus ref_={alertBusRef} />
                <UU5.Bricks.Modal controlled={false} ref_={modalRef} mountContent="onEachOpen" overflow />
            </div>
        ) : (
            <UU5.Bricks.LinkModal children="Visual Component" hidden={props.hidden} component={component} />
        );
        //@@viewOff:render
    }
});

//@@viewOn:helpers
//@@viewOff:helpers

export default SubjectsDetailRoute;