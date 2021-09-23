import { getQueryNames, queryHookName } from "@iteria-app/graphql-lowcode/esm/generate";
import { getDetailComponentName, getDetailPageComponentName, getPluralizedEntityName } from "../../entity/helper";
export default class DetailPageTemplateResolver {
    constructor(entity, introspection) {
        this._entity = entity;
        this._introspection = introspection;
    }
    generateDetailPage(template) {
        let generatedTemplate = template;
        if (this._entity) {
            const { listQueryName } = this._introspection ? getQueryNames(this._introspection, this._entity.getName()) : { listQueryName: undefined };
            const hookName = queryHookName(listQueryName !== null && listQueryName !== void 0 ? listQueryName : '');
            const detailPageName = getDetailPageComponentName(this._entity);
            const detailComponentName = getDetailComponentName(this._entity);
            const entityIdenfier = getPluralizedEntityName(this._entity);
            const hookNamePlaceholder = '#query_name#';
            const detailPageNamePlaceholder = '#detail_component_page#';
            const detailComponentNamePlaceholder = '#detail_component#';
            const entityIdentifierPlaceholder = '#entity_identifier#';
            generatedTemplate = generatedTemplate.replaceAll(hookNamePlaceholder, hookName);
            generatedTemplate = generatedTemplate.replaceAll(detailPageNamePlaceholder, detailPageName);
            generatedTemplate = generatedTemplate.replaceAll(detailComponentNamePlaceholder, detailComponentName);
            generatedTemplate = generatedTemplate.replaceAll(entityIdentifierPlaceholder, entityIdenfier);
        }
        return generatedTemplate;
    }
}
