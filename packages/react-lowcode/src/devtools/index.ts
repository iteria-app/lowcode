export interface ReactDevtoolsAgent {
    inspectElement(opts: { id: number; path: Array<string>; rendererID: number }): void;
    getIDForNode(node: Node): number;
}

export interface RenderInterace {
    getOwnersList(id: number): Array<any>;
}

export interface OwnerListItem {
    displayName: string;
    id: number;
    type: number; // enum
}

export interface DevToolsHook {
  reactDevtoolsAgent: ReactDevtoolsAgent;
  rendererInterfaces: Map<number, RenderInterace>
}

const rendererID = 1;

export interface InspectedElementSource {
  readonly fileName: string
  readonly lineNumber: number
  readonly columnNumber: number
}

export interface InspectedElementValue {
  readonly id: number
  readonly type: number
  readonly displayName: string
  readonly source?: InspectedElementSource
  readonly owners: OwnerListItem[] | null

  readonly rendererPackageName: string //"react-dom"
  readonly rendererVersion: string //"16.13.1"

  readonly key: null
  readonly props: any
  readonly hooks: any
  readonly rootType: any
  readonly state: any
  readonly context: any
  readonly hasLegacyContext: false
  
  readonly canEditFunctionProps: true
  readonly canEditFunctionPropsDeletePaths: false
  readonly canEditFunctionPropsRenamePaths: false
  readonly canEditHooks: true
  readonly canEditHooksAndDeletePaths: false
  readonly canEditHooksAndRenamePaths: false
  readonly canToggleSuspense: true
  readonly canViewSource: false
}

export interface InspectedElementPayload {
  readonly id: number
  readonly type: string
  readonly value: InspectedElementValue
}

export class DevTools {
  reactHook: DevToolsHook;

  constructor(devToolsHook: DevToolsHook) {
    this.reactHook = devToolsHook;
  }

  getOwnersList(id: number): Array<OwnerListItem> | null {
    const rend1 = this.reactHook.rendererInterfaces.get(rendererID)
    if (rend1) {
        return rend1.getOwnersList(id);
    }
    return null
  }

  // posts message `event?.data?.payload?.event == 'inspectedElement'`
  inspectElementDevId(id: number) {
    this.reactHook.reactDevtoolsAgent.inspectElement({ id, path: [], rendererID });
  }

  getIDForNode(element: HTMLElement): number | null {
    const id = this.reactHook?.reactDevtoolsAgent?.getIDForNode(element);
    return id
  }

  // posts message `event?.data?.payload?.event == 'inspectedElement'`
  inspectElement(element: HTMLElement) {
    const id = this.reactHook?.reactDevtoolsAgent?.getIDForNode(element);
    if (id) {
      //const rend1 = reactHook?.rendererInterfaces?.get(rendererID)
      //!!! rend1.getOwnersList(28)
      //console.log('xxx', id, cellIdx, cell.localName, rend1.getPathForElement(id), event)
      this.reactHook.reactDevtoolsAgent.inspectElement({ id, path: [], rendererID });
    }
  }
}

export function triggerInspectElement(devTools: DevTools, target: HTMLElement) {
  const id = devTools.getIDForNode(target);
  if (id) {
    const owners = devTools.getOwnersList(id);
    for (let owner of owners ?? []) {
      devTools.inspectElementDevId(owner.id);
    }
  }
}
