export interface ChangedMessage {
  messageId: string
  newMessageValue: string
}

export interface InspectedElement {
  displayName: string
  props: { [key: string] : any }
}

export class LocaleMessageEditor {

  protected prevContenEditable?: HTMLElement = undefined

  instrumentMessageHTML(target: HTMLElement, inspectedElement: InspectedElement, callback: (event: ChangedMessage) => void) {
    if (typeof target?.contentEditable != 'undefined' && target.contentEditable !== 'true' && target.children.length == 0) {
      // const id = this.devTools.getIDForNode(target)
      // const ownerList = this.cacheComponentIds.get
      // console.log('click B editable', id, ownerList, this.cacheComponentIds.get(id - 1), this.cacheComponentIds.get(id), this.cacheComponentIds.get(id + 1), this.cacheComponentIds)
      //const inspectedElement = this.cacheComponentIds.get(id)
  
      if (target == this.prevContenEditable) {
        return
      }
      this.prevContenEditable = target
  
      if (inspectedElement.displayName == "FormattedMessage") {
        const messageId = inspectedElement.props.data?.id
        console.log('click C FormattedMessage', messageId, inspectedElement)
        if (messageId) {
          const self = this
          editMessageHTML(messageId, target, (changed) => {
            callback(changed)
            self.prevContenEditable = undefined
          })
        }
      }
    }
  }
}

function editMessageHTML(messageId: string, target: HTMLElement, success: ((event: ChangedMessage) => void)) {
  target.contentEditable = 'true' 
  target.focus()

  function blurHandler(event: FocusEvent) {
    target.contentEditable = 'false'
    target.removeEventListener('blur', blurHandler)
    
    const  blurTarget = event?.target as HTMLElement
    const newMessageValue = blurTarget.innerText ?? ''
    console.log('click edittedMessage', messageId, newMessageValue)
    success({ messageId, newMessageValue })
  }
  target.addEventListener('blur', blurHandler)
  // TODO ESC key target.addEventListener('input', inputHandler)
}
