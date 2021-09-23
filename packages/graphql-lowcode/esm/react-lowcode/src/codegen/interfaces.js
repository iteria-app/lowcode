import { factory } from "typescript";
export var WidgetPropertyValue;
(function (WidgetPropertyValue) {
    WidgetPropertyValue["EXPRESSION"] = "EXPRESSION";
    WidgetPropertyValue["STRING_LITERAL"] = "STRING_LITERAL";
})(WidgetPropertyValue || (WidgetPropertyValue = {}));
export class JsxFileContext {
    uniqueImports() {
        return [];
    }
    useHook(hook, ...params) {
        // TODO unique import
        return null;
    }
    tag(tag, ...children) {
        // TODO unique import
        return null;
    }
    returnFragment(...children) {
        if ((children === null || children === void 0 ? void 0 : children.length) == 1) {
            // TODO handle one child
        }
        factory.createReturnStatement(factory.createJsxFragment(factory.createJsxOpeningFragment(), children, factory.createJsxJsxClosingFragment()));
        return null;
    }
}
